# Implementation TODO — E3-03 + S4-carry-01

## E3-03 Tasks (30 items)

- [ ] A. QuizAttempt model — src/app/shared/models/quiz.types.ts
- [ ] B. Extend QuizzesStore — src/app/features/student/store/quizzes.store.ts
  - [ ] B1. Import QuizAttempt
  - [ ] B2. Add to QuizzesState interface
  - [ ] B3. Add to withState initial values
  - [ ] B4. Add loadAttempts() method
- [ ] C. Route — src/app/features/student/student.routes.ts
  - [ ] C1. Import QuizHistoryComponent
  - [ ] C2. Add route BEFORE quizzes/:id
- [ ] D. Sidebar link — src/app/shared/components/sidebar/sidebar.component.ts
- [ ] E. QuizHistoryComponent — new files
  - [ ] E1. quiz-history.component.ts
  - [ ] E2. quiz-history.component.html
  - [ ] E3. quiz-history.component.spec.ts
- [ ] F. MSW Handler — src/mocks/handlers/quizzes.handlers.ts
- [ ] G. Unit tests
  - [ ] G1. Update quizzes.store.spec.ts beforeEach
  - [ ] G2. Add loadAttempts store tests
  - [ ] G3. Create quiz-history.component.spec.ts

## S4-carry-01 Tasks (18 items)

- [ ] H. sonar-project.properties
- [ ] I. Fix CI test command + vitest.config.ts
- [ ] J. SonarCloud CI job
- [ ] K. docs/SONARCLOUD.md

## Final

- [ ] QA Self-Verification (Section 3 checks)
- [ ] L. implementation-journal.txt
