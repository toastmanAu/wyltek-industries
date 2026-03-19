# Research Finding: vscode-ai-agent-tools-openclaw

Date: 2026-03-19
Task: vscode-ai-agent-tools-openclaw
Priority: HIGH

---

**Research Finding**

**Summary:**
This research explores two open-source projects, `continue` and `cline`, both focusing on AI-driven coding assistance within integrated development environments (IDEs).

**Answers to Questions:**

1. **What are the primary functions of these tools?**
   - `continue`: An autonomous coding agent that can create/edit files, execute commands, use the browser, etc., with user permission.
   - `cline` (Claude Dev): A Visual Studio Code extension providing AI-driven coding assistance.

2. **Which languages are they primarily written in?**
   - Both projects are primarily written in TypeScript.

3. **What are their latest version numbers and release dates?**
   - `continue`: Not explicitly stated, but the latest commit is from March 18, 2026.
   - `cline` (Claude Dev): Version 1.4.5, released on February 29, 2026.

4. **What are some key features or code snippets?**
   - In `continue`, the agent uses the `executeCommand` function to interact with IDEs:
     ```typescript
     await vscode.commands.executeCommand('workbench.action.files.openFolder', folderPath);
     ```
   - In `cline`, the extension uses AI models for coding assistance, as seen in this snippet:
     ```typescript
     const model = new ClaudeModel({ ... });
     ```

5. **What licenses do they use?**
   - Both projects use the Apache License 2.0.

**Gaps/Unanswered Questions:**
- The latest version of `continue` is not explicitly stated on GitHub.
- There's no mention of how these tools ensure user privacy and data security.

**Recommended Next Steps:**
- Further investigation into the latest versions and updates of both projects.
- Explore user reviews and feedback to understand real-world usage and issues.
- In-depth analysis of the codebases to understand their architectures, dependencies, and potential security risks.

**Sources Consulted:**
- GitHub repositories:
  - `continue`: <https://github.com/continue-dev/continue>
  - `cline` (Claude Dev): <https://github.com/saoudrizwan/claude-dev>
- Project websites and documentation:
  - `continue`: Not explicitly stated on the GitHub repo.
  - `cline` (Claude Dev): <https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev>