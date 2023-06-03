// doc: https://docs.aws.amazon.com/firehose/latest/APIReference/API_ListDeliveryStreams.html
// aws cli doc: https://docs.aws.amazon.com/cli/latest/reference/firehose/index.html

import { v4 as uuid } from "uuid";
import {
  CreateDeliveryStreamRequest,
  CreateDeliveryStreamResponse,
  ErrorResponse,
  ListDeliveryStreamsRequest,
  ListDeliveryStreamsResponse,
  PutRecordRequest,
  PutRecordResponse,
  State,
} from "./types";

const state_: State = {
  deliveryStreams: {
    test: { records: [] },
  },
};

// ListDeliveryStreams
const listDeliveryStreams = (
  req: ListDeliveryStreamsRequest,
  state: State
): ListDeliveryStreamsResponse => {
  console.debug("Firehose: List delivery streams");
  const streams = Object.keys(state.deliveryStreams);
  return {
    DeliveryStreamNames: streams.slice(0, req.Limit ?? 10),
    HasMoreDeliveryStreams: streams.length > 0,
  };
};

// PutRecord
const putRecord = (
  req: PutRecordRequest,
  state: State
): PutRecordResponse | ErrorResponse => {
  console.debug("Firehose: Put record");
  const recordId: string = uuid();
  if (!state.deliveryStreams[req.DeliveryStreamName]) {
    return {
      errorCode: 400,
      errorMessage: `Firehose ${req.DeliveryStreamName} not found.`,
    };
  }
  state.deliveryStreams[req.DeliveryStreamName].records.push({
    id: recordId,
    content: req.Record.Data,
  });
  return {
    Encrypted: false,
    RecordId: recordId,
  };
};

const createDeliveryStream = (
  req: CreateDeliveryStreamRequest,
  state: State
): CreateDeliveryStreamResponse => {
  state.deliveryStreams[req.DeliveryStreamName] = { records: [] };
  return {
    //just a fake arn from the aws documentation
    DeliveryStreamARN: `arn:aws:firehose:us-east-1:814985986679:deliverystream/${req.DeliveryStreamName}`,
  };
};

// handlers
const targetHandlers: Record<string, (req: any, state: State) => any> = {
  "Firehose_20150804.ListDeliveryStreams": listDeliveryStreams,
  "Firehose_20150804.PutRecord": putRecord,
  "Firehose_20150804.CreateDeliveryStream": createDeliveryStream,
};

export const firehoseMock = {
  getState: () => state_,
  handle: (target: string, body: any) => {
    if (targetHandlers[target]) {
      console.debug("Handle request ", target, body);
      const res = targetHandlers[target](body, state_);
      if ("errorCode" in res) {
        return {
          status: res.errorCode,
          body: {
            message: res.errorMessage,
          },
        };
      }
      return {
        status: 200,
        body: res,
      };
    } else {
      console.warn("Unsupported target ", target, body);
      return {
        status: 400,
        body: {
          message: "Unsupported operation in firehose-mock",
        },
      };
    }
  },
};
