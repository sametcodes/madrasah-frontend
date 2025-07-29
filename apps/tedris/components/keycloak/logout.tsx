'use client';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { Button } from '@madrasah/ui';

const KeycloakLogoutButton = () => {
  const session = useSession();
  const signOutWithRedirect = async () => {
    const idtoken = session.data?.idToken;
    let keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
    keycloakLogoutUrl += `?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`;
    keycloakLogoutUrl += `&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_NEXTAUTH_URL!)}`;
    keycloakLogoutUrl += `&id_token_hint=${idtoken}`;
    await signOut({
      redirect: false,
      callbackUrl: keycloakLogoutUrl,
    });
    window.location.href = keycloakLogoutUrl;
  };
  return <Button onClick={() => signOutWithRedirect()}>ÇIKIŞ YAP</Button>;
};
const KeycloakLogout = () => {
  //Session Provider should not to be there. It must be move global provider of app context.
  return (
    <SessionProvider>
      <KeycloakLogoutButton />
    </SessionProvider>
  );
};
export default KeycloakLogout;
