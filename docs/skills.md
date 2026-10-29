# Workflow skills: CLI and MCP

Skills help an assistant choose a workflow before using tools. They are advisory: routing does not run commands, edit files or authorize an action.

## CLI reference — optional

Setup already installs these features. The commands below perform individual local actions; they are not extra setup or connection steps. To start or reconnect the remote agent, use only `npx --yes pcremotecommander@beta setup`.

```powershell
npx --yes pcremotecommander@beta cli skills list
npx --yes pcremotecommander@beta cli skills guide
npx --yes pcremotecommander@beta cli skills route "Diagnose my computer connection"
```

The bundled catalog includes connection diagnostics, storage inspection, file editing and project execution. Ambiguous requests can require clarification. A workflow never changes the capabilities approved for a device.

## Remote task MCP

Ask your assistant:

> Call PCRC's suggest_workflow with request “Diagnose my computer connection”. Explain the suggested steps before using other tools.

The task tool calls the existing `jan_route_skill` service. The local Python MCP catalog also exposes `jan_skills`, `jan_skill_guide` and `jan_route_skill`; names differ between the local and task-oriented catalogs.

For a file edit, inspect the file, preview the change and approve the intended write. For a command, review its working directory and exact command. Skill selection is guidance, not permission to perform these actions.

