# PC Remote Commander staging beta

On Windows with Node.js 20 or newer, run `npx --yes pcremotecommander@beta setup`. The launcher downloads a fixed, versioned runtime archive from the [public staging site](https://pc-remote-commander-staging.pcremotecommander.workers.dev/devices), verifies its pinned SHA-256 before unpacking or running it, and caches it under your Windows user profile. The runtime includes Python; a separate Python installation is not needed.

Setup asks you to choose read-only or full computer control. It then opens a matching-code approval page on the public staging site. Review the computer name and requested permissions before approving. Keep the agent terminal running while an MCP client or the local CLI uses the computer. The agent uses your Windows account privileges.

This is a staging beta. It has not completed a production security or reliability review. Use an isolated workspace for testing.

