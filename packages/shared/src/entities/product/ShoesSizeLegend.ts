import { Entity, EntityId, logTypeEnum, Validation, ValidationResult } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";
import { SizeLegendItem } from "./SizeLegendItem";

export interface ShoesSizeLegendData {
  [index: string]: any;
  readonly id?: string;

  readonly title?: string;
  readonly description?: string;

  readonly insoleLength?: SizeLegendItem;
  readonly insoleWidth?: SizeLegendItem;
}

const stringFields = ["title", "description"];
const sizeLegendItemFields: string[] = ["insoleLength", "insoleWidth"];

export class ShoesSizeLegend implements Entity {
  [index: string]: any;
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;

  readonly insoleLength?: SizeLegendItem;
  readonly insoleWidth?: SizeLegendItem;

  constructor(data: Partial<EntityId> & Partial<ShoesSizeLegendData>) {
    if (data) {
      if (typeof data.id === "string") {
        this.id = data.id;
      }

      for (const field of stringFields) {
        if (typeof data[field] === "string") {
          this[field] = data[field];
        }
      }

      for (const field of sizeLegendItemFields) {
        if (typeof data[field] === "object") {
          this[field] = new SizeLegendItem(data[field]);
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }
  public isEntity(): this is { id: string } {
    this.isInsert();

    if (!isString(this.id)) {
      throw new Error(`${this.constructor.name}.id should be string`);
    }

    return true;
  }
  public hasId(): this is { id: string } {
    return isString(this.id);
  }

  public isInsert(): this is Required<ShoesSizeLegendData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be string`);
      }
    }

    for (const field of sizeLegendItemFields) {
      if (!(this[field] instanceof SizeLegendItem)) {
        throw new Error(`${this.constructor.name}.${field} should be SizeLegendItem`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    for (const field of stringFields) {
      if (!this[field]) {
        validates.push(
          new Validation({
            field,
            message: `${field} should be typed`,
            type: logTypeEnum.error,
          }),
        );
      }
    }

    for (const fieldName of sizeLegendItemFields) {
      if (this[fieldName] instanceof SizeLegendItem) {
        const validationResult = this[fieldName].validation();

        for (const validate of validationResult.toValidation()) {
          validates.push(
            new Validation({
              ...validate.toObject(),
              field: `${fieldName}.${validate.field as string}`,
            }),
          );
        }
      }
    }

    return new ValidationResult(validates);
  }

  toObject(): ShoesSizeLegendData {
    return {
      ...(typeof this.id === "string" ? { id: this.id } : {}),
      title: this.title,
      description: this.description,
      insoleLength: this.insoleLength,
      insoleWidth: this.insoleWidth,
    };
  }

  toJSON(): ShoesSizeLegendData {
    return this.toObject();
  }

  toJS(): ShoesSizeLegendData {
    return this.toObject();
  }
}
