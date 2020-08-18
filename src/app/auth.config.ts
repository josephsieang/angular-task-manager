import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: 'http://localhost:4200/loading',
  clientId:
    '849668208137-rkvng2d803uubogh8q0hj5o42ogricv0.apps.googleusercontent.com',
  responseType: 'id_token token',
  oidc: true,
  scope: 'openid profile email',
  showDebugInformation: true,
  timeoutFactor: 0.01,
  strictDiscoveryDocumentValidation: false,
};
