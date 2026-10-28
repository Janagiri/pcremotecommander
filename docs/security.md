# Security and privacy

PC Remote Commander is a remote computer control product. Pair only computers you own or administer and choose the minimum local capabilities needed for each device.

- The public dashboard requires each user to sign in. Devices, sessions, and MCP routing are account-scoped.
- Pairing requires a short-lived code from the agent's terminal and explicit confirmation in that user's browser.
- AI clients use OAuth. Read and control scopes are separate; control also requires corresponding local capabilities.
- Users can stop routing to a device or revoke its device key from the dashboard.
- The public MCP endpoint uses HTTPS. This is transport encryption, **not** end-to-end encryption between an AI client and the computer; the gateway handles requests to authorize and route them.
- The owner dashboard reports status and subscription information, without cross-account computer controls.

The public site is staging beta. Google/email auth, live subscriptions, a production installer, and public directory review remain in development. Do not treat a sandbox checkout as a live payment.

For a security concern, email [janagiri3297@gmail.com](mailto:janagiri3297@gmail.com). Do not post credentials, pairing codes, device keys, private file contents, or personal data in a public issue.
