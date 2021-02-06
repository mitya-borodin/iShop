import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";

export interface ColorData {
  [index: string]: any;
  name?: string;
  value?: string;
  images?: string;
  productId?: string;
}

const stringFields: string[] = ["name", "value", "images", "productId"];

export class Color implements ValueObject {
  [index: string]: any;
  name?: string;
  value?: string;
  images?: string;
  productId?: string;

  constructor(data: Partial<ColorData>) {
    if (data) {
      for (const fieldName of stringFields) {
        if (typeof data[fieldName] === "string") {
          this[fieldName] = data[fieldName];
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }

  isInsert(): this is Required<ColorData> {
    for (const fieldName of stringFields) {
      if (typeof this[fieldName] !== "string") {
        throw new Error(`${this.constructor.name}.${fieldName} should be string for insert`);
      }
    }

    return true;
  }

  validation(): ValidationResult {
    const validates: Validation[] = [];

    for (const fieldName of stringFields) {
      if (!this[fieldName]) {
        validates.push(
          new Validation({
            field: fieldName,
            message: `${fieldName} should be typed`,
            type: logTypeEnum.error,
          }),
        );
      }
    }

    return new ValidationResult(validates);
  }

  toObject(): ColorData {
    return {
      name: this.name,
      value: this.value,
      images: this.images,
      productId: this.productId,
    };
  }

  toJSON(): ColorData {
    return this.toObject();
  }
  toJS(): ColorData {
    return this.toObject();
  }
}
