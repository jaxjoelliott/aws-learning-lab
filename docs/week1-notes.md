# Week 1 Notes

A branch is a separate "version" of the repository that is created to implement a single feature or fix. It is similar to a tree branch, branching off a version of the repo, which is then merged into main. To merge a branch into main, a pull request must be received and reviewed by peers, and approved after any differences are reconciled. Branches are extremely useful for version control systems such as git because they allow for huge teams to collaborate on projects in an organized manner with accurate records. Branches allow for changes to to the original repo to be tested without ruining the whole project.

About Git: https://docsgithubcom/en/get-started/using-git/about-git

Basic Git Commands

Git init initializes new Git repository and begins tracking that directory
Git clone creates a local copy of a remote repository
Git add stages any changes and changes will be part of next snapshot
Git commit saves snapshot created with add to the project history and completes the change-tracking
Git status shows status of changes as untracked, modified, or staged
Git branch shows the branches being worked on locally
Git merge merges lines of development together, and combines changes of two distinct branches
Git pull updates the local development line with the updates from the remote counterpart
Git push updates the remote repository with any commits that have been made locally

Models for collaboration

Shared repository
Individuals and teams are designated with read, write, or admin access
In combination with protected branches, this allows teams to progress quickly with GitHub
Fork and pull
Better for open source projects because managing permissions can be challenging
Allows anybody viewing the project to contribute by forking or copying the project under their personal account, giving them full control to implement fixes or new features
Forked work is either kept separate or can be sent back to the original project with a pull request, where changes will be reviewed before being merged, similarly to a branch

Github Flow: https://docsgithubcom/en/get-started/using-github/github-flow

Lightweight and branch-based workflow, useful for everyone, used by GitHub

Following GitHub flow
Create a branch with a descriptive name:
Allows for a safe workspace that doesn’t affect default branch

Make changes to the repository:
Changes will not end up on default branch until the branches are merged
Commit and push changes to branch
Each commit ideally contains an isolated and completed change
Committing and pushing changes allows for work to be backed up to remote storage, accessible by any device
One branch per task, allows for easy tracking of changes, and less holdups

Create a pull request:
Asks collaborators for feedback on changes
Can mark as draft for early feedback
Include summary and changes and what problems they solve
Can add comments to specific lines

Address review comments:
Reviewers will leave questions and comments on PRs, address them and commit in response

Merge your PR:
Merge PR after it is approved, and your changes will appear on the default branch.
Conflicts will be shown to be addressed before merging

Delete your branch:
After merging, delete your branch. This indicates work on branch is complete and prevents accidental work
Deleted branches can be restores and pull/commit history won’t be deleted
