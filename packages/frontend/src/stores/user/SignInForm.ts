import { ValueObjectFormStore } from "@rtcts/browser";
import { SignIn, SignInData } from "@rtcts/ishop-shared";
import { UserRepository } from "./UserRepository";
import { browserHistory } from "../../shared/browserHistory";

export class SignInFormStore extends ValueObjectFormStore<SignIn, SignInData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(SignIn);

    this.repository = repository;
  }

  protected async submitForm(submit: SignIn): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signIn(submit.toObject());

      browserHistory.replace("/");
    }
  }
}
