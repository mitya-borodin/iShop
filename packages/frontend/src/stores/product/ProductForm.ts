import { RepositoryFormStore, WSClient } from "@rtcts/browser";
import { Product, ProductData } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";
import { ProductHttpTransport } from "./ProductHttpTransport";
import { ProductRepository } from "./ProductRepository";

export class ProductFormStore extends RepositoryFormStore<
  ProductHttpTransport,
  Product,
  ProductData,
  ProductRepository,
  WSClient,
  Eventemitter
> {}
