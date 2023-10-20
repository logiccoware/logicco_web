"use client";

import { FormField } from "@/components/Form/FormField";
import { FormFieldError } from "@/components/Form/FormFieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupInviteFormProps } from "@/features/SignupInvite/components/SignupInviteForm/types";
import { useSignupInviteForm } from "@/features/SignupInvite/hooks/useSignupInviteForm";
import { stringResources } from "@/stringResources";

export function SignupInviteForm({ inviteData }: SignupInviteFormProps) {
  const { register, errors, handleSubmit, onSubmitForm, isLoading } =
    useSignupInviteForm({ inviteData });
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormField label="Display name" name="displayName" className="my-2">
        <Input
          {...register("displayName")}
          type="text"
          placeholder="Your name"
        />
        <FormFieldError
          className="my-2"
          hasIcon
          message={errors.displayName?.message}
        />
      </FormField>
      <FormField label="Email" name="email" className="my-2">
        <Input disabled type="email" value={inviteData.email} />
      </FormField>
      <FormField label="Password" name="password" className="my-2">
        <Input
          {...register("password")}
          type="password"
          placeholder="Strong password"
          autoComplete="on"
        />
        <FormFieldError
          className="my-2"
          hasIcon
          message={errors.password?.message}
        />
      </FormField>
      <div className="my-4">
        <Button disabled={isLoading} type="submit" className="w-full">
          {stringResources.signupInvitePage.form.submitButtonText}
        </Button>
      </div>
    </form>
  );
}
