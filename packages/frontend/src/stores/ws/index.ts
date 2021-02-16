import { WSClient } from "@rtcts/browser";

export const wsClient = new WSClient(window.location.host, "ws", false);
