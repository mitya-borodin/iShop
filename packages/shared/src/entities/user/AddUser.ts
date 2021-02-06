import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { isString } from "@rtcts/utils";

export interface AddUserData {
  [index: string]: any;
  readonly login?: string;
  readonly group?: string;
  readonly password?: string;
  readonly passwordConfirm?: string;
}

const fields: string[] = ["login", "group", "password", "passwordConfirm"];

export class AddUser implements ValueObject {
  [index: string]: any;
  readonly login?: string;
  readonly group?: string;
  readonly password?: string;
  readonly passwordConfirm?: string;

  constructor(data: Partial<AddUserData>) {
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

  isInsert(): this is Required<AddUserData> {
    for (const field of fields) {
      if (!isString(this[field])) {
        throw new Error(`${this.constructor.name}.${field} should be string`);
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

    if (!isString(this.group)) {
      validates.push(
        new Validation({
          field: "group",
          message: `Group should be selected`,
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

  toObject(): AddUserData {
    return {
      login: this.login,
      group: this.group,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
  }

  toJSON(): AddUserData {
    return this.toObject();
  }

  toJS(): AddUserData {
    return this.toObject();
  }
}
