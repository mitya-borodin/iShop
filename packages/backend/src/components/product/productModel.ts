import { Product } from "@rtcts/ishop-shared";
import { Model } from "@rtcts/node";
import { concreteChannels } from "../../app/WSServer/concreteChannels";
import { productRepository } from "./productRepository";

export const productModel = new Model<Product>(
  Product,
  productRepository,
  concreteChannels.sendProduct,
);
