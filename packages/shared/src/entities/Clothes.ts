import { Entity, EntityId, logTypeEnum, Validation, ValidationResult } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";
import { sizeTypeEnum } from "../enums/sizeTypeEnum";
import { BodySize } from "./BodySize";
import { Color } from "./Color";
import { Price } from "./Price";
import { ShoesSize } from "./ShoesSize";

export interface ClothesData {
  readonly id?: string;
  readonly collection?: string;
  readonly name?: string;
  readonly likes?: number;
  readonly price?: Price;
  readonly colors?: Color[];
  readonly sizes?: Array<BodySize | ShoesSize>;
  readonly sizeLegendId?: string;
}

const stringFields: string[] = ["id", "collection", "name", "sizeLegendId"];
const numberFields: string[] = ["likes"];

export class Clothes implements Entity {
  readonly id?: string;
  readonly collection?: string;
  readonly name?: string;
  readonly likes?: number;
  readonly price?: Price;
  readonly colors?: Color[];
  readonly sizes?: Array<BodySize | ShoesSize>;
  readonly sizeLegendId?: string;

  constructor(data: Partial<EntityId> & Partial<ClothesData>) {
    if (data) {
      for (const field of stringFields) {
        if (typeof data[field] === "string") {
          this[field] = data[field];
        }
      }

      for (const field of numberFields) {
        if (typeof data[field] === "number") {
          this[field] = data[field];
        }
      }

      if (typeof data.price === "object") {
        this.price = new Price(data.price);
      }

      if (Array.isArray(data.colors)) {
        this.colors = data.colors.map((color) => new Color(color));
      }

      if (Array.isArray(data.sizes)) {
        this.sizes = data.sizes.map((size): BodySize | ShoesSize => {
          if (size.wearType === sizeTypeEnum.CLOTHES) {
            return new BodySize(size);
          }

          if (size.wearType === sizeTypeEnum.SHOES) {
            return new ShoesSize(size);
          }

          throw new Error(`Size should be instance of BodySize or ShoesSize`);
        });
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }
  public isEntity(): this is { id: string } {
    this.isInsert();

    if (!isString(this.id)) {
      throw new Error(`${this.constructor.name}.is should be string`);
    }

    return true;
  }
  public hasId(): this is { id: string } {
    return isString(this.id);
  }

  public isInsert(): this is Required<ClothesData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be string`);
      }
    }

    for (const field of numberFields) {
      if (typeof this[field] !== "number") {
        throw new Error(`${this.constructor.name}.${field} should be number`);
      }
    }

    if (!(this.price instanceof Price)) {
      throw new Error(`${this.constructor.name}.price should be instance of Prise`);
    }

    if (!Array.isArray(this.colors)) {
      throw new Error(`${this.constructor.name}.colors should be instance of Array`);
    }

    this.colors?.forEach((color, index) => {
      if (!(color instanceof Color)) {
        throw new Error(`${this.constructor.name}.colors[${index}] should be instance of Color`);
      }
    });

    if (!Array.isArray(this.sizes)) {
      throw new Error(`${this.constructor.name}.sizes should be instance of Array`);
    }

    this.sizes?.forEach((size, index) => {
      if (!(size instanceof BodySize) && !(size instanceof ShoesSize)) {
        throw new Error(
          `${this.constructor.name}.colors[${index}] should be instance of BodySize or ShoesSize`,
        );
      }
    });

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

    this.price
      ?.validation()
      .toValidation()
      .forEach((validation) => {
        validates.push(
          new Validation({
            ...validation.toObject(),
            field: `price.${validation.field as string}`,
          }),
        );
      });

    this.colors?.forEach((color) => {
      color
        ?.validation()
        .toValidation()
        .forEach((validation, index) => {
          validates.push(
            new Validation({
              ...validation.toObject(),
              field: `colors[${index}].${validation.field as string}`,
            }),
          );
        });
    });

    this.sizes?.forEach((size) => {
      size
        ?.validation()
        .toValidation()
        .forEach((validation, index) => {
          validates.push(
            new Validation({
              ...validation.toObject(),
              field: `sizes[${index}].${validation.field as string}`,
            }),
          );
        });
    });

    return new ValidationResult(validates);
  }

  toObject(): ClothesData {
    return {
      ...(typeof this.id === "string" ? { id: this.id } : {}),
      collection: this.collection,
      name: this.name,
      likes: this.likes,
      ...(this.price ? this.price.toObject() : {}),
      ...(Array.isArray(this.colors) ? this.colors.map((color) => color.toObject()) : {}),
      ...(Array.isArray(this.sizes) ? this.sizes.map((size) => size.toObject()) : {}),
      sizeLegendId: this.sizeLegendId,
    };
  }

  toJSON(): ClothesData {
    return this.toObject();
  }

  toJS(): ClothesData {
    return this.toObject();
  }
}
