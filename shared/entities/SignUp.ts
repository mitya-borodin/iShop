import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface SignUpData {
  readonly login?: string;
  readonly password?: string;
  readonly passwordConfirm?: string;
}

const fields: string[] = ["login", "password", "passwordConfirm"];

export class SignUp implements ValueObject {
  readonly login?: string;
  readonly password?: string;
  readonly passwordConfirm?: string;

  // The check in the constructor ensures that the correct noSecureFields will be written into the object
  constructor(data: Partial<SignUpData>) {
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

  // The canBeInsert method ensures that all mandatory noSecureFields are filled in and have the correct data type.
  public isInsert<SignUpData>(): this is Required<SignUpData> {
    for (const field of fields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be String`);
      }
    }

    return true;
  }

  // The validate method allows you to implement the logic of checking the entered values in the object and to minimize the object describing the result of the check
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

  toObject(): SignUpData {
    return {
      login: this.login,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
  }
  toJSON() {
    return this.toObject();
  }
  toJS() {
    return this.toObject();
  }
}
