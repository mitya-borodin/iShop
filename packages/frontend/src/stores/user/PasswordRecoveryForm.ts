import { ValueObjectFormStore } from "@rtcts/browser";
import { PasswordRecovery, PasswordRecoveryData } from "@rtcts/ishop-shared";
import { UserRepository } from "./UserRepository";
import { browserHistory } from "../../shared/browserHistory";

export class PasswordRecoveryFormStore extends ValueObjectFormStore<
  PasswordRecovery,
  PasswordRecoveryData
> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(PasswordRecovery);

    this.repository = repository;
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
