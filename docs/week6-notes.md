# Week 6 Notes

---

## Day 1 - Async Fundamentals + SQS Core

1. You have a synchronous CRUD API. A user submits a request to generate a PDF report that takes 45 seconds. What breaks? Why? - The Lambda gets timed out by API Gateway's limit of 29 seconds
2. What does it mean for a system to be "decoupled"? Why would you want that? - For a system to be decoupled means that each part of the system operates independently. If one part breaks, then the other parts continue working without interruption,
3. If you delete the worker Lambda entirely, what happens to messages in the queue? - The messages in the queue sit in the queue indefinitely.

Visibility Timeout - when a component receives a message, while it is being processed by the component, the visibility timeout prevents other components from processing that same message so it doesn't get processed again.

**What did I build?** Two SQS queues, one for receiving messages and one for dead letter queue. Max receives was three, built visual understanding of what is happening with receiving messages and how DLQ works in console.

**What broke** Message wasn't going into DLQ, needed to receive it three times to transition, will happen when Lambda is processing messages.

**What do I still not fully understand?** Configuration setting for SQS other than DLQ and visibility timeout.

## Day 2 - Terraform Foundation

**What did I build?** Terraform infrastructure for project: IAM roles, policies, attachments with scoped permissions, SQS main queue with DLQ & redrive, DynamoDB table, Lambda stubs, remote state in S3

**What broke** Terraform apply failed first time because I forgot to delete the manual SQS queue I tested yesterday with the same name.

**What do I still not fully understand?** SQS Redrive - tells SQS where and when to move a failed message
