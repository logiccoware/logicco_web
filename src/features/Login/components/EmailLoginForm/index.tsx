"use client";

import { FormField } from "@/components/Form/FormField";
import { FormFieldError } from "@/components/Form/FormFieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stringResources } from "@/stringResources";
import { useEmailLoginForm } from "@/features/Login/hooks/useEmailLoginForm";

export function EmailLoginForm() {
  const { register, errors, handleSubmit, onSubmitForm, isLoading } =
    useEmailLoginForm();
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormField label="Display name" name="displayName" className="my-2">
        <Input {...register("email")} type="email" placeholder="Your email" />
        <FormFieldError
          className="my-2"
          hasIcon
          message={errors.email?.message}
        />
      </FormField>
      <FormField label="Password" name="password" className="my-2">
        <Input
          {...register("password")}
          type="password"
          placeholder="Your password"
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
          {stringResources.loginPage.loginButtonText}
        </Button>
      </div>
    </form>
  );
}
