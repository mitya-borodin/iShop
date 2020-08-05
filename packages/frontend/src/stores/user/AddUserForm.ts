import { ValueObjectFormStore } from "@rtcts/browser";
import { AddUser, AddUserData } from "@rtcts/ishop-shared";
import { UserRepository } from "./UserRepository";

export class AddUserFormStore extends ValueObjectFormStore<AddUser, AddUserData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(AddUser);

    this.repository = repository;
  }

  protected async submitForm(submit: AddUser): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signUp(submit.toObject(), true);
    }
  }
}
