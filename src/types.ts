// Internal app state
export type State = {
  deliveryStreams: Record<string, { records: { id: string; content: any }[] }>;
};

// Handler error
export type ErrorResponse = {
  errorCode: number;
  errorMessage: string;
};

// ListDeliveryStreams
export type ListDeliveryStreamsRequest = {
  DeliveryStreamType?: string;
  ExclusiveStartDeliveryStreamName?: string;
  Limit?: number;
};

export type ListDeliveryStreamsResponse = {
  DeliveryStreamNames: string[];
  HasMoreDeliveryStreams: boolean;
};

// PutRecord
export type PutRecordRequest = {
  DeliveryStreamName: string;
  Record: {
    Data: any;
  };
};

export type PutRecordResponse = {
  Encrypted: boolean;
  RecordId: string;
};

// CreateDeliveryStream
export type CreateDeliveryStreamRequest = {
  DeliveryStreamName: string;
};

export type CreateDeliveryStreamResponse = {
  DeliveryStreamARN: string;
};
