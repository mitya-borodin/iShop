import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { sizeTypeEnum } from "../enums/sizeTypeEnum";

export interface ShoesSizeData {
  readonly title?: string;
  readonly description?: string;
  readonly wearType: sizeTypeEnum.SHOES;
  readonly sizeValue?: number;
  readonly insoleLength?: number;
  readonly insoleWidth?: number;
}

const stringFields: string[] = ["title", "description"];
const numberFields = ["sizeValue", "insoleLength", "insoleWidth"];

export class ShoesSize implements ValueObject {
  readonly title?: string;
  readonly description?: string;
  readonly wearType: sizeTypeEnum.SHOES;
  readonly sizeValue?: number;
  readonly insoleLength?: number;
  readonly insoleWidth?: number;

  constructor(data: Partial<ShoesSizeData>) {
    if (data) {
      this.wearType = sizeTypeEnum.SHOES;

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
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }

  public isInsert(): this is Required<ShoesSizeData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be String`);
      }
    }

    for (const field of numberFields) {
      if (typeof this[field] !== "number") {
        throw new Error(`${this.constructor.name}.${field} should be Number`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    for (const fieldName of stringFields) {
      if (typeof this[fieldName] !== "string") {
        validates.push(
          new Validation({
            field: fieldName,
            type: logTypeEnum.error,
            message: `${fieldName} should be typed`,
          }),
        );
      }
    }

    for (const fieldName of numberFields) {
      if (typeof this[fieldName] !== "number") {
        validates.push(
          new Validation({
            field: fieldName,
            type: logTypeEnum.error,
            message: `${fieldName} should be typed`,
          }),
        );
      }
    }

    return new ValidationResult(validates);
  }

  toObject(): ShoesSizeData {
    return {
      title: this.title,
      description: this.description,
      wearType: this.wearType,
      sizeValue: this.sizeValue,
      insoleLength: this.insoleLength,
      insoleWidth: this.insoleWidth,
    };
  }

  toJSON(): ShoesSizeData {
    return this.toObject();
  }

  toJS(): ShoesSizeData {
    return this.toObject();
  }
}
