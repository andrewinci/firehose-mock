# Firehose mock

AWS firehose mock server for testing.

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
