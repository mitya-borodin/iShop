import { ValueObjectFormStore } from "@rtcts/browser";
import type { SignUpData } from "@rtcts/ishop-shared";
import { SignUp, userGroupEnum } from "@rtcts/ishop-shared";
import type { ValidationResult } from "@rtcts/isomorphic";
import { browserHistory } from "../../shared/browserHistory";
import type { UserRepository } from "./UserRepository";

export class SignUpFormStore extends ValueObjectFormStore<SignUp, SignUpData> {
  protected readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super(SignUp);

    this.repository = repository;
  }

  get externalValidationResult(): ValidationResult {
    return this.repository.validationResult;
  }

  protected async submitForm(submit: SignUp): Promise<void> {
    if (submit.isInsert()) {
      await this.repository.signUp({ ...submit.toObject(), group: userGroupEnum.client });

      if (this.validationResult.hasError) {
        this.showValidation();
        return;
      }

      browserHistory.replace("/");
      this.hideValidation();
    }
  }
}
