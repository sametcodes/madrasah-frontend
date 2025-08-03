import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import { Label } from "@madrasah/ui/components/label";
import { Checkbox } from "@madrasah/ui/components/checkbox";
import { Button } from "@madrasah/ui/components/button";
import { cn } from "@madrasah/ui/lib/utils";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            headerSubNode={messageHeader !== undefined ? undefined : msg("registerSubtitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields={false}
        >
            <form id="kc-register-form" className="flex flex-col gap-5" action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className="flex flex-col gap-2">
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <div id="kc-form-buttons">
                            <Button
                                size="lg"
                                className={cn("w-full bg-brand-primary text-white hover:bg-brand-primary/90", "g-recaptcha")}
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msg("doRegister")}
                            </Button>
                        </div>
                    ) : (
                        <div id="kc-form-buttons">
                            <Button
                                size="lg"
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 disabled:opacity-50"
                                type="submit"
                            >
                                {msgStr("doRegister")}
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label className="text-gray-600">{msg("termsTitle")}</Label>
                <div id="kc-registration-terms-text" className="text-sm text-gray-600 p-3 border rounded-md bg-gray-50">
                    {msg("termsText")}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <Checkbox
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={areTermsAccepted}
                        onCheckedChange={checked => onAreTermsAcceptedValueChange(!!checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                        className={cn(messagesPerField.existsError("termsAccepted") && "border-error-secondary")}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                        {msg("acceptTerms")}
                    </Label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <span
                        id="input-error-terms-accepted"
                        className="text-error-secondary text-sm"
                        aria-live="polite"
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("termsAccepted"))
                        }}
                    />
                )}
            </div>
        </div>
    );
}
