export const environment = {
    production: true,
    mock: true,
    apiBaseUrl: 'http://localhost:3000/api/v1',
    jwtWhitelistedDomains: ['localhost:3000'],
    blacklistedRoutes: ['http://localhost:3000/api/v1/login']
};
