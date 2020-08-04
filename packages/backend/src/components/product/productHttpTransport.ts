import { Product, User, userGroupEnum } from "@rtcts/ishop-shared";
import { HttpTransport, Model } from "@rtcts/node";
import { concreteChannels, ConcreteChannels } from "../../app/WSServer/concreteChannels";
import { productModel } from "./productModel";

export const productHttpTransport = new HttpTransport<
  Model<Product>,
  Product,
  User,
  ConcreteChannels
>(
  "product",
  Product,
  productModel,
  concreteChannels,
  {
    getList: [userGroupEnum.manager],
    getItem: [userGroupEnum.manager],
    create: [userGroupEnum.manager],
    update: [userGroupEnum.manager],
    remove: [userGroupEnum.manager],
    channel: [userGroupEnum.manager],
  },
  {
    getList: true,
    getItem: true,
    create: true,
    update: true,
    remove: true,
    channel: true,
  },
  User,
);
