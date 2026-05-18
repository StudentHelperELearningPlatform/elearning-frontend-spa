# API Integration

## Endpoint versioning
Baseline is `/api/v1/` in this app. `AuthService` hits `${keycloak.url}/api/v1/auth/register` and `/api/v1/auth/check-email`, and the mocks in `src/mocks/handlers` use `/api/v1/*` too. And the bearer-token interceptor still matches `/api/**`, so v1 stays covered. See [FRONTEND_CONTRACT.md](./FRONTEND_CONTRACT.md) for the contract and current differences.

## Known mismatches
[TODO: drop the issues table from the frontend contract here]
These issues are being resolved in Sprint 5.

## How to regenerate the API client
Placeholder for Sprint 10. We will document the generator, script, and output folder once the OpenAPI specs land.
