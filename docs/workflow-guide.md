# Workflow Guide — VS Code UI vs CLI

## Create a branch

**CLI:** `git checkout -b branch-name`
**VS Code:** Bottom left corner, click the branch name, select "Create new branch"

## Switch to an existing branch

**CLI:** `git checkout branch-name`
**VS Code:** Bottom left corner, click branch name, select branch from list

## Stage changes

**CLI:** `git add .`
**VS Code:** Source Control panel, click the + next to each file or all files

## Commit

**CLI:** `git commit -m "Commit message"`
**VS Code:** Source Control panel, click Commit, enter commit message in file that pops up, then click commit in bottom right

## Push

**CLI:** `git push (-set-upstream origin new-branch-name if needed)`
**VS Code:** Source control panel, three dots next to changes, click push in menu

## Open a PR

**CLI:** `gh pr create` then add title and body message
**VS Code:** GitHub Pull Request extension,

## Merge a PR

**CLI:** `gh pr merge` then select squash, merge, or rebase
**VS Code:** GitHub Pull Requests extension, open the PR, click "Merge Pull Request" button

## Delete a branch

**CLI (local):** `git branch -d branch-name`
**CLI (remote):** `git push origin --delete branch-name`
**VS Code:** Command palette (Cmd+Shift+P), type "Git: Delete Branch"

## View branches

**CLI (local):## `git branch`
**CLI (remote):## `git branch -r`
