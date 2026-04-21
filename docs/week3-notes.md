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
