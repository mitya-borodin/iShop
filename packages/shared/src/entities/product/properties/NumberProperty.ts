import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { propertiesEnum } from "../../../enums/propertiesEnum";

export interface NumberPropertyData {
  [index: string]: any;
  type: propertiesEnum.number;
  name?: string;
  group?: string;
  value?: number;
}

const stringFields: string[] = ["name", "group"];
const numberFields: string[] = ["value"];
export class NumberProperty implements ValueObject {
  [index: string]: any;
  type: propertiesEnum.number;
  name?: string;
  group?: string;
  value?: number;

  constructor(data: Partial<NumberPropertyData>) {
    this.type = propertiesEnum.number;

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
  }

  public isInsert(): this is Required<NumberPropertyData> {
    for (const field of stringFields) {
      if (typeof this[field] !== "string") {
        throw new Error(`${this.constructor.name}.${field} should be a string`);
      }
    }

    for (const field of numberFields) {
      if (typeof this[field] !== "number") {
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

    for (const fieldName of numberFields) {
      if (typeof this[fieldName] !== "number" || Number.isNaN(this[fieldName])) {
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
  toObject(): NumberPropertyData {
    return {
      type: this.type,
      name: this.name,
      group: this.group,
      value: this.value,
    };
  }
  toJSON(): NumberPropertyData {
    return this.toObject();
  }
  toJS(): NumberPropertyData {
    return this.toObject();
  }
}
