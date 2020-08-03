import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface PasswordRecoveryData {
  readonly login?: string;
}

const fields: string[] = ["login"];

export class PasswordRecovery implements ValueObject {
  readonly login?: string;

  constructor(data: Partial<PasswordRecoveryData>) {
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

  isInsert(): this is Required<PasswordRecoveryData> {
    for (const field of fields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be String`);
      }
    }

    return true;
  }

  validation(): ValidationResult {
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

  toObject(): PasswordRecoveryData {
    return {
      login: this.login,
    };
  }

  toJSON() {
    this.toObject();
  }

  toJS() {
    this.toObject();
  }
}
