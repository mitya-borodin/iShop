import { ValueObjectFormStore } from "@rtcts/browser";
import { ChangeLogin } from "@rtcts/ishop-shared";
import type { ChangeLoginData } from "@rtcts/ishop-shared";
import { ValidationResult, logTypeEnum } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { UserRepository } from "./UserRepository";
import { browserHistory } from "../../shared/browserHistory";
import { getParams } from "../routeInfo";

export class ChangeLoginFormStore extends ValueObjectFormStore<ChangeLogin, ChangeLoginData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(ChangeLogin);

    this.repository = repository;
  }

  @computed({ name: "ChangeLoginFormStore.externalValidationResult" })
  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async changeForm(
    form: ChangeLogin,
    change: ChangeLoginData & { inputFiles?: File[] },
  ): Promise<ChangeLogin> {
    const changedForm = await super.changeForm(form, change);

    if (this.externalValidationResult.hasError) {
      this.repository.validationResult = new ValidationResult(
        this.repository.validationResult
          .toValidation()
          .filter(({ type }) => type !== logTypeEnum.error),
      );
    }

    return changedForm;
  }

  protected async submitForm(submit: ChangeLogin): Promise<void> {
    const { id } = getParams();

    if (typeof id !== "string") {
      throw new Error("User id should be defined");
    }

    if (submit.isInsert()) {
      await this.repository.updateLogin({ id, ...submit.toObject() });
    }

    if (!this.isValid) {
      this.showValidation();
    }

    if (this.isValid) {
      browserHistory.back();
    }
  }
}
