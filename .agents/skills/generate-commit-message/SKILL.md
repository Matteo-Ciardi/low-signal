---
name: generate-commit-message
description: Analyze Git diffs and produce a Conventional Commits message. Use when asked to write a commit message for repository changes present in the working tree or index.
---

# Generate a commit message

## Input

- All information comes from Git commands only (`git diff`, `git diff --staged`, `git status --porcelain`, `git diff HEAD~1`).
- Do NOT open or read repository files with file-reading tools.
- Never include `.env`, secrets, or personal data in the message. Do not ask the user to paste a diff.

## Procedure

1. Read the diff:
   - if there are staged changes, run `git diff --staged`;
   - otherwise run `git diff` (unstaged);
   - if both are empty, run `git status --porcelain` to check for untracked files, then try `git diff HEAD~1`;
   - if a git command fails (not a repository, conflict in progress, corrupted index), stop and report the actual error.
2. Analyze which files changed and what the change does (new functionality, error fixing, maintenance/refactoring/build). Exclude sensitive files (`.env*`, config with secrets, personal data) from the analysis: they do not contribute to type, scope, or description. If every change only touches sensitive files, stop and report that there is nothing analyzable.
3. Choose the commit type from the Complete Conventional Commits list:

   | Type      | When to use                                                   |
   | --------- | ------------------------------------------------------------- |
   | `feat`    | new functionality                                            |
   | `fix`     | error correction / bug fix                                   |
   | `refactor`| code change without new functionality or bug fix             |
   | `docs`    | documentation only                                           |
   | `style`   | formatting/whitespace, no logic change                       |
   | `build`   | build system or dependencies                                 |
   | `ci`      | CI/CD configuration                                          |
   | `test`    | tests added or modified                                      |
   | `perf`    | performance improvement                                      |
   | `chore`   | maintenance or anything else                                 |
   | `revert`  | reverting a previous commit                                  |

4. Group mixed-type diffs into separate commits:
   - if the diff mixes multiple types, group the files by type and produce one message per group (separate commits), not a single dominant type;
   - stage the files of each group with `git add <file>` before proposing its message;
   - for each group, list which files belong to it alongside the message;
   - if all changes share one type, use a single group and a single message.
5. Add `scope` in parentheses only if all changed files belong to one clearly identifiable module or area.
6. If the change breaks existing behavior or interfaces, add `!` before the `:` and a `BREAKING CHANGE:` note in the body.

When the user asks for a "commit", produce the message and show it to the user. Do not run `git commit` unless the user explicitly asks to execute the commit (e.g. "esegui il commit", "comittalo", "run the commit").

## Output

Produce only the structured message.

Format:

```
type(scope): short description

optional body

BREAKING CHANGE: description
```

- `type`: one of the types listed above.
- `short description`: imperative, lowercase, no trailing period, up to ~50 chars.
- For `revert`, use the spec form: `revert: <description>` with a `Refs: <sha>` footer.
- Body and breaking-change note only if needed. Multiple groups produce multiple messages; one message per set of changes.
- When there are multiple groups (mixed-type diff), present the output as a table with the columns `File` and `Commit message`, one row per group showing the group's files and the proposed message:

  ```
  | File                     | Commit message                    |
  | ------------------------ | --------------------------------- |
  | src/notifiche.js         | feat: add fan notifications       |
  | src/player.js            | fix: fallback when no url         |
  | package.json             | build: bump express to 4.20       |
  | scripts/cleanup.js       | refactor: extend cleanup to cache |
  | README.md                | docs: update temp repo desc       |
  ```

- For a single-type diff, show only the single message, without a table.

## Boundaries

- Produce only the message. Do NOT run `git commit` unless the user explicitly asks to commit.
- Do NOT edit or move files.
- Staging with `git add` is allowed only to group files per commit type.
- Do NOT read repository files with file-reading tools; obtain all information from Git commands only.
- Do NOT include `.env`, secrets, or personal data in the message; exclude sensitive files from the analysis.
- Do NOT read secrets, credentials, or environment files.
- Do NOT invoke git hooks or change Git configuration.

## Stop conditions

Stop and report, without inventing a message, when:

- there is no readable diff: staged and unstaged empty, `git diff HEAD~1` empty or HEAD has no previous commit -> report "nessun diff trovato";
- the directory is not a Git repository (git returns "not a git repository") -> report the error;
- a git command fails (failed command, corrupted index, merge/rebase with conflicts) -> report the exact error message;
- only untracked files exist -> report which files are present and ask the user whether to include them;
- every change only touches sensitive files (`.env`, secrets, personal data) -> report that there is nothing analyzable;
- the changes are ambiguous or too large to summarize reliably -> ask the user for clarification.

In every negative case, stop and report the problem; do not produce a commit message.