#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const https=require('node:https');
const crypto=require('node:crypto');
const {pipeline}=require('node:stream/promises');
const {spawn,spawnSync}=require('node:child_process');

const version='0.7.0-beta.5';
const sha256='eef6699380b696f28e6016e4c81931d3774dd2a0b6a769ea76cee2dcaa64101e';
const url='https://pc-remote-commander-staging.pcremotecommander.workers.dev/downloads/windows/pcremotecommander-0.7.0-beta.5.tgz';
const maximumBytes=100*1024*1024;

function cacheRoot(env=process.env) {
  if(process.platform!=='win32'||!env.LOCALAPPDATA||!path.isAbsolute(env.LOCALAPPDATA))throw Error('This staging preview requires Windows with a normal user profile.');
  return path.join(env.LOCALAPPDATA,'PCRemoteCommander','packages',version);
}
function shaFile(file) {
  const hash=crypto.createHash('sha256');
  const fd=fs.openSync(file,'r');
  try {const buffer=Buffer.allocUnsafe(1024*1024);for(;;){const length=fs.readSync(fd,buffer,0,buffer.length,null);if(!length)break;hash.update(buffer.subarray(0,length));}} finally {fs.closeSync(fd);}
  return hash.digest('hex');
}
function verified(file,expected=sha256) {return fs.existsSync(file)&&shaFile(file)===expected;}
function validateEntries(output) {
  const entries=output.split(/\r?\n/).filter(Boolean);
  if(!entries.length)throw Error('Downloaded runtime archive is empty.');
  for(const entry of entries) {
    const parts=entry.split('/');
    if(parts[0]!=='package'||entry.startsWith('/')||entry.includes('\\')||parts.some(part=>part==='..'))throw Error('Downloaded runtime archive has an unsafe path.');
  }
  return entries.length;
}
function download(file,request=https.get) {
  return new Promise((resolve,reject)=>{
    const output=fs.createWriteStream(file,{flags:'wx',mode:0o600});
    output.on('error',reject);
    const req=request(url,response=>{
      if(response.statusCode!==200){response.resume();output.destroy();reject(Error(`Runtime download failed (HTTP ${response.statusCode}). Try again later.`));return;}
      const length=Number(response.headers['content-length']);
      if(!Number.isFinite(length)||length<1||length>maximumBytes){response.resume();output.destroy();reject(Error('Runtime download has an invalid size.'));return;}
      let received=0;
      response.on('data',chunk=>{received+=chunk.length;if(received>maximumBytes)response.destroy(Error('Runtime download exceeded its size limit.'));});
      pipeline(response,output).then(()=>received===length?resolve():reject(Error('Runtime download was incomplete.')),reject);
    });
    req.setTimeout(120000,()=>req.destroy(Error('Runtime download timed out.')));
    req.on('error',error=>{output.destroy();reject(error);});
  });
}
async function ensurePayload({root=cacheRoot(),fetchArchive=download,runTar=spawnSync,expected=sha256}={}) {
  const payload=path.join(root,'package');
  const archive=path.join(root,'runtime.tgz');
  const entry=path.join(payload,'bin','npx-onboard.cjs');
  fs.mkdirSync(root,{recursive:true});
  if(fs.lstatSync(root).isSymbolicLink())throw Error('Runtime cache cannot be a symbolic link.');
  if(fs.existsSync(entry)&&verified(archive,expected))return entry;
  if(!verified(archive,expected)) {
    const temporary=path.join(root,`runtime-${process.pid}-${crypto.randomBytes(6).toString('hex')}.tgz`);
    try {
      console.log('Downloading the pinned PC Remote Commander staging runtime...');
      await fetchArchive(temporary);
      if(!verified(temporary,expected))throw Error('Runtime SHA-256 verification failed. No downloaded code was run.');
      if(fs.existsSync(archive))fs.rmSync(archive,{force:true});
      fs.renameSync(temporary,archive);
    } finally {fs.rmSync(temporary,{force:true});}
  }
  const staging=fs.mkdtempSync(path.join(root,'unpack-'));
  try {
    const listing=runTar('tar.exe',['-tzf',archive],{encoding:'utf8',windowsHide:true,maxBuffer:1024*1024});
    if(listing.error||listing.status!==0)throw Error('Could not inspect the runtime archive. Windows tar.exe is required.');
    validateEntries(listing.stdout);
    const extracted=runTar('tar.exe',['-xzf',archive,'-C',staging],{encoding:'utf8',windowsHide:true,maxBuffer:1024*1024});
    if(extracted.error||extracted.status!==0)throw Error('Could not unpack the verified runtime archive.');
    if(!fs.existsSync(path.join(staging,'package','bin','npx-onboard.cjs')))throw Error('Verified runtime archive is missing its launcher.');
    if(path.relative(root,payload)!=='package')throw Error('Unsafe runtime cache path.');
    if(fs.existsSync(payload))fs.rmSync(payload,{recursive:true,force:true});
    fs.renameSync(path.join(staging,'package'),payload);
  } finally {fs.rmSync(staging,{recursive:true,force:true});}
  return entry;
}
async function main(argv=process.argv.slice(2)) {
  if(Number(process.versions.node.split('.')[0])<20)throw Error('Node.js 20 or newer is required.');
  if(['help','--help','-h'].includes(argv[0])) {
    console.log('PC Remote Commander staging beta\n\nUsage: pcremotecommander [setup|connect|cli|doctor] [options]\nSetup downloads a pinned runtime, verifies its SHA-256, then starts pairing. Windows and Node.js 20+ are required.');
    return;
  }
  const entry=await ensurePayload();
  const child=spawn(process.execPath,[entry,...argv],{stdio:'inherit',windowsHide:false,shell:false});
  child.on('error',error=>{console.error('PC Remote Commander runtime could not start: '+error.message);process.exitCode=1;});
  child.on('exit',(code,signal)=>{process.exitCode=signal?130:code??1;});
}
if(require.main===module)main().catch(error=>{console.error('PC Remote Commander: '+error.message);process.exitCode=1;});
module.exports={cacheRoot,shaFile,verified,validateEntries,ensurePayload,main};

