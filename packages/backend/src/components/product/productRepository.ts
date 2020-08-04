import { Product } from "@rtcts/ishop-shared";
import { MongoDBRepository } from "@rtcts/node";
import { mongoDBConnection } from "../../app/db";

export const productRepository = new MongoDBRepository<Product>(
  "products",
  mongoDBConnection,
  Product,
  {},
);
