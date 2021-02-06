import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { propertiesEnum } from "../../../enums/propertiesEnum";
import { Color, ColorData } from "../Color";

export interface ColorPropertyData {
  [index: string]: any;
  type: propertiesEnum.color;
  name?: string;
  group?: string;
  value?: ColorData[];
}

const stringFields: string[] = ["name", "group"];

export class ColorProperty implements ValueObject {
  [index: string]: any;
  type: propertiesEnum.color;
  name?: string;
  group?: string;
  value?: Color[];

  constructor(data: Partial<ColorPropertyData>) {
    this.type = propertiesEnum.color;

    for (const field of stringFields) {
      if (typeof data[field] === "string") {
        this[field] = data[field];
      }
    }

    if (Array.isArray(data.value)) {
      this.value = data.value.map((colorData) => new Color(colorData));
    }
  }

  public isInsert(): this is Required<ColorPropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
    }

    if (!Array.isArray(this.value)) {
      throw new Error(`${this.constructor.name}.value should be Array<Color>`);
    }

    this.value.forEach((color, index) => {
      if (!(color instanceof Color)) {
        throw new Error(`${this.constructor.name}.value[${index}] should be instance of Color`);
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
  toObject(): ColorPropertyData {
    return {
      type: this.type,
      name: this.name,
      value: this.value?.map((color) => color.toObject()),
    };
  }
  toJSON(): ColorPropertyData {
    return this.toObject();
  }
  toJS(): ColorPropertyData {
    return this.toObject();
  }
}
