# Firehose mock

Mock server for AWS firehose to facilitate testing.

Run the latest version with docker 

```bash
docker run -p8080:8080 --rm andrewinci/firehose-mock
```

## Supported operations

- [x] CreateDeliveryStream  
    `aws firehose create-delivery-stream --delivery-stream-name=test2 --endpoint=http://localhost:8080 `
- [x] ListDeliveryStreams  
    `aws firehose list-delivery-streams --endpoint=http://localhost:8080`
- [x] PutRecord  
    `aws firehose put-record --delivery-stream-name test --record '{"Data": "SGVsbG8gd29ybGQ=" }' --endpoint=http://localhost:8080`
- [ ] PutRecordBatch
- [ ] DeleteDeliveryStream
- [ ] DescribeDeliveryStream
- [ ] StartDeliveryStreamEncryption
- [ ] StopDeliveryStreamEncryption
- [ ] ListTagsForDeliveryStream
- [ ] TagDeliveryStream
- [ ] UntagDeliveryStream
- [ ] UpdateDestination

## Dev

Run the app locally with hot reload

```bash
yarn dev
```

Lint

```bash
yarn lint
```

Package and run

```bash
yarn package && docker run -p8080:8080 firehose-mock
```
