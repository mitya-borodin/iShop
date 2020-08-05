import { Repository, WSClient } from "@rtcts/browser";
import { Product } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";
import { ProductHttpTransport } from "./ProductHttpTransport";

export class ProductRepository extends Repository<
  ProductHttpTransport,
  Product,
  WSClient,
  Eventemitter
> {}
