# Firehose mock

AWS firehose mock server for testing.

## Dev

Run the server locally with

```bash
yarn start
```

Lint

```bash
yarn lint
```

Package and run

```bash
yarn package && docker run -p8080:8080 firehose-mock
```
