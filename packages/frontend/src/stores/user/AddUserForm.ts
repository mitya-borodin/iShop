/* eslint-disable @typescript-eslint/require-await */
import { ValueObjectFormStore } from "@rtcts/browser";
import { AddUser } from "@rtcts/ishop-shared";
import type { AddUserData } from "@rtcts/ishop-shared";
import { ValidationResult, logTypeEnum } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { UserRepository } from "./UserRepository";
import { browserHistory } from "../../shared/browserHistory";

export class AddUserFormStore extends ValueObjectFormStore<AddUser, AddUserData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(AddUser);

    this.repository = repository;
  }

  @computed({ name: "AddUserFormStore.externalValidationResult" })
  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async changeForm(
    form: AddUser,
    change: AddUserData & { inputFiles?: File[] },
  ): Promise<AddUser> {
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

  protected async submitForm(submit: AddUser): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signUp(submit.toObject(), true);
    }

    if (!this.isValid) {
      this.showValidation();
    }

    if (this.isValid) {
      browserHistory.back();
    }
  }
}
