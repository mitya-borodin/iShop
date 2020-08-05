import { ValueObjectFormStore } from "@rtcts/browser";
import { SignUp, SignUpData, userGroupEnum } from "@rtcts/ishop-shared";
import { UserRepository } from "./UserRepository";
import { browserHistory } from "../../shared/browserHistory";

export class SignUpFormStore extends ValueObjectFormStore<SignUp, SignUpData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(SignUp);

    this.repository = repository;
  }

  protected async submitForm(submit: SignUp): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signUp({ ...submit.toObject(), group: userGroupEnum.client });

      browserHistory.replace("/");
    }
  }
}
