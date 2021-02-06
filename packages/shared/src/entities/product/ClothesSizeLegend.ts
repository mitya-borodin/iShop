import { Entity, EntityId, logTypeEnum, Validation, ValidationResult } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";
import { SizeLegendItem } from "./SizeLegendItem";

export interface ClothesSizeLegendData {
  [index: string]: any;
  readonly id?: string;

  readonly title?: string;
  readonly description?: string;

  readonly shoulders?: SizeLegendItem;
  readonly chestCircumference?: SizeLegendItem;
  readonly waistGirth?: SizeLegendItem;
  readonly hipGirth?: SizeLegendItem;
  readonly armLength?: SizeLegendItem;
  readonly innerSeamLength?: SizeLegendItem;
  readonly outerSeamLength?: SizeLegendItem;
}

const sizeLegendItemFields: string[] = [
  "shoulders",
  "chestCircumference",
  "waistGirth",
  "hipGirth",
  "armLength",
  "innerSeamLength",
  "outerSeamLength",
];
const stringFields = ["title", "description"];

export class ClothesSizeLegend implements Entity {
  [index: string]: any;
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;

  readonly shoulders?: SizeLegendItem;
  readonly chestCircumference?: SizeLegendItem;
  readonly waistGirth?: SizeLegendItem;
  readonly hipGirth?: SizeLegendItem;
  readonly armLength?: SizeLegendItem;
  readonly innerSeamLength?: SizeLegendItem;
  readonly outerSeamLength?: SizeLegendItem;

  constructor(data: Partial<EntityId> & Partial<ClothesSizeLegendData>) {
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
  isEntity(): this is { id: string } {
    this.isInsert();

    if (!isString(this.id)) {
      throw new Error(`${this.constructor.name}.id should be string`);
    }

    return true;
  }
  hasId(): this is { id: string } {
    return isString(this.id);
  }

  public isInsert(): this is Required<ClothesSizeLegendData> {
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

  toObject(): ClothesSizeLegendData {
    return {
      ...(typeof this.id === "string" ? { id: this.id } : {}),
      title: this.title,
      description: this.description,
      shoulders: this.shoulders,
      chestCircumference: this.chestCircumference,
      waistGirth: this.waistGirth,
      hipGirth: this.hipGirth,
      armLength: this.armLength,
      innerSeamLength: this.innerSeamLength,
      outerSeamLength: this.outerSeamLength,
    };
  }

  toJSON(): ClothesSizeLegendData {
    return this.toObject();
  }

  toJS(): ClothesSizeLegendData {
    return this.toObject();
  }
}
