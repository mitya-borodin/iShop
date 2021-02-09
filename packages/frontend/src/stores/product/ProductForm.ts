import { RepositoryFormStore, WSClient } from "@rtcts/browser";
import type { Product, ProductData } from "@rtcts/ishop-shared";
import type Eventemitter from "eventemitter3";
import type { ProductHttpTransport } from "./ProductHttpTransport";
import type { ProductRepository } from "./ProductRepository";

export class ProductFormStore extends RepositoryFormStore<
  ProductHttpTransport,
  Product,
  ProductData,
  ProductRepository,
  WSClient,
  Eventemitter
> {}
