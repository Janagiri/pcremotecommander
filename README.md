# PC Remote Commander

Connect a Windows computer you approve to an AI assistant through a remote Model Context Protocol (MCP) server.

**Status:** public staging beta. GitHub sign-in and the Windows beta installer are available. Google/email sign-in, live payments, and public AI-client directory listings are still in development. The Pro checkout on staging uses Paddle sandbox and does not charge a real card.

- [Product website](https://pc-remote-commander-staging.pcremotecommander.workers.dev/)
- [Public device dashboard](https://pc-remote-commander-staging.pcremotecommander.workers.dev/devices)
- [npm beta launcher](https://www.npmjs.com/package/pcremotecommander)
- [Installation and AI client guide](docs/install.md)
- [Security and privacy notes](docs/security.md)
- [Support](https://pc-remote-commander-staging.pcremotecommander.workers.dev/support)

## Install on Windows

Run this on the computer you want to connect, in PowerShell, Command Prompt, or Windows Terminal. Node.js and npm are required for the beta launcher:

```text
npx --yes pcremotecommander@beta setup
```

Review the terminal prompts and choose the permissions you want. The installer shows a pairing URL and code. Open that URL in your **PUBLIC browser**, sign in with your own GitHub account, enter the matching code, and choose **Use this computer** in Devices.

## Connect an AI client

Remote MCP endpoint:

```text
https://pc-remote-commander-staging.pcremotecommander.workers.dev/mcp
```

Add it as a remote Streamable HTTP MCP server with OAuth in an eligible ChatGPT workspace, Claude, or Cursor. Complete consent in the same browser profile as your device dashboard. Start with a status tool; control tools also require the corresponding local device permissions and OAuth control scope.

See [client-specific steps](docs/install.md). ChatGPT custom MCP availability depends on plan and workspace permissions. This repository is **public documentation**, not the private gateway or agent source; it contains no credentials, user data, or production configuration.

## Plans

Free: 15,000 MCP tool calls per UTC month and up to 12 active devices. Pro is planned at $15 per month plus applicable tax, with unlimited monthly calls and devices subject to the per-minute limit. Only sandbox test checkout is available on staging.

## Help

Contact [janagiri3297@gmail.com](mailto:janagiri3297@gmail.com). Do not email passwords, pairing codes, device keys, private files, or screenshots containing sensitive data.
