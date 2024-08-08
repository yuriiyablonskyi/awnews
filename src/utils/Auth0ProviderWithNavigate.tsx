import { Auth0Provider } from '@auth0/auth0-react'

export const Auth0ProviderWithNavigate = ({ children }: any) => {
  const onRedirectCallback = (appState: any) => {
    window.location.assign(appState?.returnTo || `${window.location.pathname}?country=us`)
  }

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
