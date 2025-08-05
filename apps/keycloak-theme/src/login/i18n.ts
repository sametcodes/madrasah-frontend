/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            loginAccountTitle: "Login to your account",
            loginAccountSubtitle:
                "Access your personalized dashboard and manage your learning journey.",
            registerTitle: "Join Online Madrasah",
            registerSubtitle:
                "Accessible Islamic education for everyone, everywhere. Start your journey of learning today."
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
