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

- Destroy:

**Why Terraform?**

- Manages and defines infrastructure in consistent and repeatable manner.

## Lab - S3 Bucket

Parameterize bucket name via variable output bucket ARN, add to repo
