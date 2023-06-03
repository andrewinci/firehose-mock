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
