# AWS Learning Lab

![ci](https://github.com/jaxjoelliott/aws-learning-lab/actions/workflows/ci.yml/badge.svg)

12-week AWS serverless developer program targeting junior cloud readiness
and AWS Certified Developer Associate (DVA-C02).

## Stack

Lambda · API Gateway · DynamoDB · S3 · Terraform · GitHub Actions · Jest · Playwright

## What gets built

2–3 production-grade serverless applications with infrastructure as code,
comprehensive testing, CI/CD pipelines, and Well-Architected reviews.

## Progress

| Week | Topic                                         | Status      |
| ---- | --------------------------------------------- | ----------- |
| 1    | Environment & Git/GitHub foundations          | Complete    |
| 2    | Terraform, Jest, Postman, TypeScript template | Complete    |
| 3    | Core AWS services & first serverless API      | Complete    |
| 4    | Job Tracker — full CRUD API                   | Complete    |
| 5    | Well-Architectured Review                     | Complete    |
| 6    | Simple Notification Service                   | In Progress |

## Projects

| Project            | Description                                                                                                                        | Repo                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ApplicationFlow    | Serverless REST API for tracking job applications — full CRUD with Lambda, API Gateway, DynamoDB, Terraform, and CI/CD auto-deploy | [jaxjoelliott/application-flow](https://github.com/jaxjoelliott/application-flow)     |
| AWS Job Status API | Async job processing API — submit a job via HTTP, process it through SQS + Lambda worker, poll DynamoDB for status (In Progress)   | [jaxjoelliott/aws-job-status-api](https://github.com/jaxjoelliott/aws-job-status-api) |

## Structure

Each week ships a working deliverable. Code is written before AI is consulted.

## Setup

```bash
git clone https://github.com/jaxjoelliott/aws-learning-lab.git
cd aws-learning-lab
npm install
cp .env.example .env
```
