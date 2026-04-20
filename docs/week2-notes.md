# Week 2 Notes

---

## Day 1 — Terraform foundations

Terraform is a state machine, not a script.

## Topics - Providers, resources, variables

**What is Terraform?**

IaC: management of infrastructure with definition files instead of manual configuration.

Terraform creates and manages cloud platform resources through APIs.

**Core Terraform Workflow**

- Write: Define resources, potentially across multiple providers/services, in config files

- Plan: Creates execution plan describing infrastructure to be created, updated, or destroyed.

- Apply: On approval, performs operations in correct order

- Destroy: Tears down all resources defined in config, in order

**Why Terraform?**

- Manages and defines infrastructure in consistent and repeatable manner.

### Lab - S3 Bucket

Parameterize bucket name via variable output bucket ARN, add to repo

### Reflections

**What did I build?** Terraform config to create an S3 bucket on us-east-1 region.

**What broke?** Terraform did not install correctly the first time because it was not kept on homebrew, secondary installation method was used instead.

**What do I still not fully understand?** Terraform syntax, need more reps to understand what goes into a variable or listing providers.

**What did the full lifecycle feel like?** Very simple, it is nice not having to navigate a GUI. Can be very specific with parameters and instructions for what resources need to look like.

**What is .tfstate and why don't we commit it?** .tfstate maps your Terraform config to real AWS resources. We don't commit it because it can contain sensitive values like resource IDs and ARNs, and committing it risks state conflicts when working in a team.

## Day 2 — Secrets handling

**What did I build?** .env.example with placeholder values, GitHub Actions secret injection, unit test for if code is missing an env variable

**What broke?** Unit test broke when TEST_SECRET was hardcoded to have a value, test is supposed to throw when it is not set. Testing breaking.

**What do I still not fully understand?** The full process of creating APIs and then calling them, need reps badly.

**What do I understand now that I didn't before?** The .env.example documents what variables an app needs without exposing the real values. .evn has real values and is never committed. Continuous integration uses GitHub secrets. Production uses AWS Systems Manager Parameter store, the code just reads process.env (doesn't store anything permanently) and variables are injected at runtime.

## Day 3 - Jira + Project Arc

Setup Jira, Created AWS Learning Lab workspace and Epic 1 Workflow Foundations and Epic 2 Job Application Tracker

Project Idea: Job Application Tracker

main object in JS:

const app = {
id (UUID)
date_applied(string):
status:
company:
position:
wage:
link:
contact(phone or email as string):
free notes(string):
};

CRUD API:
POST /applications create a new application
GET /applications get all applications
GET /applications/{id} get one application
PUT /applications/{id} update an application
DELETE /applications/{id} delete an application

Table: job-applications
Partition key: id (String)
GSI: status-index (status)

Lambda:
POST /applications → createApplication
GET /applications → listApplications
GET /applications/{id} → getApplication
PUT /applications/{id} → updateApplication
DELETE /applications/{id} → deleteApplication

Backend: Client → API Gateway → Lambda → DynamoDB

## Weekly Reflection Questions

1. What did I build this week? - Terraform hello-world S3 bucket, .env.example and secrets handling, Github Actions secret injection, Jira project.
2. What was harder than expected? - Understanding the implementation with the shallow level of practice - definitely need more reps.
3. What was easier than expected? - Getting a grasp on basic concepts.
4. What do I understand now that I didn't before? - I now understand what Terraform is and why is is useful and standard, secret handling as a concept, and Jira basics and it's use case.
5. What questions do I still have? - I still have questions on how people learned these concepts before AI, as well as why learning this stuff matters if AI is so good at it already and will only get better.
6. What would I do differently? - Mess around with what I build a little more before moving on.
7. Am I on track? Yes
