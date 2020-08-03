import { HttpTransport, Model } from "@rtcts/node";
import { Product, User, userGroupEnum } from "../../../../shared";
import { productModel } from "./productModel";
import { concreteChannels, ConcreteChannels } from "../../app/WSServer/concreteChannels";

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
