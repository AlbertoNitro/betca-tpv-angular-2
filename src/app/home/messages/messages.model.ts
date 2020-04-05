export interface Messages {
  id: string;
  fromUsername: string;
  toUsername: string;
  messageContent: string;
  sentDate: string;
  readDate?: string;
}
