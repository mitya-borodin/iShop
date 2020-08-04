import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface ChangeLoginData {
  readonly login?: string;
}

const fields: string[] = ["login"];

export class ChangeLogin implements ValueObject {
  readonly login?: string;

  // The check in the constructor ensures that the correct noSecureFields will be written into the object
  constructor(data: Partial<ChangeLoginData>) {
    if (data) {
      for (const field of fields) {
        if (isString(data[field])) {
          this[field] = data[field];
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }

  isInsert(): this is Required<ChangeLoginData> {
    for (const field of fields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be String`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!isString(this.login)) {
      validates.push(
        new Validation({
          field: "login",
          message: `Login should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    return new ValidationResult(validates);
  }
  protected eject(): ChangeLoginData {
    return {
      login: this.login,
    };
  }

  toObject(): ChangeLoginData {
    return {
      login: this.login,
    };
  }
  toJSON(): ChangeLoginData {
    return this.toObject();
  }
  toJS(): ChangeLoginData {
    return this.toObject();
  }
}
