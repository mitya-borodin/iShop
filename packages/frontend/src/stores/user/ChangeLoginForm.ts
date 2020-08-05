import { ValueObjectFormStore } from "@rtcts/browser";
import { ChangeLogin, ChangeLoginData } from "@rtcts/ishop-shared";
import { UserRepository } from "./UserRepository";

export class ChangeLoginFormStore extends ValueObjectFormStore<ChangeLogin, ChangeLoginData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(ChangeLogin);

    this.repository = repository;
  }

  protected async submitForm(submit: ChangeLogin): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.updateLogin(submit.toObject());
    }
  }
}
