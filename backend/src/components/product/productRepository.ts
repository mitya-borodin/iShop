import { MongoDBRepository } from "@rtcts/node";
import { Product } from "../../../../shared";
import { mongoDBConnection } from "../../app/db";

export const productRepository = new MongoDBRepository<Product>(
  "products",
  mongoDBConnection,
  Product,
  {},
);
