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

## Day 3 - API Gateway & Lambda Functions

HTTP API: basic API, cheap and fast, good for CRUD backend.

Integrations define what to do when your API URL gets hit.

Stages for an API are different configs for different stages of development/deployment (dev, staging, prod).

1. What a path parameter is and how you access it in Lambda - path parameters allow specification of certain variables in a URL, accessed by passing through event object.
2. What ProjectionExpression does in a DynamoDB scan - expresses which fields to retrieve from a table.
3. The difference between Item and Items in DynamoDB responses — and which commands return which - Item is an individual item object, Items is the table of them, GetCommand returns Item, ScanCommand returns Items (array). UpdateCommand and DeleteCommand return Attributes if you request it with ReturnValues.

## Day 4 - Postman Testing

**What did I build?** Created, tested, and saved CRUD API requests in Postman collection and added to Job-Tracker repo.

**What broke?** listApplications.ts had keywords status and position overlapping with DynamoDB keywords. Implemented error checking and found in CloudWatch. Reserved keywords in DynamoDB (status, position, name, etc.) must be aliased with ExpressionAttributeNames when used in expressions. Use #alias syntax.

**What do I still not fully understand?** How did people create these things before AI? Where does AI fit into the future of development? Docs/error messages take so long to navigate. For Jira, how do companies standardize ticket creation/fulfillment?

**What do I understand now that I didn't before?** I understand how to test APIs with Postman, Lambda function creation/configuration, and navigation of AWS console overall.

## Day 5 - S3 Bucket exercise

S3 — Simple Storage Service. Stores any file as an object in a bucket. Objects accessed by key. Scales infinitely, cheap storage. Not a database — no querying, just put/get by key.

Lambda - Stores function code to run when triggered by certain events. Code can run for max of 15 minutes, charged by ms.

API Gateway - Sits in front of API calls to handle configuration, direction, and traffic.

DynamoDB - Automatically scalable, serverless, NoSQL database that supports quick access to data.

CloudWatch - Collects logs, metrics, and events from AWS. Great for debugging and tracking performance

IAM - Configures who and what can access AWS resources. Users have permanent credentials, roles are temporarily assumed by services. Polices attached to roles define allowed actions.

## Day 6 - DVA-C02 domain skim

Gap list by domain:

Domain 1 - Development gaps: Dead-letter queues, Lambda Destinations, DynamoDB consistency models, high-cardinality partition keys, streaming data, EventBridge patterns, sync vs async patterns, orchestration/fanout, microservices patterns. Covered Weeks 6-7.

Domain 2 - Security gaps: Encryption at rest/in transit, Cognito auth, bearer tokens, fine-grained IAM, data sanitization, secrets encryption. Covered Weeks 5 and 8.

Domain 3 - Deployment gaps: AWS SAM concepts, Lambda aliases, environment promotion, integration testing patterns. Covered Weeks 9-10.

Domain 4 - Troubleshooting gaps: Structured logging, custom metrics, X-Ray tracing, concurrency limits, performance optimization, CloudWatch alarms. Covered Weeks 5 and 10.

Concepts clarified today:

Mocking the SDK — jest.mock('@aws-sdk/lib-dynamodb') replaces the real library with a fake so tests don't make real network calls.

SDK vs service — DynamoDB is the service, @aws-sdk/lib-dynamodb is the library you use to talk to it.

Logging vs monitoring vs observability — logging records info, monitoring watches for changes, observability is how well the system can be understood from its outputs.

Concurrency in Lambda — how many function instances run simultaneously. 100 requests = 100 instances. Has account-level limits.

Overall assessment: Strongest domain is Deployment. Biggest gaps are Security and Troubleshooting. Most gaps covered by Week 10.
