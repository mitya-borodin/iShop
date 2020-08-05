import { ValueObjectFormStore } from "@rtcts/browser";
import { ChangePassword, ChangePasswordData } from "@rtcts/ishop-shared";
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

  protected async submitForm(submit: ChangePassword): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.updatePassword(submit.toObject());
    }
  }
}
