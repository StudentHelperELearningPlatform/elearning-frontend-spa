# Deploy checklist

## Local preflight
- npm ci
- npm run lint
- npm run test -- --watch=false --coverage
- npm run build -- --configuration production

## CI pipeline (.github/workflows/ci.yml)
- Runs on pushes and PRs to main and develop.
- Jobs: lint, test with coverage, build (production config), SonarCloud scan.
- SonarCloud scan uses coverage/lcov.info and requires SONAR_TOKEN.

## Staging deploy (push to develop)
- Workflow: .github/workflows/deploy-staging.yml
- Build command: npm run build -- --configuration staging
- Artifacts: dist/ uploaded as staging-dist
- Environment URL: https://staging.elearning-platform.example.com
- Deploy step is a placeholder and no deployment target is configured.

## Production deploy (push to main)
- Workflow: .github/workflows/deploy-production.yml
- Build command: npm run build -- --configuration production
- Artifacts: dist/ uploaded as production-dist
- Environment URL: https://elearning-platform.example.com
- Deploy step is a placeholder and no deployment target is configured.
- Tagging: creates a Git tag and GitHub release from package.json version (continue-on-error).

## Manual checks
- Verify Keycloak login with environment.staging.ts and environment.production.ts settings.
- Confirm /silent-check-sso.html is served at the app root in the target deployment.
- Verify API base /api/v1 endpoints are reachable (MSW is disabled when production is true).
