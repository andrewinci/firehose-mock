// Internal app state
export type State = {
  deliveryStreams: Record<string, { records: { id: string; content: any }[] }>;
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

export type ErrorResponse = {
  errorCode: number;
  errorMessage: string;
};
