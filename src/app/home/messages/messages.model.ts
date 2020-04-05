export interface Messages {
  id: string;
  fromUserMobile: string;
  toUserMobile: string;
  messageContent: string;
  sentDate?: Date;
  readDate?: Date;
}
