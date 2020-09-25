import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";

const stringFields: string[] = ["name", "collection"];

export interface SizeLegendItemData {
  title?: string;
  description?: string;
}

export class SizeLegendItem implements ValueObject {
  title?: string;
  description?: string;

  constructor(data: Partial<SizeLegendItemData>) {
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

  isInsert(): this is Required<SizeLegendItemData> {
    for (const fieldName of stringFields) {
      if (typeof this[fieldName] !== "string") {
        throw new Error(`${this.constructor.name}.${fieldName} should be string for insert`);
      }
    }

    return true;
  }

  validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!this.title) {
      validates.push(
        new Validation({
          field: "title",
          message: `Title should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }
    if (!this.description) {
      validates.push(
        new Validation({
          field: "description",
          message: `Description should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    return new ValidationResult(validates);
  }

  toObject(): SizeLegendItemData {
    return {
      title: this.title,
      description: this.description,
    };
  }

  toJSON(): SizeLegendItemData {
    return this.toObject();
  }
  toJS(): SizeLegendItemData {
    return this.toObject();
  }
}
