import { TLocale } from "@/lib/locale/types";
import { LOCALES } from "@/lib/locale/constants";

export class LocaleService {
  constructor() {}

  getDefaultLocale(): TLocale {
    return "en";
  }

  getLocales() {
    return LOCALES;
  }
}
