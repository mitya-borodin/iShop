import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { propertiesEnum } from "../../../enums/propertiesEnum";
import { ShoesSize, ShoesSizeData } from "../ShoesSize";

export interface ShoesSizePropertyData {
  type: propertiesEnum.shoesSize;
  name?: string;
  group?: string;
  value?: ShoesSizeData[];
}

const stringFields: string[] = ["name", "group"];

export class ShoesSizeProperty implements ValueObject {
  type: propertiesEnum.shoesSize;
  name?: string;
  group?: string;
  value?: ShoesSize[];

  constructor(data: Partial<ShoesSizePropertyData>) {
    this.type = propertiesEnum.shoesSize;

    for (const field of stringFields) {
      if (typeof data[field] === "string") {
        this[field] = data[field];
      }
    }

    if (Array.isArray(data.value)) {
      this.value = data.value.map((shoesSizeData) => new ShoesSize(shoesSizeData));
    }
  }

  public isInsert(): this is Required<ShoesSizePropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
    }

    if (!Array.isArray(this.value)) {
      throw new Error(`${this.constructor.name}.value should be Array<ShoesSize>`);
    }

    this.value.forEach((clothesSize, index) => {
      if (!(clothesSize instanceof ShoesSize)) {
        throw new Error(
          `${this.constructor.name}.value[${index}] should be instance of ShoesSizeData`,
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
  toObject(): ShoesSizePropertyData {
    return {
      type: this.type,
      name: this.name,
      value: this.value?.map((color) => color.toObject()),
    };
  }
  toJSON(): ShoesSizePropertyData {
    return this.toObject();
  }
  toJS(): ShoesSizePropertyData {
    return this.toObject();
  }
}
