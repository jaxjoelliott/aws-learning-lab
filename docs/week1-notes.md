# Week 1 Notes

> At the end of each session, answer the three reflection questions before closing the laptop.

---

## Day 1 — Git & GitHub Foundations

### What is a Branch?

A branch is a separate "version" of the repository created to implement a single feature or fix. It branches off the repo similarly to a tree branch, and is merged back into main via a pull request. Branches allow huge teams to collaborate in an organized manner — changes can be tested without affecting the whole project.

**Reference:** [About Git](https://docs.github.com/en/get-started/using-git/about-git)

### Basic Git Commands

| Command      | Description                                     |
| ------------ | ----------------------------------------------- |
| `git init`   | Initializes a new Git repository                |
| `git clone`  | Creates a local copy of a remote repository     |
| `git add`    | Stages changes for the next snapshot            |
| `git commit` | Saves the staged snapshot to project history    |
| `git status` | Shows changes as untracked, modified, or staged |
| `git branch` | Shows branches being worked on locally          |
| `git merge`  | Merges two branches together                    |
| `git pull`   | Updates local branch with remote changes        |
| `git push`   | Updates remote repository with local commits    |

### Collaboration Models

**Shared Repository**

- Team members are given read, write, or admin access
- Works well with protected branches for fast-moving teams

**Fork and Pull**

- Better for open source — anyone can fork and contribute
- Changes are sent back via PR and reviewed before merging

### GitHub Flow

**Reference:** [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)

1. **Create a branch** — safe workspace that doesn't affect main
2. **Make changes** — commits stay isolated until merged
3. **Commit and push** — backs up work to remote, accessible anywhere
4. **Open a PR** — request feedback, describe what changed and why
5. **Address review comments** — commit responses to reviewer feedback
6. **Merge** — changes appear on default branch, conflicts resolved first
7. **Delete branch** — signals work is complete, prevents accidental commits

---

### Reflections

**What did I build?** Practiced full Git workflow in both CLI and VS Code. Created aws-learning-lab repo with README and .gitignore.

**What broke?** N/A — first day setup.

**What do I still not fully understand?** N/A — concepts clicked.

---

## Day 2 — GitHub Actions & CI Pipeline

### GitHub Actions

CI/CD platform that automates the build, test, and deployment pipeline. Workflows live in `.github/workflows/` as `.yml` files.

**Plain English Definitions**

| Term     | Definition                                                                       |
| -------- | -------------------------------------------------------------------------------- |
| workflow | Automated response to an event in your project                                   |
| event    | Something that happens in your project that triggers a workflow (push, PR)       |
| job      | Set of steps executed when a workflow is triggered — runs in parallel by default |
| step     | A single task inside a job — either a `run` command or a `uses` action           |
| runner   | A server that handles running the workflow when triggered                        |
| trigger  | The event that causes a workflow to start                                        |

### AWS CLI Setup

- **Profile name:** default
- **Region:** us-east-1
- **Health check:** `aws sts get-caller-identity` — working ✅

### ci.yml — Annotated

```yaml
# naming the workflow
name: ci

# trigger: runs on every push to any branch
on: [push]

jobs:
  ci:
    # runner: fresh Ubuntu server spun up by GitHub
    runs-on: ubuntu-latest

    steps:
      # uses: pulls in pre-built checkout action
      - name: Check out repository code
        uses: actions/checkout@v4

      # uses: pulls in pre-built Node setup action
      - name: Install Node
        uses: actions/setup-node@v4
        with:
          node-version: '20' # pinned for deterministic builds

      # run: shell commands executed directly on the runner
      - name: Install dependencies
        run: npm install

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test
```

**run vs uses vs name**

- `name` — label for readability in the Actions UI, optional
- `run` — executes a shell command directly on the runner
- `uses` — pulls in a pre-built action from the GitHub marketplace

**CI vs CD**

- CI — auto tests every push so broken code never hits main
- CD — extends CI: after tests pass, code is automatically deployed to AWS (no manual deploys)

---

### Reflections

**What did I build?** GitHub Actions CI pipeline that automatically runs lint and tests on every push.

**What broke?** Intentionally broke the lint script with `exit 1` to see the pipeline fail. Fixed it and watched it go green.

**What do I still not fully understand?** Initially unclear on CI/CD use cases and when to use `run` vs `uses` — answered above.

---

## Day 3 — AWS CLI & Cloud Foundations

### AWS CLI Exploration

All commands ran successfully. Empty output confirms CLI is authenticated and talking to AWS correctly.

```bash
aws s3 ls              # no output — no buckets created yet
aws lambda list-functions  # no output — no functions created yet
aws iam list-users     # no output — no IAM users created yet
aws dynamodb list-tables   # no output — no tables created yet
```

### AWS Skill Builder — Modules 1–3

**Key Concepts**

**Serverless** — not having to manage servers to use services. AWS handles the infrastructure.

**IAM (Identity and Access Management)** — controls who can access your AWS account and what they can do. Handles both authentication and authorization.

**Container** — holds everything an app needs to run in a portable unit: code, runtime, dependencies, and config. Solves the "it works on my machine" problem by carrying its own environment.

**Container orchestration** — automated management of containers at scale across multiple servers (starting, stopping, scaling, routing). Not needed for a serverless Lambda stack.

### AWS Compute Services

| Service               | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| Amazon EC2            | Virtual server in the cloud — you manage OS, CPU, RAM, storage                 |
| Amazon Lambda         | Function as a service — configure a trigger, AWS runs it automatically         |
| AWS Elastic Beanstalk | "Deploy my app" service — give it code and config, it provisions automatically |
| Amazon Lightsail      | Pre-configured virtual servers — EC2 without configuration overhead            |
| AWS Batch             | Designed for heavy batch workloads                                             |
| AWS Outposts          | AWS hardware physically installed in your own data center                      |

**Lambda vs EC2**

|            | Lambda                                        | EC2                                         |
| ---------- | --------------------------------------------- | ------------------------------------------- |
| Management | You write the function and configure triggers | You manage the server                       |
| Cost       | Pay only for execution time                   | Pay 24/7 whether it's running or not        |
| Use case   | Event-driven, short-lived functions           | Long-running workloads, full control needed |

### Container Options

| Service    | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| Amazon ECS | Manages and monitors containers across a cluster                                               |
| Amazon EKS | Kubernetes on AWS — more control than ECS                                                      |
| Fargate    | Serverless compute for containers — ECS/EKS handles orchestration, Fargate handles the servers |

### Messaging & Networking

| Service    | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| Amazon SQS | Holds requests in a queue until a service is ready — pull model |
| Amazon SNS | Sends messages to all subscribers simultaneously — push model   |
| Amazon ELB | Distributes incoming traffic across EC2 instances               |

**SQS vs SNS:** SQS = pull (consumer takes when ready), SNS = push (sends to all subscribers immediately)

---

### DVA-C02 Guide Skim

**Domains and Scoring**
Scaled score 100-1000, passing score is 720

- Development with AWS Services (32%)
- Security (26%)
- Deployment (24%)
- Troubleshooting and Optimization (18%)

## **Topics I haven't heard of**

- Idempotency
- Synchronous and asynchronous patterns
- Fault tolerence/resilient applications
- Database consistency models
- Serializing and deserializing data
- IaC
- Root cause analysis

### Reflections

**What did I build?** Lambda and SQS demos in the AWS console. Added definitions to week1-notes.

**What broke?** Lambda function failed because the IAM role wasn't configured correctly. Added the correct SQS execution role and it worked.

**What do I still not fully understand?** Container orchestration — answered above. Fargate — clarified: serverless compute layer for containers, not relevant to this plan.

## Day 4 - TypeScript + Node.js project template

### Important Tsconfig flags:

- Strict: enhances type checking
- target: scales Javascript features up or down for better compatability for browser. Also changes lib default value
- module: lets you pick the module for the program. A module is a grouping of variables, functions, etc that is private in scope
- outDir: allows you to specify where files will be output to
- rootDir: defines root directory

### devDependencies vs dependencies

- devDependencies for development tools, dependencies for runtime dependencies

### Installed Prettier and ESLint to project

ESLint: static analysis tool for JavaScript and TypeScript that identifies and fixes code problems, such as syntax errors, bugs, and inconsistencies.

Prettier: Code formatter ensures outputted code conforms to a consistent style.

### Reflections

**What did I build?** Configured ESLint and Prettier for use in my repo. Added util functions for TypeScript.

**What broke?** Husky was struggling with finding Node/npx, had to resolve differences of husky pre-commit and week1-notes.md between branch and main, mainly formatting inconsistencies.

**What do I still not fully understand?**
TypeScript syntax, need to learn basics so I can review code better.

## Day 5 - Jest Installation and Unit Testing

### Jest Mock Functions

jest.fn() creates a fake function that tracks how it was called.
Use expect(mock).toHaveBeenCalledWith() to verify it was called with the right arguments.
This pattern is how you test Lambda handlers without hitting real AWS services.

### Reflections

**What did I build?** 9 unit tests for all 3 utils.ts functions, happy case, edge case, error case.

**What broke?** Unit test for chunkArray returning an empty array when given an empty array, accidentally had an empty array within an empty array for .toEqual.

**What do I still not fully understand?** How to write unit tests for error cases that aren't obvious errors - what could go wrong with this input?

## Day 6 — Postman + environment variables + week 1 wrap-up

Downloaded and setup Postman environment with API GET, POST, and DELETE placeholders.

Setup dotenv with repo

### Week 1 Key Takeaways

1. Can you perform the full Git/GitHub workflow in both VS Code and CLI? - clone/init repo on local machine, make branch, make changes, stage changes, commit changes, create pr, merge pr, delete branch
2. Can you explain what GitHub Actions does in plain English? - automates testing/deployment of project, runs automatically on every push.
3. Can you run an AWS CLI command using your configured profile? - aws sts get-caller-identity prints my UserID, account ID, and resource name being used (IAM in this instance)
4. When would you choose VS Code UI vs CLI for a task? - VS Code UI for when lots of different parts and it helps to visualize hierarchy, cli for quick/single file changes/quick pushing
5. What is the difference between "AI helped me" and "I understand it"? - AI helped me is when I just prompt ai and have it tell me what to do step by step and don;t think at all. I understand it is when I read docs/experiment on my own, and spend a decent chunk of time figuring things out on my own and trial and error, then asking for ai to help as last resort, but I can answer questions and have good idea of what I did/why.

### Reflections

**What did I build?** Built Postman environment and API calls, as well as setup dotenv for repo.

**What broke?** baseURL variable did not work because I typoed variable name in environment.

**What do I still not fully understand?** The whole entire Postman workflow, got basics down but need to get actual reps with a real project.

## Weekly Reflection Questions

1. Wha did I build this week? - Full Git workflow in both CLI and VS Code. Created repo. Githubs Actions CI pipeline running lint and tests on push. Lambda and SQS demos in console, ESLint and Prettier configured, 10 unit tests, postman environment, dotenv2
2. What was harder than expected? - Reading the docs and implementing that information into building out on my own. Resisting urge to vibe code.
3. What was easier than expected? - Building the structure/hierarchy of the repo, folders/files are in self-explanatory directories.
4. What do I understand now that I didn't before? - I now understand the whole git workflow and how to do it, basics of aws services and how typescript works, and prettier and eslint.
5. What questions do I still have? - I still have questions about apis, more specifically how they work in practice/what is the http actually for? Need to do a project to fully understand.
6. What would I do differently? - Watch more videos on specific topics. Watched one on jest mock tests and it made way more sense than just docs.
7. Am I on track? Yes - see above takeaways.
