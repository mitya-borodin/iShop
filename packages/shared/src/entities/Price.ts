import { logTypeEnum, Validation, ValidationResult, ValueObject } from "@rtcts/isomorphic";
import { currencyEnum } from "../enums/currencyEnum";
import { priceEnum } from "../enums/priceEnum";
import { currencySet } from "../sets/currencySet";
import { priceSet } from "../sets/priceSet";

const numberFields: string[] = ["amount", "discount"];

export interface PriceData {
  readonly type?: priceEnum.wholesale | priceEnum.retail | priceEnum.special;
  readonly currency?: currencyEnum.RUB | currencyEnum.USD | currencyEnum.EUR;
  readonly amount?: number;
  readonly discount?: number;
}

export class Price implements ValueObject {
  readonly type?: priceEnum.wholesale | priceEnum.retail | priceEnum.special;
  readonly currency?: currencyEnum.RUB | currencyEnum.USD | currencyEnum.EUR;
  readonly amount?: number;
  readonly discount?: number;

  constructor(data: Partial<PriceData>) {
    if (data) {
      if (priceSet.has(data.type || "")) {
        this.type = data.type;
      }

      if (currencySet.has(data.currency || "")) {
        this.currency = data.currency;
      }

      for (const fieldName of numberFields) {
        if (typeof data[fieldName] === "number") {
          this[fieldName] = data[fieldName];
        }
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }

  isInsert(): this is Required<PriceData> {
    if (!priceSet.has(this.type || "")) {
      throw new Error(
        `${this.constructor.name}.type should be ${Array.from(priceSet).join(" | ")}`,
      );
    }

    if (!currencySet.has(this.currency || "")) {
      throw new Error(
        `${this.constructor.name}.currency should be ${Array.from(currencySet).join(" | ")}`,
      );
    }

    for (const fieldName of numberFields) {
      if (typeof this[fieldName] !== "number") {
        throw new Error(`${this.constructor.name}.${fieldName} should be number for insert`);
      }
    }

    return true;
  }

  validation(): ValidationResult {
    const validates: Validation[] = [];

    if (!priceSet.has(this.type || "")) {
      validates.push(
        new Validation({
          field: "type",
          message: `Type should be selected`,
          type: logTypeEnum.error,
        }),
      );
    }

    if (!this.currency) {
      validates.push(
        new Validation({
          field: "currency",
          message: `Currency should be selected`,
          type: logTypeEnum.error,
        }),
      );
    }

    for (const fieldName of numberFields) {
      if (!this[fieldName]) {
        validates.push(
          new Validation({
            field: fieldName,
            message: `${fieldName} should be number`,
            type: logTypeEnum.error,
          }),
        );
      }
    }

    return new ValidationResult(validates);
  }

  toObject(): PriceData {
    return {
      type: this.type,
      currency: this.currency,
      amount: this.amount,
      discount: this.discount,
    };
  }

  toJSON(): PriceData {
    return this.toObject();
  }
  toJS(): PriceData {
    return this.toObject();
  }
}
