import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { sizeTypeEnum } from "../../enums/sizeTypeEnum";
import { sizeValueSet } from "../../sets/sizeValueSet";
import { SizeValueType } from "../../types/SizeType";
import { SizeLegendItem } from "./SizeLegendItem";

export interface ClothesSizeData {
  readonly legendId?: string;
  readonly title?: string;
  readonly description?: string;
  readonly wearType: sizeTypeEnum.CLOTHES;
  readonly sizeValue?: SizeValueType;
  readonly shoulders?: number;
  readonly chestCircumference?: number;
  readonly waistGirth?: number;
  readonly hipGirth?: number;
  readonly armLength?: number;
  readonly innerSeamLength?: number;
  readonly outerSeamLength?: number;
}

const stringFields: string[] = ["legendId", "title", "description"];
const numberFields = [
  "shoulders",
  "chestCircumference",
  "waistGirth",
  "hipGirth",
  "armLength",
  "innerSeamLength",
  "outerSeamLength",
];

export class ClothesSize implements ValueObject {
  readonly legendId?: string;
  readonly title?: string;
  readonly description?: string;
  readonly wearType: sizeTypeEnum.CLOTHES;
  readonly sizeValue?: SizeValueType;
  readonly shoulders?: number;
  readonly chestCircumference?: number;
  readonly waistGirth?: number;
  readonly hipGirth?: number;
  readonly armLength?: number;
  readonly innerSeamLength?: number;
  readonly outerSeamLength?: number;

  constructor(data: Partial<ClothesSizeData>) {
    if (data) {
      this.wearType = sizeTypeEnum.CLOTHES;

      for (const field of stringFields) {
        if (typeof data[field] === "string") {
          this[field] = data[field];
        }
      }

      if (sizeValueSet.has(data.sizeValue as any)) {
        this.sizeValue = data.sizeValue as SizeValueType;
      }

      for (const field of numberFields) {
        if (typeof data[field] === "number") {
          this[field] = new SizeLegendItem(data[field]);
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }

  public isInsert(): this is Required<ClothesSizeData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be String`);
      }
    }

    if (!sizeValueSet.has(this.sizeValue as any)) {
      throw new Error(
        `${this.constructor.name}.sizeValue should be ${Array.from(sizeValueSet).join(", ")}`,
      );
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

    if (!sizeValueSet.has(this.sizeValue as any)) {
      validates.push(
        new Validation({
          field: "sizeValue",
          type: logTypeEnum.error,
          message: `sizeValue should be selected`,
        }),
      );
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

  toObject(): ClothesSizeData {
    return {
      legendId: this.legendId,
      title: this.title,
      description: this.description,
      wearType: this.wearType,
      sizeValue: this.sizeValue,
      shoulders: this.shoulders,
      chestCircumference: this.chestCircumference,
      waistGirth: this.waistGirth,
      hipGirth: this.hipGirth,
      armLength: this.armLength,
      innerSeamLength: this.innerSeamLength,
      outerSeamLength: this.outerSeamLength,
    };
  }

  toJSON(): ClothesSizeData {
    return this.toObject();
  }

  toJS(): ClothesSizeData {
    return this.toObject();
  }
}
