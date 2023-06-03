// doc: https://docs.aws.amazon.com/firehose/latest/APIReference/API_ListDeliveryStreams.html
// aws cli doc: https://docs.aws.amazon.com/cli/latest/reference/firehose/index.html

import { State, state } from "./state";
import {
  ListDeliveryStreamsRequest,
  ListDeliveryStreamsResponse,
} from "./types";

// ListDeliveryStreams
const listDeliveryStreams = (
  req: ListDeliveryStreamsRequest,
  state: State
): ListDeliveryStreamsResponse => {
  console.debug("Firehose: List delivery streams");
  return {
    DeliveryStreamNames: state.deliveryStreams
      .map((v) => v.name)
      .slice(0, req.Limit ?? 10),
    HasMoreDeliveryStreams: state.deliveryStreams.length > 0,
  };
};

// handlers
const targetHandlers: Record<string, (req: any, state: State) => any> = {
  ["Firehose_20150804.ListDeliveryStreams"]: listDeliveryStreams,
};

export const firehoseMock = {
  getState: () => state,
  handle: (target: string, body: any) => {
    if (targetHandlers[target]) {
      console.debug("Handle request ", target, body);
      return {
        status: 200,
        body: targetHandlers[target](body, state),
      };
    } else {
      console.warn("Unsupported target ", target, body);
      return { status: 400 };
    }
  },
};
