import { RepositoryHttpTransport, WSClient } from "@rtcts/browser";
import type { Product } from "@rtcts/ishop-shared";
import type Eventemitter from "eventemitter3";

export class ProductHttpTransport extends RepositoryHttpTransport<
  Product,
  WSClient,
  Eventemitter
> {}
