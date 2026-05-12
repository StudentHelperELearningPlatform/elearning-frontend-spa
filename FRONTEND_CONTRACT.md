# Frontend contract (Sprint 6)

## Source of truth
- API calls use environment.apiBase (currently `/api/v1`) unless noted.
- Auth registration and email checks use environment.keycloak.url as the base.
- Bearer tokens are attached by includeBearerTokenInterceptor for `/api/**` and `http://localhost:8080/**`.

## Endpoints used by the frontend
| Area | Method | Endpoint | Source or notes |
| --- | --- | --- | --- |
| Auth | GET | /api/v1/auth/check-email?email= | Base: environment.keycloak.url (AuthService) |
| Auth | POST | /api/v1/auth/register | Base: environment.keycloak.url (AuthService) |
| Learning paths | GET | /api/v1/learning-paths/:id | LearningPathsStore |
| Student dashboard | GET | /api/v1/students/:id/dashboard | ProgressStore |
| Student milestones | GET | /api/v1/students/:id/milestones | MilestonesStore |
| Student skills | GET | /api/v1/students/:id/skills/:subject | SkillDetailStore |
| Quizzes | GET | /api/v1/quizzes/:id | QuizzesStore |
| Quizzes | POST | /api/v1/quizzes/:id/submit | QuizzesStore |
| Quizzes | GET | /api/v1/quizzes/:id/results/:attemptId | QuizzesStore |
| Teacher dashboard | GET | /api/v1/teacher/:teacherId/dashboard | ContentStore |

## Lessons
- No lesson list or lesson detail endpoints are called by the app.
- LessonsStore uses local sample data and setTimeout for loading.
- MSW defines lesson detail and progress endpoints, but the app does not call them.

## Progress
- Only `GET /api/v1/students/:id/dashboard` is used by the app.
- No progress update endpoint is called by the app.

## Class management
- ClassStore uses local sample data and setTimeout.
- ContentStore only loads the teacher dashboard; no class CRUD endpoints are called by the app.

## Media upload
- No media upload endpoints or FormData usage found in the app.

## Mock-only endpoints in MSW (not used by the app)
- /api/v1/lessons/:id
- /api/v1/lessons/:lessonId/progress
- /api/v1/lessons (list, create, update, publish, archive, unpublish, delete, duplicate)
- /api/v1/lessons/:lessonId/final-quiz/questions
- /api/v1/subcapitols/:id/check-quiz
- /api/v1/subcapitols/:id/check-quiz/submit

## Known mismatches and data gaps
- Quizzes: the app calls `/api/v1/quizzes/*`, while MSW models quizzes under `/api/v1/lessons/:lessonId/final-quiz/questions` and `/api/v1/subcapitols/:id/check-quiz`.
- Skill detail: SkillDetailStore expects `confidence` as a number, but MSW returns `confidence` as a string (`'Proficient'`).
- apiUrl is defined in environment files but is not referenced in the app.



