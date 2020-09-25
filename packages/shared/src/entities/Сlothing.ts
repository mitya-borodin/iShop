import { Entity, EntityId, logTypeEnum, Validation, ValidationResult } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";
import { currencyEnum } from "../enums/currencyEnum";
import { priceEnum } from "../enums/priceEnum";
import { sizeEnum } from "../enums/sizeEnum";
import { Color } from "./Color";
import { Price } from "./Price";

// * Для сущности Customer необходимо сделать сущность CustomerCache.

export interface ClothingData {
  readonly id?: string;
  readonly collection?: string;
  readonly name?: string;
  readonly likes?: number;
  readonly price?: Price;
  readonly colors?: Color[];
  readonly sizes?: Array<{
    title?: string;
    description?: string;
    type: "clothes" | "shoes";
    value:
      | sizeEnum.XXS
      | sizeEnum.XS
      | sizeEnum.S
      | sizeEnum.M
      | sizeEnum.L
      | sizeEnum.XL
      | sizeEnum.XXL
      | sizeEnum.XXXL
      | sizeEnum.XXXXL
      | sizeEnum.ONE_SIZE;
    shoulders?: number;
    chestCircumference?: number;
    waistGirth?: number;
    hipGirth?: number;
    armLength?: number;
    innerSeamLength?: number;
    outerSeamLength?: number;
  }>;
  sizeLegendId?: string;
}

const stringFields: string[] = ["name", "collection"];
const numberFields: string[] = ["likes"];

export class Clothing implements Entity {
  readonly id?: string;
  readonly name?: string;
  readonly collection?: string;
  readonly likes?: number;
  readonly price?: {
    type: priceEnum.wholesale | priceEnum.retail | priceEnum.special;
    currency: currencyEnum.RUB | currencyEnum.USD | currencyEnum.EUR;
    amount: number;
    discount?: number;
  };
  readonly colors?: Array<{
    name: string;
    value?: string;
    СlothingId?: string;
    image?: string;
  }>;

  constructor(data: Partial<EntityId> & Partial<ClothingData>) {
    if (data) {
      for (const field of stringFields) {
        if (isString(data[field])) {
          this[field] = data[field];
        }
      }
      for (const field of numberFields) {
        if (isString(data[field])) {
          this[field] = data[field];
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }
  isEntity(): this is { id: string } {
    this.isInsert();

    if (!isString(this.id)) {
      throw new Error(`${this.constructor.name}.is should be string`);
    }

    return true;
  }
  hasId(): this is { id: string } {
    return isString(this.id);
  }

  public isInsert(): this is Required<ClothingData> {
    for (const field of stringFields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be string`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!isString(this.name)) {
      validates.push(
        new Validation({
          field: "name",
          message: `Name should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    return new ValidationResult(validates);
  }

  toObject(): ClothingData {
    return {
      ...(typeof this.id === "string" ? { id: this.id } : {}),
      name: this.name,
    };
  }

  toJSON(): ClothingData {
    return this.toObject();
  }

  toJS(): ClothingData {
    return this.toObject();
  }
}
