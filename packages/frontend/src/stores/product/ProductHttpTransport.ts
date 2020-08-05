import { RepositoryHttpTransport, WSClient } from "@rtcts/browser";
import { Product } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";

export class ProductHttpTransport extends RepositoryHttpTransport<
  Product,
  WSClient,
  Eventemitter
> {}
