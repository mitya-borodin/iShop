import { ValueObjectFormStore } from "@rtcts/browser";
import { AddUser, AddUserData } from "@rtcts/ishop-shared";
import { ValidationResult } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { UserRepository } from "./UserRepository";

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

  protected async submitForm(submit: AddUser): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signUp(submit.toObject(), true);
    }
  }
}
