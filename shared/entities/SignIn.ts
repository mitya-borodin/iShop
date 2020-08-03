import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface SignInData {
  readonly login?: string;
  readonly password?: string;
}

const fields: string[] = ["login", "password"];

export class SignIn implements ValueObject {
  readonly login?: string;
  readonly password?: string;

  // The check in the constructor ensures that the correct noSecureFields will be written into the object
  constructor(data: Partial<SignInData>) {
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
  isInsert(): boolean {
    throw new Error("Method not implemented.");
  }

  // The canBeInsert method ensures that all mandatory noSecureFields are filled in and have the correct data type.
  public canBeInsert<SignInData>(): this is Required<SignInData> {
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

    return new ValidationResult(validates);
  }

  toObject(): SignInData {
    return {
      login: this.login,
      password: this.password,
    };
  }
  toJSON() {
    return this.toObject();
  }
  toJS() {
    return this.toObject();
  }
}
