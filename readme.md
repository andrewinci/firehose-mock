# Firehose mock

Mock server for AWS firehose to facilitate testing.

## Supported operations

- [x] CreateDeliveryStream
- [x] ListDeliveryStreams
- [x] PutRecord
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
