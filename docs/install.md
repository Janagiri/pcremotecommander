# Install and connect

## 1. Start the Windows agent

Install [Node.js](https://nodejs.org/) so `npx` is available. In PowerShell, Command Prompt, or Windows Terminal on the computer you own or administer, run:

```text
npx --yes pcremotecommander@beta setup
```

The npm launcher downloads the beta runtime, verifies its pinned archive hash, and starts interactive setup. Follow the terminal prompts. Choose read-only access or the specific control capabilities you need: files, commands, browser, and desktop. Do not approve capabilities you do not intend to use.

## 2. Pair in your PUBLIC browser

Open the pairing URL printed by the terminal in the browser profile where you sign in to the [public dashboard](https://pc-remote-commander-staging.pcremotecommander.workers.dev/devices). Sign in with your **own** GitHub account. Enter the code shown in the terminal and confirm the requested permissions. On Devices, select **Use this computer**. The device must show Online and Selected for AI tools.

The [operator dashboard](https://pc-remote-commander-ops-staging.pcremotecommander.workers.dev/admin) is private; public users do not sign in there.

## 3. Add the remote MCP endpoint

```text
https://pc-remote-commander-staging.pcremotecommander.workers.dev/mcp
```

Use OAuth when the client asks for authentication. Sign in and approve consent in the same browser profile that owns the selected device. Read access uses `jan:read`; control tools also require `jan:control` and matching local permissions.

### ChatGPT

If your plan and workspace permit custom MCP servers, go to **Plugins → Add custom MCP server**, enter the endpoint above, select OAuth, review discovered tools, and create the connection. In a new chat, select the connection and ask it to check your computer's status. [Official ChatGPT guide](https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt). This beta is not listed in the public ChatGPT directory.

### Claude

In **Customize → Connectors**, add a custom remote connector with the endpoint above. Choose OAuth sign-in, connect, and enable the tools you need. Team/Enterprise owners may have to add the connector for their organization first. [Official Claude guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp). This beta is not listed in the Claude directory.

### Cursor

In Cursor's MCP settings, add a remote **Streamable HTTP** server with the endpoint above, then complete OAuth. The client supports remote HTTP and OAuth; [official Cursor MCP guide](https://docs.cursor.com/context/model-context-protocol).

## If a connection fails

- Confirm the Windows agent is running and the correct computer is Online and Selected in your **PUBLIC browser**.
- If OAuth says the authorization expired, start a fresh connection from the AI client and finish it in one browser profile.
- If a tool says permission denied, review the local capabilities approved at pairing and the OAuth scopes approved for that AI client.
- To stop AI routing, select **Stop AI access**. To invalidate a computer's key, select **Revoke** and confirm the review page.

Never paste pairing codes, device keys, or OAuth tokens into public issues.
