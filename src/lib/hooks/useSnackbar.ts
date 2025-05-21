import { notifications } from "@mantine/notifications";
import { useTranslations } from "next-intl";

export function useSnackbar() {
  const t = useTranslations("Common");

  function showSuccessSnackbar(message: string) {
    notifications.show({
      title: t("snackbars.success.title"),
      message,
    });
  }

  function showErrorSnackbar() {
    notifications.show({
      title: t("snackbars.error.title"),
      message: t("snackbars.error.message"),
      color: "red",
    });
  }

  return {
    showSuccessSnackbar,
    showErrorSnackbar,
  };
}
