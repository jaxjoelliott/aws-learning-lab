# Week 5 Notes

---

## Day 1 - Structured Logs

### Intro Question

Which pillar is my current backend weakest in, and why? - Operational Excellence because the observability of functions and monitoring of errors and usage is not established.

Reorganized ApplicationFlow Jira stories, created Week 5 Epic.

### CloudWatch Examination

Lambdas run, succeed or fail with not trace of what actually happened. No data coming in, what is sent to DynamoDB, or return values.

Added structured logs to createApplication Lambda when request is received, (incoming body) when input received (input and status code), and error (error and input). Structured logging is adding logs to lambda functions to report status of functions in cloudwatch logs. Added it to understand what information was getting passed into functions & what causes errors/successes. It solves the problem of not knowing what is causing my api to react in the way it does to requests.

### ApplicationFlow Backlog

1. listApplications — format/sort the response output
2. deleteApplication — return a confirmation message like { "message": "Application deleted" }
3. updateApplication — make fields optional, build UpdateExpression dynamically from whatever fields are in the body
4. Status validation for applications.
5. Tests for all lambdas to see they actually call console.log

**What did I build?** Added structured logs to createApplication Lambda when request is received, (incoming body) when input received (input and status code), and error (error and input). Structured logging is adding logs to lambda functions to report status of functions in cloudwatch logs. Added it to understand what information was getting passed into functions & what causes errors/successes. It solves the problem of not knowing what is causing my api to react in the way it does to requests.
**What broke?** Lambda functions weren't updating with push to main, had to add source_code_hash to detect changes in the function zip.
**What do I still not fully understand?** How helpful CloudWatch alarms are at scale.

## Day 2 - CloudWatch Alarms

**What did I build?**

**What broke**

**What do I still not fully understand?**

## Day 3 - IAM Least Privilege Audit

## Day 4 - Well-Architected Review

## Day 5 - Backlog and Reflection
