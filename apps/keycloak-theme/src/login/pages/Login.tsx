import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import type { ExtendedPageProps } from "../types/PageProps";

import { Input } from "@madrasah/ui/components/input";
import { Separator } from "@madrasah/ui/components/separator";
import { Label } from "@madrasah/ui/components/label";
import { Checkbox } from "@madrasah/ui/components/checkbox";
import { cn } from "@madrasah/ui/lib/utils";
import { Button } from "@madrasah/ui/components/button";
import { EyeIcon, EyeSlashIcon } from "@madrasah/icons";

export default function Login(
  props: ExtendedPageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const displayRegisterationNodes =
    realm.password && realm.registrationAllowed && !registrationDisabled;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={false}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={msg("loginAccountTitle")}
      headerSubNode={msg("loginAccountSubtitle")}
      displayInfo={displayRegisterationNodes}
      infoNode={
        <div id="kc-registration-container" className="text-center">
          <div id="kc-registration">
            <span className="text-sm text-gray-600">
              {msg("noAccount")}{" "}
              <a
                tabIndex={8}
                href={url.registrationUrl}
                className="text-brand-primary hover:underline font-medium"
              >
                {msg("doRegister")}
              </a>
            </span>
          </div>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password &&
            social?.providers !== undefined &&
            social.providers.length !== 0 && (
              <div
                id="kc-social-providers"
                className={kcClsx("kcFormSocialAccountSectionClass")}
              >
                <Separator
                  label={msgStr("identity-provider-login-label")}
                  className="my-4"
                />
                <ul
                  className={cn(
                    kcClsx(
                      "kcFormSocialAccountListClass",
                      social.providers.length > 3 &&
                        "kcFormSocialAccountListGridClass",
                    ),
                    "flex flex-col gap-2",
                  )}
                >
                  {social.providers.map((...[p, , providers]) => (
                    <li key={p.alias}>
                      <a href={p.loginUrl}>
                        <Button
                          variant="outline"
                          id={`social-${p.alias}`}
                          className={cn(
                            kcClsx(
                              "kcFormSocialAccountListButtonClass",
                              providers.length > 3 &&
                                "kcFormSocialAccountGridItem",
                            ),
                            "w-full",
                          )}
                          type="button"
                          size="sm"
                        >
                          <span
                            className={clsx(
                              kcClsx("kcFormSocialAccountNameClass"),
                              p.iconClasses && "kc-social-icon-text",
                            )}
                            dangerouslySetInnerHTML={{
                              __html: kcSanitize(p.displayName),
                            }}
                          ></span>
                        </Button>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
      }
    >
      {displayRegisterationNodes && (
        <div className="mx-auto flex flex-row gap-2 w-fit bg-[#f5f5f5] border border-[#e5e5e5] rounded-[35px] overflow-hidden font-light text-sm mb-8">
          <a href={url.registrationUrl}>
            <div className={"py-2 rounded-[35px] px-5 "}>Register</div>
          </a>
          <div
            className={"py-2 rounded-[35px] px-6 bg-brand-primary text-white "}
          >
            Login
          </div>
        </div>
      )}

      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true);
                return true;
              }}
              action={url.loginAction}
              method="post"
              className="flex flex-col gap-5"
            >
              {!usernameHidden && (
                <div className="grid w-full max-w-sm items-center gap-2">
                  <Label htmlFor="username" className="text-gray-600">
                    {!realm.loginWithEmailAllowed
                      ? msg("username")
                      : !realm.registrationEmailAsUsername
                        ? msg("usernameOrEmail")
                        : msg("email")}
                  </Label>
                  <Input
                    tabIndex={2}
                    type="text"
                    name="username"
                    defaultValue={login.username ?? ""}
                    id="username"
                    placeholder={
                      !realm.loginWithEmailAllowed
                        ? msgStr("username")
                        : !realm.registrationEmailAsUsername
                          ? msgStr("usernameOrEmail")
                          : msgStr("email")
                    }
                    autoFocus
                    autoComplete="username"
                    className={cn(
                      messagesPerField.existsError("username", "password") &&
                        "border border-error-secondary !text-error-primary placeholder:text-error-primary",
                    )}
                  />
                  {messagesPerField.existsError("username", "password") && (
                    <span
                      id="input-error"
                      className="text-error-secondary"
                      aria-live="polite"
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                          messagesPerField.getFirstError(
                            "username",
                            "password",
                          ),
                        ),
                      }}
                    />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className={cn(kcClsx("kcLabelClass"), "text-gray-600")}
                >
                  {msg("password")}
                </Label>
                <PasswordWrapper
                  kcClsx={kcClsx}
                  i18n={i18n}
                  passwordInputId="password"
                >
                  <Input
                    type="password"
                    tabIndex={3}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError(
                      "username",
                      "password",
                    )}
                    placeholder="Password"
                    className={cn(
                      messagesPerField.existsError("username", "password") &&
                        "border border-error-secondary !text-error-primary placeholder:text-error-primary",
                    )}
                  />
                </PasswordWrapper>
                {usernameHidden &&
                  messagesPerField.existsError("username", "password") && (
                    <span
                      id="input-error"
                      className="text-error-secondary"
                      aria-live="polite"
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                          messagesPerField.getFirstError(
                            "username",
                            "password",
                          ),
                        ),
                      }}
                    />
                  )}
              </div>

              <div className="flex flex-row justify-between items-center gap-2">
                <div id="kc-form-options" className="flex flex-row gap-2">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="flex flex-row gap-2 items-center">
                      <Checkbox
                        name="rememberMe"
                        id="rememberMe"
                        defaultChecked={!!login.rememberMe}
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        {msg("rememberMe")}
                      </Label>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  {realm.resetPasswordAllowed && (
                    <a
                      tabIndex={6}
                      href={url.loginResetCredentialsUrl}
                      className="text-brand-primary hover:underline text-sm"
                    >
                      {msg("doForgotPassword")}
                    </a>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className="flex flex-col gap-2">
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth.selectedCredential}
                />
                <Button
                  tabIndex={7}
                  disabled={isLoginButtonDisabled}
                  className="bg-brand-primary text-white h-[45px] hover:bg-brand-primary/90"
                  type="submit"
                >
                  {msgStr("doLogIn")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  );
}

function PasswordWrapper(props: {
  kcClsx: KcClsx;
  i18n: I18n;
  passwordInputId: string;
  children: JSX.Element;
}) {
  const { i18n, passwordInputId, children } = props;

  const { msgStr } = i18n;

  const { isPasswordRevealed, toggleIsPasswordRevealed } =
    useIsPasswordRevealed({ passwordInputId });

  return (
    <div className="flex flex-row gap-1">
      {children}
      <Button
        variant="outline"
        type="button"
        aria-label={msgStr(
          isPasswordRevealed ? "hidePassword" : "showPassword",
        )}
        aria-controls={passwordInputId}
        onClick={toggleIsPasswordRevealed}
        className="border-[var(--input)]"
      >
        {isPasswordRevealed ? <EyeSlashIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}
