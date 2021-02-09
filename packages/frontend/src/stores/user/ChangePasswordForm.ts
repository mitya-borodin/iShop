import { ValueObjectFormStore } from "@rtcts/browser";
import type { ChangePasswordData } from "@rtcts/ishop-shared";
import { ChangePassword } from "@rtcts/ishop-shared";
import { logTypeEnum, ValidationResult } from "@rtcts/isomorphic";
import { browserHistory } from "../../shared/browserHistory";
import { getParams } from "../routeInfo";
import type { UserRepository } from "./UserRepository";

export class ChangePasswordFormStore extends ValueObjectFormStore<
  ChangePassword,
  ChangePasswordData
> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(ChangePassword);

    this.repository = repository;
  }

  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async changeForm(
    form: ChangePassword,
    change: ChangePasswordData & { inputFiles?: File[] },
  ): Promise<ChangePassword> {
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

  protected async submitForm(submit: ChangePassword): Promise<void> {
    const { id } = getParams();

    if (typeof id !== "string") {
      throw new Error("User id should be defined");
    }

    if (submit.isInsert()) {
      await this.repository.updatePassword({ id, ...submit.toObject() });
    }

    if (!this.isValid) {
      this.showValidation();
    }

    if (this.isValid) {
      browserHistory.back();
    }
  }
}
