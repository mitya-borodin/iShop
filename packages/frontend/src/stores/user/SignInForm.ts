import { ValueObjectFormStore } from "@rtcts/browser";
import type { SignInData } from "@rtcts/ishop-shared";
import { SignIn } from "@rtcts/ishop-shared";
import type { ValidationResult } from "@rtcts/isomorphic";
import { browserHistory } from "../../shared/browserHistory";
import type { UserRepository } from "./UserRepository";

export class SignInFormStore extends ValueObjectFormStore<SignIn, SignInData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(SignIn);

    this.repository = repository;
  }

  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async submitForm(submit: SignIn): Promise<void> {
    const validationResult = submit.validation();

    if (!validationResult.isValid) {
      this.showValidation();
    } else {
      this.hideValidation();
    }

    if (validationResult.isValid && submit.isInsert()) {
      await this.repository.signIn(submit.toObject());
      await this.repository.init();

      if (this.validationResult.hasError) {
        this.showValidation();
        return;
      }

      if (this.repository.isAuthorized) {
        browserHistory.push("/");

        this.hideValidation();
        this.cancel();
      }
    }
  }
}
