#bucket arn
output "bucket_arn" {
  value = aws_s3_bucket.example.arn
}
