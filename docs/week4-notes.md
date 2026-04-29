# Week 3 Notes

---

## Day 1 - Terraform takes over Lambda

### Intro Questions

What does a Terraform resource block look like, and what do you think you'd need to specify to also manage a Lambda function in Terraform? - A terraform resource block would need to have the apps it is configuring in it, what changes it is making to them, and zip file of compiled code. To manage a lambda function, need to manage code in lambda, roles for the function, runtime settings, handler function.

What AWS concept controls what a service is allowed to do, and do you know what it's called in the context of Lambda specifically? - AWS IAM. In the context of lambda, an IAM role to assume while in use.

Built:

- IAM role and policies managed in Terraform
  DynamoDB table managed in Terraform
- Lambda function deployed via Terraform with correct permissions
- End to end: Terraform provisions infrastructure, Lambda writes to DynamoDB
- Custom PutItemPolicy that only allows dynamodb:PutItem on a specific table.

Used template from Terraform Hello World and Terraform docs to create, not too difficult. Deleted the manually created roles, DynamoDB table and Lambda functions for a clean slate.

Pattern: IAM role, policy, then policy attachment, then resource assuming that role.
