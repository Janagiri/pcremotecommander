# Install the beta and connect an assistant

## 1. Connect your Windows computer

Use Windows 10/11 with [Node.js 20+ and npm](https://nodejs.org/en/download). Run as a normal user:

```powershell
npx --yes pcremotecommander@beta setup
```

Prefer a double-click launcher? [Download the Windows folder](https://pc-remote-commander.pcremotecommander.workers.dev/install/PC-Remote-Commander-Windows.zip), choose **Extract All**, then open **Start-PCRC.cmd**. First use prepares missing Node.js and the bundled runtime. Keep the folder and double-click that same file for daily reconnects; keep its terminal open. This small launcher requires internet.


The launcher downloads a versioned runtime, checks its pinned SHA-256 and installs bundled Python in your user profile. If Node.js/npx is missing, use the fallback installer below; it prepares verified portable Node.js and continues setup. Allow time for the first download; later launches reuse the installation.

Open the approval link in your **PUBLIC browser**, sign in with your own GitHub account, compare both codes and review the permissions. Standard setup requests file, command, browser and desktop control. Approve only a request you started. Keep **Use this computer for AI tools** checked to select it automatically. The dashboard should show **Online**, **Control approved** and **Selected for AI tools**.

Keep the terminal open. Ctrl+C disconnects. A valid saved pairing reconnects when you run the same command. Revoked credentials trigger a fresh approval. Previously read-only devices cannot gain control without fresh consent; if needed, revoke that device on Devices and rerun the same command. Beta.8 and newer automatically request fresh full-control approval when the saved grant is limited. Beta.9 also detects a saved pairing for an older gateway and opens fresh approval on the current service; it replaces that saved identity only after approval.

If the short command does not work:

```powershell
powershell -NoProfile -Command "irm https://pc-remote-commander.pcremotecommander.workers.dev/install.ps1 | iex"
```

After first installation, open a new terminal before using the short command again. On the dashboard, choose **Next: Connect AI** to see the assistant instructions, then **Next: Verify** and **Go to dashboard**. Compare both codes when the approval page opens; never share pairing links publicly.

## 2. Use this remote MCP endpoint

```text
https://pc-remote-commander.pcremotecommander.workers.dev/mcp
```

Choose **OAuth**, not an owner's API key. Use the browser profile signed into the PCRC account that owns your device. Review `pcrc:read` and `pcrc:control`; OAuth cannot exceed the device permissions. Complete a fresh authorization attempt in one browser profile instead of reusing an old link.

## ChatGPT

1. On ChatGPT web, open **Plugins → plus button → Add custom MCP server** (some workspaces show Apps or a plus button).
2. Name it **PC Remote Commander**, enter the endpoint above and choose OAuth.
3. Complete PCRC consent, review discovered tools and add the connection to a chat.
4. Ask: “Use PCRC to check the connected computer and its capabilities.”

Your plan and workspace must permit custom MCP connections; an administrator may need to enable them. PCRC is not in the public directory. See the [official OpenAI custom MCP guide](https://developers.openai.com/plugins/deploy/connect-chatgpt).

## Claude web or Claude Desktop — remote connector

1. Open **Customize / Settings → Connectors** and choose **Add custom connector**.
2. Enter **PC Remote Commander** and the HTTPS endpoint above.
3. Connect with OAuth using your own PCRC account and enable the connector in a conversation.
4. Ask it to inspect the selected computer's status before making changes.

Managed workspaces may require an owner's setup. This is a remote connector, including when used in Claude Desktop. See the [official Claude guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

## Cursor — remote MCP

Add this entry to your MCP configuration, preserving any existing servers:

```json
{
  "mcpServers": {
    "pcrc": {
      "url": "https://pc-remote-commander.pcremotecommander.workers.dev/mcp"
    }
  }
}
```

Use Cursor's MCP settings to connect and complete OAuth. Enable the server for Agent, then ask for the connected computer's status. See [Cursor's official MCP documentation](https://docs.cursor.com/context/model-context-protocol).

## Local MCP and CLI

For a desktop client launching a local process instead of the hosted endpoint, follow the separate [local stdio guide](https://pc-remote-commander.pcremotecommander.workers.dev/mcp/local/). The Windows local guide configures the task MCP server with explicit file, command, browser and desktop capabilities. Local stdio uses client action approvals rather than hosted gateway approval pages. The Linux source example is still workspace-scoped.

The same setup command includes the CLI and workflow skills. No per-tool installation is needed. See the optional [CLI/skills reference](skills.md) when you want to invoke a local action directly; those commands do not start the remote agent.

The public npm beta supports Windows. A public Linux installer and clean Linux client test are pending.

## First useful test

Create a disposable folder in the approved workspace. Ask your assistant to inspect it, preview an edit to a test file, apply the approved change and read it back. For a command test, request a harmless `echo` command and approve only the exact action shown. Skills and client consent never replace PCRC's action checks.

If a tool fails, check the agent is running, the correct device is selected, and both device permissions and client OAuth include control. Never post tokens, private files or pairing URLs in public issues. Actual ChatGPT/Claude/Cursor round trips on a second PC remain release acceptance checks; these instructions are not a claim they have all passed.


## One-command terminal status (beta.9)

For setup and later sessions, use the same setup command at the top of this guide. MCP, CLI and skills are installed together. A signed device connection verifies the paired account; the terminal shows its username and account ID, ONLINE and Ready. Browser sign-in cookies are not used as a replacement for the device key.

While connected, an interactive terminal shows numbered request/result previews. Recognized secret fields, authentication values and images are omitted; previews are bounded and may still contain private task content. They are displayed locally and are not written to a separate trace file. Keep screen sharing and terminal scrollback in mind.

If connectivity fails, the terminal reports OFFLINE and retries with bounded backoff. Once the connection is restored it returns to ONLINE/Ready. It never replays a command with an uncertain result automatically. Revoked access, account closure and the session lease are handled separately. An older-gateway pairing opens fresh approval on the current service and is replaced only after approval.
