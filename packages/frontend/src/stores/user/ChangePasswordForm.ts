import { ValueObjectFormStore } from "@rtcts/browser";
import { ChangePassword } from "@rtcts/ishop-shared";
import type { ChangePasswordData } from "@rtcts/ishop-shared";
import { ValidationResult } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { UserRepository } from "./UserRepository";

export class ChangePasswordFormStore extends ValueObjectFormStore<
  ChangePassword,
  ChangePasswordData
> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(ChangePassword);

    this.repository = repository;
  }

  @computed({ name: "ChangePasswordFormStore.externalValidationResult" })
  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async submitForm(submit: ChangePassword): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.updatePassword(submit.toObject());
    }
  }
}
