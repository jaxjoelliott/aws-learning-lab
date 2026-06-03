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

## Day 3 - Core Lambda Logic

1. What should submitJob do step by step? List every action in order. - submitJob receives the HTTP request, validates body, generates ID, writes record to DynamoDB with PENDING status, sends SQS message with ID, returns 202 with ID
2. What should processJob do step by step? List every action in order. - processJob is triggered by SQS, reads ID, fetches record from DynamoDB, updates status to PROCESSING, does the "work", updates status to COMPLETED, returns nothing.
3. What does the SQS message contain — the full job payload or just the job ID? Why? - Just the job ID because the full payload would be too much and we can differentiate with just ID.

**What did I build?** submitJob and processJob Lambda handlers, Lint and Prettier configs, Typescript config, IAM permissions for Lambdas, SQS event source mapping

**What broke** During first test, worker Lambda needed updateItem DynamoDB permission, added it in iam.tf

**What do I still not fully understand?** How do people get so good at this stuff where it becomes second nature? I feel as though AI is carving a path for me.

1. Why does the worker need UpdateItem but not the submit Lambda? - The submit Lambda is only creating an item, so it only needs PutItem, worker has to update the status so it needs to edit existing items.
2. What happens to a message if the worker crashes mid-processing? - The visibility timeout ends, then the message reappears and is taken by the next available worker. If a message is processed and already has a status of PROCESSING or COMPLETED, then the message is skipped by the worker.
3. Why does the event source mapping need GetQueueAttributes? - To inspect the queue config to ensure the queue is compatible.

## Day 4 - Core Lambda Logic

1. What should getJobStatus do step by step? - Extract jobID from the URL path, fetch the record from DynamoDB, if not found return 404, if found return 200 with status

**What did I build?** getJobStatus Lambda handler, API gateway with routes for both endpoints, DLQ tested, CloudWatch Alarm for DLQ

**What broke** DLQ wasn't receiving messages, intentional error throw was not rethrown in catch, so Lambda didn't fail to run.

**What do I still not fully understand?** Why have try/catch block with DLQ - Try/Catch handles error gracefully at code level and logs what went wrong, DLQ handles failure at infrastructure so they don't retry forever.
