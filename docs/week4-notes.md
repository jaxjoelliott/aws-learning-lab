# Week 4 Notes

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
<<<<<<< HEAD

## Day 2 - Complete Infrastructure as Code for ApplicationFlow

Finished creating all five functions, policies, and policy attachments in terraform file. All functions and table infrastructure is now code. Tested in AWS Console.

Added API Gateway resource and configuration for all routes in Terraform.

Backlog for Application-Flow:

1. listApplications — format/sort the response output
2. deleteApplication — return a confirmation message like { "message": "Application deleted" }
3. updateApplication — make fields optional, build UpdateExpression dynamically from whatever fields are in the body
4. Status validation for applications.
   > > > > > > > origin/main

## Day 3 - GitHub Actions/Secrets Handling for ApplicationFlow

Implemented standard CI/CD pattern: code change > push > pipeline runs tests > deploys to AWS

What is working:
All infrastructure managed by Terraform
State stored in S3
GitHub Actions deploys on every push to main
All five Lambda functions are behind API Gateway.

### Reflections

**What did I build?** GitHub Actions CI/CD pipeline that automatically runs lint and tests on every push.

**What broke?** Deployment failed due to Terraform state being stored locally, fixed it by storing it in an S3 bucket.

**What do I still not fully understand?** How this backend works with a real live frontend.

## Day 4 - Postman Testing

Created Postman environment and collection for ApplicationFlow. Fully tested each API request, committed collection to repo.
