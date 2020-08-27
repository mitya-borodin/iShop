import { Product, userGroupEnum, webSocketChannelsEnum } from "@rtcts/ishop-shared";
import { pubSub } from "../../shared/pubSub";
import { wsClient } from "../ws";
import { ProductFormStore } from "./ProductForm";
import { ProductHttpTransport } from "./ProductHttpTransport";
import { ProductRepository } from "./ProductRepository";

export const productHttpTransport = new ProductHttpTransport(
  "product",
  Product,
  wsClient,
  webSocketChannelsEnum.PRODUCT_CHANNEL,
  {
    collection: [userGroupEnum.manager],
    read: [userGroupEnum.manager],
    create: [userGroupEnum.manager],
    update: [userGroupEnum.manager],
    remove: [userGroupEnum.manager],
    subscribeToChannel: [userGroupEnum.manager],
    unsubscribeFromChannel: [userGroupEnum.manager],
  },
  pubSub,
);

export const productRepository = new ProductRepository(
  productHttpTransport,
  Product,
  wsClient,
  webSocketChannelsEnum.PRODUCT_CHANNEL,
  pubSub,
);

export const productFormStore = new ProductFormStore(Product, productRepository);
