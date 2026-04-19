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
