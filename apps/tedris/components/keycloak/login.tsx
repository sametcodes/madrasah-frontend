'use client'
import { signIn } from 'next-auth/react'

const KeycloakLogin = () => {
  signIn('keycloak')
  return <>Giriş Yapılıyor...</>
}

export default KeycloakLogin
