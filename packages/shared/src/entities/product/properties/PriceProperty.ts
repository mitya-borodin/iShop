import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { Price, PriceData } from "../Price";

export interface PricePropertyData {
  [index: string]: any;
  type: "price";
  name?: string;
  group?: string;
  value?: PriceData;
}

const stringFields: string[] = ["name", "group"];

export class PriceProperty implements ValueObject {
  [index: string]: any;
  type: "price";
  name?: string;
  group?: string;
  value?: Price;

  constructor(data: Partial<PricePropertyData>) {
    this.type = "price";

    for (const field of stringFields) {
      if (typeof data[field] === "string") {
        this[field] = data[field];
      }
    }

    if (typeof data.value === "object") {
      this.value = new Price(data.value);
    }
  }

  public isInsert(): this is Required<PricePropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
    }

    if (!(this.value instanceof Price)) {
      throw new Error(`${this.constructor.name}.value should be Price`);
    }

    return true;
  }
  validation(): ValidationResult {
    const validates: Validation[] = [];

    for (const fieldName of stringFields) {
      if (typeof this[fieldName] !== "string" || !this[fieldName]) {
        validates.push(
          new Validation({
            field: fieldName,
            type: logTypeEnum.error,
            message: `${fieldName} should be typed`,
          }),
        );
      }
    }

    return new ValidationResult([...validates, ...(this.value?.validation().toValidation() || [])]);
  }
  toObject(): PricePropertyData {
    return {
      type: this.type,
      name: this.name,
      value: this.value?.toObject(),
    };
  }
  toJSON(): PricePropertyData {
    return this.toObject();
  }
  toJS(): PricePropertyData {
    return this.toObject();
  }
}
