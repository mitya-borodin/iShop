import {
  Entity,
  EntityId,
  logTypeEnum,
  Validation,
  ValidationResult,
} from "@rtcts/isomorphic/dist";
import { isString } from "@rtcts/utils/dist";

// * Для сущности Customer необходимо сделать сущность CustomerCache.

export interface ProductData {
  readonly id?: string;
  readonly name?: string;
}

const stringFields: string[] = ["name"];

export class Product implements Entity {
  readonly id?: string;
  readonly name?: string;

  constructor(data: Partial<EntityId> & Partial<ProductData>) {
    if (data) {
      for (const field of stringFields) {
        if (isString(data[field])) {
          this[field] = data[field];
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }
  isEntity(): this is { id: string } {
    this.isInsert();

    if (!isString(this.id)) {
      throw new Error(`${this.constructor.name}.is should be string`);
    }

    return true;
  }
  hasId(): this is { id: string } {
    return isString(this.id);
  }

  public isInsert(): this is Required<ProductData> {
    for (const field of stringFields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be string`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!isString(this.name)) {
      validates.push(
        new Validation({
          field: "name",
          message: `Name should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    return new ValidationResult(validates);
  }

  toObject(): ProductData {
    return {
      name: this.name,
    };
  }

  toJSON(): ProductData {
    return this.toObject();
  }

  toJS(): ProductData {
    return this.toObject();
  }
}
