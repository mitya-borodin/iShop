import { ValueObjectFormStore } from "@rtcts/browser";
import { ChangeLogin } from "@rtcts/ishop-shared";
import type { ChangeLoginData } from "@rtcts/ishop-shared";
import { ValidationResult } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { UserRepository } from "./UserRepository";

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

  protected async submitForm(submit: ChangeLogin): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.updateLogin(submit.toObject());
    }
  }
}
