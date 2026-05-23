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

Three alarms to create: errors, throttles, duration

Threshold: number/anomaly the metric must breach to trigger alarm.

Datapoints: Metrics checked every x minutes/period. If metric exceeds threshold in however many periods it fires alarm.

Missing data treatment: When function is idle, you have three options:

- Treat as missing: ignore the gap, don't change alarm state. - Best for errors because no invocations means no errors.
- Treat as breaching: silence counts as a problem. Use this when "not hearing from it" is itself alarming.
- Treat as good: silence counts as everything being fine.

Rule of thumb for alarms: Set at 80% of timeout.

**What did I build?** Three CloudWatch alarms for createApplication Lambda, for errors, throttles, and duration.

**What broke** Nothing broke today, just in AWS Console creating alarms. CloudWatch didn't show Lambda metrics until I invoked a function.

**What do I still not fully understand?** How to optimize datapoints on alarms.

## Day 3 - IAM Least Privilege Audit

All Lambdas shared a singular basic_lambda_role that had all needed policies attached.

The role is the identity that a Lambda function assumes when it runs. The policies define what that identity is allowed to do. You never attach permissions directly to a function, you attach them to a role, and the function assumes that role at runtime.

Common pattern for Terraform:

main.tf for provider and backend config
iam.tf for all IAM roles and policies
lambda.tf for Lambda functions
api_gateway.tf for API Gateway resources
dynamodb.tf for DynamoDB tables
variables.tf for variables
outputs.tf for outputs

**What did I build?** Refactored entire IAM setup from one role to five least privilege roles, scoped to function needs.

**What broke** Nothing broke, Terraform planned and applied cleanly. All endpoints worked after.

**What do I still not fully understand?** How are terraform files structured to handle lots of resources?

## Day 4 - Well-Architected Review

## Day 5 - Backlog and Reflection
