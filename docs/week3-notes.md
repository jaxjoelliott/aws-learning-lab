# Week 3 Notes

---

## Day 1 - IAM fundamentals & AWS Console orientation

### Intro Questions

1. How is permission granted to Lambda? - Lambda functions assume an IAM role at runtime, and the policies attached to that role are checked by AWS on every call and determine what the function can do.
2. IAM user vs role - A user has permanent credentials, while a role is assumed temporarily by whatever needs it.
3. Lambda vs EC2 - Lambda only runs when called, EC2 is always running

### IAM Role Creation

- A role's trusted entity defines who can assume it.

### First Lambda Succeeded

Changed runtime to Node 22 instead of 26,

- Console.log goes to CloudWatch Logs automatically, Cold start vs execution duration visible in REPORT line.

- Had to add AWSLambdaBasicExecutionRole to write to CloudWatch logs. Refreshing was finicky.

1. What an IAM role is and why Lambda uses one instead of user credentials - IAM role is a flag with policies that can be attached to a tool or account to determine it's permissions. Lambda uses it because it does not need permanent credentials, but only occasional checks.
2. The two policies your Lambda role needs and what each one does - AWSLambdaBasicExecutionRole gives Lambda permission to create log groups, streams, and write events to CloudWatch. AWSdynamodbfullaccess gives full access to dynamodb.
3. What a cold start is and where you see it in the logs - A cold start is when receiving a new request to run code aws has to create a new runtime from scratch, can be seen in Init Duration. Same function ran 20x faster when warm. 31ms > 1.73ms.

## Day 2 - Start Job Tracker Project

Created scaffolding for job-tracker project

Removed build command from CI pipeline, only need Lint/Prettier checking.

Created DynamoDB table resource in main.tf.

createApplication handler — parses body, generates UUID, writes to DynamoDB. try/catch returns 400 on bad input. Mocked DynamoDB client in tests so no real AWS calls made.

Deployed Lambda by compiling TypeScript to JS first — Lambda can't run .ts directly. Zipped dist/ and node_modules/ together. Handler path must match compiled output: dist/handlers/createApplication.handler. TABLE_NAME set as environment variable so code isn't hardcoded to a specific table.

**What did I build?** DynamoDb table provisioned with Terraform, createApplication Lambda, error handling, two unit tests, item written to DynamoDB with AWS console.

**What broke?** TypeScript file doesn't work in Lambda, compiled it to JS.

**What do I still not fully understand?** All the conventions and files needed for Lambda functions, always need try & catch? Need more experience for structure to click. - Yes, try/catch is not optional in production code.

**What do I understand now that I didn't before?** Basics of setting up DynamoDB table and Lambda function, need fields, how to access through AWS console.

## Day 3 - API Gateway

HTTP API: basic API, cheap and fast, good for CRUD backend.

Integrations define what to do when your API URL gets hit.

Stages for an API are different configs for different stages of development/deployment (dev, staging, prod).
