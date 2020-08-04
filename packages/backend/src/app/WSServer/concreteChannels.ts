/* eslint-disable @typescript-eslint/ban-types */
import { Channels } from "@rtcts/node";
import { webSocketChannelsEnum } from "@rtcts/ishop-shared";

export class ConcreteChannels extends Channels {
  public sendUser = (
    payload: object,
    uid: string,
    wsid: string,
    excludeCurrentDevice?: boolean,
  ): void => {
    this.send(webSocketChannelsEnum.USER_CHANNEL, payload, uid, wsid, excludeCurrentDevice);
  };

  public sendProduct = (
    payload: object,
    uid: string,
    wsid: string,
    excludeCurrentDevice?: boolean,
  ): void => {
    this.send(webSocketChannelsEnum.PRODUCT_CHANNEL, payload, uid, wsid, excludeCurrentDevice);
  };
}

export const concreteChannels = new ConcreteChannels();
