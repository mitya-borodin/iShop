import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { propertiesEnum } from "../../../enums/propertiesEnum";

export interface StringPropertyData {
  [index: string]: any;
  type: propertiesEnum.string;
  name?: string;
  group?: string;
  value?: string;
}

const stringFields: string[] = ["name", "group", "value"];
export class StringProperty implements ValueObject {
  [index: string]: any;
  type: propertiesEnum.string;
  name?: string;
  group?: string;
  value?: string;

  constructor(data: Partial<StringPropertyData>) {
    this.type = propertiesEnum.string;

    for (const field of stringFields) {
      if (typeof data[field] === "string") {
        this[field] = data[field];
      }
    }
  }

  public isInsert(): this is Required<StringPropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
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

    return new ValidationResult(validates);
  }
  toObject(): StringPropertyData {
    return {
      type: this.type,
      name: this.name,
      value: this.value,
    };
  }
  toJSON(): StringPropertyData {
    return this.toObject();
  }
  toJS(): StringPropertyData {
    return this.toObject();
  }
}
