/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface ChangePasswordData {
  [index: string]: any;
  readonly password?: string;
  readonly passwordConfirm?: string;
}

const fields: string[] = ["password", "passwordConfirm"];

export class ChangePassword implements ValueObject {
  [index: string]: any;
  readonly password?: string;
  readonly passwordConfirm?: string;

  // The check in the constructor ensures that the correct noSecureFields will be written into the object
  constructor(data: Partial<ChangePasswordData>) {
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
  isInsert(): this is Required<ChangePasswordData> {
    for (const field of fields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be string`);
      }
    }

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!isString(this.password)) {
      validates.push(
        new Validation({
          field: "password",
          message: `Password should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    if (!isString(this.passwordConfirm)) {
      validates.push(
        new Validation({
          field: "passwordConfirm",
          message: `Password confirm should be typed`,
          type: logTypeEnum.error,
        }),
      );
    }

    if (this.password !== this.passwordConfirm) {
      validates.push(
        new Validation({
          field: "password",
          message: `Password and password confirmation do not match`,
          type: logTypeEnum.error,
        }),
      );

      validates.push(
        new Validation({
          field: "passwordConfirm",
          message: `Password and password confirmation do not match`,
          type: logTypeEnum.error,
        }),
      );
    }

    return new ValidationResult(validates);
  }

  toObject(): ChangePasswordData {
    return {
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
  }

  toJSON(): ChangePasswordData {
    return this.toObject();
  }

  toJS(): ChangePasswordData {
    return this.toObject();
  }
}
