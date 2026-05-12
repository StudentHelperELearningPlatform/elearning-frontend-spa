# State management

## Overview
- NgRx SignalStore is used for most feature stores.
- Some feature stores use plain Angular signals (MilestonesStore, SkillDetailStore).
- API calls use environment.apiBase unless otherwise noted.

## Store catalog

### AuthStore (src/app/features/auth/store/auth.store.ts)
State: user, token, role, loading, isAuthReady, error
Derived: isAuthenticated, isTeacher, isStudent, isAdmin
HTTP: none (mirrors AuthService)
Adapters or mapping: maps roles to ADMIN, TEACHER (also PROFESSOR), or STUDENT; sets dicebear avatar and memberSince.

### LearningPathsStore (src/app/features/student/store/learning-paths.store.ts)
State: currentPath, loading, error
Derived: completedCount, totalCount, progressPercent, nextAvailableLesson
HTTP: GET /api/v1/learning-paths/:id

### LessonsStore (src/app/features/student/store/lessons.store.ts)
State: lessons (local sample data), currentLesson, loading, error
Derived: publishedLessons, lessonCount
HTTP: none (setTimeout for loading and selection)

### ProgressStore (src/app/features/student/store/progress.store.ts)
State: student, progressRecords, skillLevels, streak, milestones, recentActivity, upcomingQuizzes, loading, error
Derived: overallProgressPercent, activeStreak, recentMilestones, continueLesson
HTTP: GET /api/v1/students/:id/dashboard

### MilestonesStore (src/app/features/student/store/milestones.store.ts)
State (signals): milestones, loading
Derived: earnedMilestones, lockedMilestones, earnedCount, totalCount
HTTP: GET /api/v1/students/:id/milestones
Notes: uses NotificationService to announce newly earned milestones.

### SkillDetailStore (src/app/features/student/store/skill-detail.store.ts)
State (signals): skill, loading
Derived: confidenceLabel, confidenceColor
HTTP: GET /api/v1/students/:id/skills/:subject

### QuizzesStore (src/app/features/student/store/quizzes.store.ts)
State: currentQuiz, currentQuestionIndex, answers, flaggedQuestions, startedAt, timeRemaining, submitted, result, loading, resultDetail, resultDetailLoading, resultDetailError
Derived: answeredCount, flaggedCount, canSubmit, started, progress, isLastQuestion, currentQuestion, currentAnswerSelected, showResults, score, totalPoints, timeSpent
HTTP:
- GET /api/v1/quizzes/:id
- POST /api/v1/quizzes/:id/submit
- GET /api/v1/quizzes/:id/results/:attemptId
Adapters or mapping: mapQuestionOptions and mapQuizResponse normalize API responses.

### ContentStore (src/app/features/teacher/state/content.store.ts)
State: lessons, quizzes, recentActivity, classes, loading, error
Derived: published/draft/archived filters and counts
HTTP: GET /api/v1/teacher/:teacherId/dashboard
Adapters or mapping: reviveDates converts ISO strings to Date objects.
Other methods: create/update/delete for lessons and quizzes are local state updates only.

### ClassStore (src/app/features/teacher/store/class.store.ts)
State: classes, currentClass, students, loading, error (local sample data)
Derived: activeClasses, topStudents
HTTP: none (setTimeout and local mutations)
