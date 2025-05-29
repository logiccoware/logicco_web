"use client";

import { DateField } from "@/features/transactions/components/Forms/DateField";
import { AmountField } from "@/features/transactions/components/Forms/AmountField";
import { TypeSelectField } from "@/features/transactions/components/Forms/TypeSelectField";
import { PayeeSelectField } from "@/features/transactions/components/Forms/PayeeSelectField";
import { Suspense, use, useActionState, useEffect } from "react";
import { Alert, Group, Input, Stack } from "@mantine/core";
import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import { TGetPayeesList } from "@/features/payees/schema";
import { CategorySelectField } from "@/features/transactions/components/Forms/CategorySelectField";
import { TGetCategoriesTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { NoteField } from "@/features/transactions/components/Forms/NoteField";
import { SaveButton } from "@/features/transactions/components/Forms/SaveButton";
import { FORM_ACTION_INIT_STATE } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { TGetTransaction } from "@/features/transactions/api/server/fetch/getTransaction";
import { useCategorySelectTreeView } from "@/features/categories/hooks/useCategorySelectTreeView";
import { TransactionDeleteTrigger } from "../TransactionDeleteTrigger";
import { IFormActionState } from "@/lib/types";

interface IProps {
  accountDefaultSelectedCookie: Promise<TAccountDefaultSelectedCookie | null>;
  payeesData: Promise<TGetPayeesList>;
  categoriesData: Promise<TGetCategoriesTreeView>;
  transaction?: TGetTransaction;
  transactionFormAction: (
    prevState: unknown,
    formData: FormData
  ) => Promise<IFormActionState>;
}

export function TransactionPageAction({
  accountDefaultSelectedCookie,
  payeesData,
  categoriesData,
  transaction,
  transactionFormAction,
}: IProps) {
  const [state, formAction, pending] = useActionState(
    transactionFormAction,
    FORM_ACTION_INIT_STATE
  );

  const defaultSelectedCategory = transaction?.category
    ? {
        name: transaction.category.name,
        id: transaction.category.id,
        parent: transaction.category.parent
          ? transaction.category.parent
          : undefined,
      }
    : undefined;

  const accountDefaultCookie = use(accountDefaultSelectedCookie);

  const errors = state?.error?.errors || null;

  const t = useTranslations("Transactions");
  const { showErrorSnackbar } = useSnackbar();

  const accountId = transaction?.account?.id || accountDefaultCookie?.id;

  const { selectCategory, selectedCategory, unSelectCategory } =
    useCategorySelectTreeView({
      defaultSelectedCategory,
    });

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }
  }, [state.success, state.error?.errors.unknown]);

  if (!accountDefaultCookie) {
    return (
      <Alert color="red">
        {t("form.fields.account.noDefaultAccountMessage")}
      </Alert>
    );
  }

  return (
    <form action={formAction}>
      <Stack>
        <Suspense fallback={null}>
          <Input type="hidden" name="accountId" defaultValue={accountId} />
        </Suspense>
        <Input type="hidden" name="transactionId" value={transaction?.id} />
        <DateField
          date={transaction?.date ? new Date(transaction.date) : undefined}
          error={errors?.date}
        />
        <AmountField amount={transaction?.amount} error={errors?.amount} />
        <Suspense fallback={<div>Loading payees...</div>}>
          <PayeeSelectField
            defaultValue={transaction?.payee?.id}
            error={errors?.payeeId}
            data={payeesData}
          />
        </Suspense>
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategorySelectField
            error={errors?.categoryId}
            data={categoriesData}
            selectCategory={selectCategory}
            unSelectCategory={unSelectCategory}
            selectedCategory={selectedCategory}
          />
        </Suspense>
        <TypeSelectField type={transaction?.type} error={errors?.type} />
        <NoteField note={transaction?.note} error={errors?.note} />
        <Group justify="flex-end">
          {transaction ? (
            <TransactionDeleteTrigger transactionId={transaction.id} />
          ) : null}
          <SaveButton disabled={pending} />
        </Group>
      </Stack>
    </form>
  );
}
