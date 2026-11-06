<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git Commitment Preference
- Do NOT execute `git commit` or `git push`.
- All code changes will be made locally. The user will handle git commits and pushes manually.

# Testing and Browser Verification Preference
- Do NOT use the browser subagent (`browser_subagent`) or attempt to open browsers automatically.
- If there is a need to verify changes or run tests in the browser, inform the user about the verification steps so they can perform them manually.

# Planning Requirement Preference
- ALWAYS create an implementation plan (`implementation_plan.md`) first for ANY user request or coding change, no matter how simple or trivial.
- Obtain the user's explicit approval on the plan before making any source code edits.


