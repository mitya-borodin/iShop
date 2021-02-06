import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { propertiesEnum } from "../../../enums/propertiesEnum";
import { ClothesSize, ClothesSizeData } from "../ClothesSize";

export interface ClothesSizePropertyData {
  [index: string]: any;
  type: propertiesEnum.clothesSize;
  name?: string;
  group?: string;
  value?: ClothesSizeData[];
}

const stringFields: string[] = ["name", "group"];

export class ClothesSizeProperty implements ValueObject {
  [index: string]: any;
  type: propertiesEnum.clothesSize;
  name?: string;
  group?: string;
  value?: ClothesSize[];

  constructor(data: Partial<ClothesSizePropertyData>) {
    this.type = propertiesEnum.clothesSize;

    for (const field of stringFields) {
      if (typeof data[field] === "string") {
        this[field] = data[field];
      }
    }

    if (Array.isArray(data.value)) {
      this.value = data.value.map((clothesSizeData) => new ClothesSize(clothesSizeData));
    }
  }

  public isInsert(): this is Required<ClothesSizePropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
    }

    if (!Array.isArray(this.value)) {
      throw new Error(`${this.constructor.name}.value should be Array<ClothesSize>`);
    }

    this.value.forEach((clothesSize, index) => {
      if (!(clothesSize instanceof ClothesSize)) {
        throw new Error(
          `${this.constructor.name}.value[${index}] should be instance of ClothesSize`,
        );
      }
    });

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

    this.value?.forEach((color) => {
      color
        .validation()
        .toValidation()
        .forEach((validation) => {
          validates.push(validation);
        });
    });

    return new ValidationResult(validates);
  }
  toObject(): ClothesSizePropertyData {
    return {
      type: this.type,
      name: this.name,
      value: this.value?.map((color) => color.toObject()),
    };
  }
  toJSON(): ClothesSizePropertyData {
    return this.toObject();
  }
  toJS(): ClothesSizePropertyData {
    return this.toObject();
  }
}
