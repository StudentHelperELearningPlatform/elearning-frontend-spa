# SonarCloud Setup Guide

## Section 1 — How to view results

Navigate to [sonarcloud.io](https://sonarcloud.io), log in with GitHub, and find the `elearning-frontend-spa` project.

The SonarCloud dashboard shows:
- **Bugs** — reliability issues that may cause unexpected behavior
- **Vulnerabilities** — security issues that could be exploited
- **Code Smells** — maintainability issues (duplication, complexity, etc.)
- **Coverage** — percentage of code covered by unit tests
- **Duplications** — repeated blocks of code across the codebase

Results update automatically on every push to `main` or `develop`, and on every pull request.

---

## Section 2 — Quality gate checks

The quality gate defines the minimum standards for code to be accepted.

| Check                    | Threshold              |
|--------------------------|------------------------|
| New Bugs                 | 0                      |
| New Vulnerabilities      | 0                      |
| Coverage on new code     | ≥ 70%                  |
| Duplicated lines         | < 5%                   |
| Security Hotspots        | 0 unreviewed           |

Pull requests that fail the quality gate will be blocked from merging until all issues are resolved.

---

## Section 3 — How to fix common issues

### Coverage too low
Add tests for the uncovered code paths. Run `npm run test -- --coverage` locally first to see the coverage report before pushing.

### Duplication
Extract repeated logic into a shared service, utility function, or component. Look for similar blocks in templates and component logic.

### Bug / vulnerability
Click the issue in the SonarCloud dashboard to see the exact line of code and the suggested fix. Most issues include a detailed explanation and remediation steps.

### Quality gate failing on PR
Fix the issues locally, push again to the same branch, and the SonarCloud job will re-run automatically. No manual intervention is needed.

---

## Section 4 — SONAR_TOKEN location

The `SONAR_TOKEN` is stored in:

**GitHub repo → Settings → Secrets and variables → Actions → SONAR_TOKEN**

To rotate the token:
1. Generate a new token at [sonarcloud.io](https://sonarcloud.io) → **My Account** → **Security**
2. Copy the new token
3. Update the `SONAR_TOKEN` secret in the GitHub repository settings

---

## Section 5 — PR decoration and branch protection

### PR decoration
SonarCloud can add analysis results directly to pull requests as comments.

1. Go to the SonarCloud project **Settings**
2. Navigate to **Administration** → **Pull Requests**
3. Enable the **GitHub** integration

### Branch protection
Require SonarCloud analysis to pass before merging:

1. Go to the GitHub repository **Settings** → **Branches**
2. Edit the protection rule for `develop` and/or `main`
3. Check **"Require status checks to pass before merging"**
4. Search for and add **"SonarCloud Code Analysis"** as a required status check
