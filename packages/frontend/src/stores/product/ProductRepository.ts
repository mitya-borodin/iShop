import { Repository, WSClient } from "@rtcts/browser";
import type { Product } from "@rtcts/ishop-shared";
import type Eventemitter from "eventemitter3";
import type { ProductHttpTransport } from "./ProductHttpTransport";

export class ProductRepository extends Repository<
  ProductHttpTransport,
  Product,
  WSClient,
  Eventemitter
> {}
