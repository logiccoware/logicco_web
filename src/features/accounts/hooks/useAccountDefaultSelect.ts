import { getCookie, setCookie } from "cookies-next";
import { TAccountBase, AccountBaseSchema } from "@/features/accounts/schema";
import { ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME } from "@/features/accounts/constants";

export function useAccountDefaultSelect() {
  const defaultSelectedAccount = getDefaultSelectedAccount();

  function getDefaultSelectedAccount(): TAccountBase | null {
    const defaultSelectedAccount = getCookie(
      ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME
    );
    if (defaultSelectedAccount) {
      const parsedAccount = AccountBaseSchema.safeParse(
        JSON.parse(defaultSelectedAccount.toString())
      );

      if (parsedAccount.success) {
        return parsedAccount.data;
      }
    }
    return null;
  }

  function setDefaultSelectedAccount(account: TAccountBase | null) {
    if (!account) {
      return;
    }
    const accountString = JSON.stringify(account);
    setCookie(
      ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME,
      accountString,
      { maxAge: 60 * 60 * 24 * 30 } // 30 days
    );
  }

  return {
    defaultSelectedAccount,
    getDefaultSelectedAccount,
    setDefaultSelectedAccount,
  };
}
