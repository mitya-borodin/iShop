import { ValueObjectFormStore } from "@rtcts/browser";
import { PasswordRecovery } from "@rtcts/ishop-shared";
import type { PasswordRecoveryData } from "@rtcts/ishop-shared";
import { ValidationResult } from "@rtcts/isomorphic";
import { computed } from "mobx";
import { browserHistory } from "../../shared/browserHistory";
import { UserRepository } from "./UserRepository";

export class PasswordRecoveryFormStore extends ValueObjectFormStore<
  PasswordRecovery,
  PasswordRecoveryData
> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(PasswordRecovery);

    this.repository = repository;
  }

  @computed({ name: "PasswordRecoveryFormStore.externalValidationResult" })
  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  protected async submitForm(submit: PasswordRecovery): Promise<void> {
    if (submit.isInsert()) {
      // TODO Передать данные в хранилище которое умеет восстанавливать пароль.
      // await this.repository.signIn(submit.toObject());

      browserHistory.replace("/");
    }
  }
}
