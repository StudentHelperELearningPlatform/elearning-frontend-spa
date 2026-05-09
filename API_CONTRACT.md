# API Contract — User Platform Service

> **Base URL:** `http://localhost:8083`
> 
> **Autentificare:** Toate endpoint-urile (cu excepția Swagger) necesită două headere:
> 
> | Header | Descriere | Exemplu |
> |--------|-----------|---------|
> | `X-User-Id` | UUID-ul utilizatorului logat | `11111111-1111-1111-1111-111111111111` |
> | `X-User-Role` | Rolul utilizatorului | `STUDENT` / `PROFESSOR` / `ADMIN` |

---

## Cuprins

- [Users](#users)
- [Students](#students)
- [Teachers](#teachers)
- [Progress](#progress)
- [Payments](#payments)
- [Notifications](#notifications)
- [Contact](#contact)
- [Admin](#admin)

---

## Users

### Creare utilizator
```
POST /api/v1/users
```
> ⚠️ Endpoint public — nu necesită headere de autentificare.

**Request Body:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "email": "ion.popescu@gmail.com",
  "password": "Parola123!",
  "role": "STUDENT",
  "profilePictureUrl": "https://...",
  "phoneNumber": "+40722222222"
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "firstName": "Ion",
  "lastName": "Popescu",
  "email": "ion.popescu@gmail.com",
  "role": "STUDENT",
  "profilePictureUrl": "https://..."
}
```

---

### Obține utilizator după ID
```
GET /api/v1/users/{id}
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
{
  "id": "uuid",
  "firstName": "Ion",
  "lastName": "Popescu",
  "email": "ion.popescu@gmail.com",
  "role": "STUDENT",
  "profilePictureUrl": "https://..."
}
```

---

## Students

### Obține profilul meu
```
GET /api/v1/students/me/profile
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |

**Response `200 OK`:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "id": "uuid",
  "school": "Liceul X",
  "bio": "...",
  "gradeLevel": "Clasa a IX-a",
  "enrolledClasses": ["uuid1", "uuid2"]
}
```

---

### Actualizează profilul meu
```
PUT /api/v1/students/me/profile
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |

**Request Body:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "school": "Liceul X",
  "bio": "...",
  "gradeLevel": "Clasa a IX-a",
  "profilePictureUrl": "https://..."
}
```

**Response `200 OK`:** același format ca la GET profil student.

---

## Teachers

### Obține profilul meu
```
GET /api/v1/teachers/me/profile
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
{
  "firstName": "Elena",
  "lastName": "Dumitrescu",
  "id": "uuid",
  "school": "Liceul X",
  "bio": "...",
  "subjects": [{ "id": "uuid", "name": "Matematică", "bio": "..." }],
  "classes": [{ "id": "uuid", "name": "9A", "bio": "..." }]
}
```

---

### Actualizează profilul meu
```
PUT /api/v1/teachers/me/profile
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Request Body:**
```json
{
  "firstName": "Elena",
  "lastName": "Dumitrescu",
  "school": "Liceul X",
  "bio": "...",
  "subjectIds": ["uuid1"],
  "classIds": ["uuid1"],
  "profilePictureUrl": "https://..."
}
```

---

### Creare lecție
```
POST /api/v1/teachers/lessons
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Request Body:**
```json
{
  "title": "Introducere în algebră",
  "subject": "Matematică",
  "difficulty_level": "BEGINNER",
  "estimated_duration_minutes": 45,
  "short_description": "...",
  "classIds": ["uuid1"]
}
```
> Valori posibile `difficulty_level`: `BEGINNER`, `INTERMEDIATE`, `ADVANCED`

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "title": "Introducere în algebră",
  "subject": "Matematică",
  "difficulty_level": "BEGINNER",
  "status": "DRAFT",
  "estimated_duration_minutes": 45,
  "short_description": "...",
  "author_id": "uuid",
  "created_at": "2026-05-06T10:00:00"
}
```

---

### Obține toate lecțiile mele
```
GET /api/v1/teachers/lessons
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Response `200 OK`:** listă de lecții (același format ca la creare lecție).

---

### Obține lecție după ID
```
GET /api/v1/teachers/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

---

### Actualizează lecție
```
PUT /api/v1/teachers/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Request Body:** (toate câmpurile sunt opționale)
```json
{
  "title": "...",
  "subject": "...",
  "difficulty_level": "INTERMEDIATE",
  "estimated_duration_minutes": 60,
  "short_description": "...",
  "classIds": ["uuid1"]
}
```

---

### Publică lecție
```
POST /api/v1/teachers/lessons/{lessonId}/publish
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Response `200 OK`:** lecția cu `status: "PUBLISHED"`.

---

### Retrage lecție din publicare
```
POST /api/v1/teachers/lessons/{lessonId}/unpublish
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |

**Response `200 OK`:** lecția cu `status: "DRAFT"`.

---

### Șterge lecție
```
DELETE /api/v1/teachers/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Creare clasă
```
POST /api/v1/teachers/classes
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Request Body:**
```json
{
  "name": "9A",
  "bio": "Clasa a IX-a profil real"
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "name": "9A",
  "bio": "Clasa a IX-a profil real"
}
```

---

### Obține toate clasele
```
GET /api/v1/teachers/classes
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:** listă de clase.

---

### Obține clasă după ID
```
GET /api/v1/teachers/classes/{classId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

---

### Actualizează clasă
```
PUT /api/v1/teachers/classes/{classId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Request Body:** același ca la creare clasă.

---

### Șterge clasă
```
DELETE /api/v1/teachers/classes/{classId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Adaugă student în clasă
```
POST /api/v1/teachers/classes/{classId}/students/{studentId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `201 Created`:**
```json
{
  "classId": "uuid",
  "studentId": "uuid"
}
```

---

### Elimină student din clasă
```
DELETE /api/v1/teachers/classes/{classId}/students/{studentId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Obține studenții dintr-o clasă
```
GET /api/v1/teachers/classes/{classId}/students
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
["uuid1", "uuid2", "uuid3"]
```

---

### Adaugă lecție la clasă
```
POST /api/v1/teachers/classes/{classId}/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `201 Created`**

---

### Elimină lecție din clasă
```
DELETE /api/v1/teachers/classes/{classId}/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Obține lecțiile unei clase
```
GET /api/v1/teachers/classes/{classId}/lessons
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:** listă de lecții.

---

## Progress

### Dashboard studentului meu
```
GET /api/v1/progress/me/dashboard?classId={classId}
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |

**Response `200 OK`:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "studentId": "uuid",
  "subjects": [
    {
      "subjectId": "uuid",
      "skillLevel": 75.5,
      "confidence": 8.0
    }
  ],
  "currentStreak": 5
}
```

---

### Istoricul meu de exerciții
```
GET /api/v1/progress/me/history
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |

**Query params (opționale):**
| Param | Tip | Descriere |
|-------|-----|-----------|
| `lessonId` | UUID | filtrează după lecție |
| `result` | String | `ALL`, `COMPLETED`, `IN_PROGRESS` |
| `from` | Date (yyyy-MM-dd) | de la data |
| `to` | Date (yyyy-MM-dd) | până la data |

**Response `200 OK`:**
```json
[
  {
    "id": "uuid",
    "lessonId": "uuid",
    "startedAt": "2026-05-01T10:00:00",
    "completedAt": "2026-05-01T10:45:00"
  }
]
```

---

### Lista studenților dintr-o clasă (profesor)
```
GET /api/v1/progress/professor/students?classId={classId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
[
  {
    "firstName": "Ion",
    "lastName": "Popescu",
    "studentId": "uuid",
    "streakValue": 5,
    "lastActiveAt": "2026-05-05T14:00:00"
  }
]
```

---

### Detalii student (profesor)
```
GET /api/v1/progress/professor/students/{studentId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
{
  "firstName": "Ion",
  "lastName": "Popescu",
  "studentId": "uuid",
  "subjects": [{ "subjectId": "uuid", "skillLevel": 75.5, "confidence": 8.0 }],
  "milestones": [{ "id": "uuid", "lessonId": "uuid", "description": "...", "pos": 1 }]
}
```

---

### Istoricul unui student (profesor)
```
GET /api/v1/progress/professor/students/{studentId}/history
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:** listă de exerciții (același format ca istoricul studentului).

---

### Statistici clasă (profesor)
```
GET /api/v1/progress/professor/class-stats?classId={classId}
```
| Rol permis | |
|---|---|
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Query params (opționale):**
| Param | Tip | Default |
|-------|-----|---------|
| `from` | Date | - |
| `to` | Date | - |
| `inactivityThresholdDays` | int | `7` |

**Response `200 OK`:**
```json
{
  "averageSkillLevel": 68.5,
  "inactiveStudents": [
    {
      "firstName": "Ion",
      "lastName": "Popescu",
      "studentId": "uuid",
      "streakValue": 0,
      "lastActiveAt": null
    }
  ]
}
```

---

## Payments

### Inițiază plată
```
POST /api/v1/payments/checkout?studentId={studentId}&bundleId={bundleId}
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |

**Query params:**
| Param | Obligatoriu | Descriere |
|-------|-------------|-----------|
| `studentId` | ✅ | UUID-ul studentului |
| `bundleId` | ✅ | UUID-ul bundle-ului |
| `itemType` | ❌ | `BUNDLE`, `LESSON`, `SCHOOL_CLASS` (default: `BUNDLE`) |
| `itemId` | ❌ | UUID-ul itemului (dacă diferit de bundleId) |

**Response `200 OK`:**
```json
{
  "transactionId": "uuid",
  "status": "SUCCEEDED",
  "errorMessage": null
}
```

---

### Verifică acces la lecție
```
GET /api/v1/payments/access-check?studentId={studentId}&lessonId={lessonId}
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |
| `PROFESSOR` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
true
```

---

### Istoricul achizițiilor unui student
```
GET /api/v1/payments/history/{studentId}
```
| Rol permis | |
|---|---|
| `STUDENT` | ✅ |
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
[
  {
    "purchaseId": "uuid",
    "studentId": "uuid",
    "itemType": "BUNDLE",
    "itemId": "uuid",
    "purchasedAt": "2026-05-01T10:00:00",
    "amountPaid": 100.0
  }
]
```

---

## Notifications

### Notificările mele necitite
```
GET /api/v1/notifications/me/unread
```
| Rol permis | |
|---|---|
| Orice utilizator autentificat | ✅ |

**Response `200 OK`:**
```json
[
  {
    "id": "uuid",
    "title": "Lecție nouă disponibilă!",
    "message": "A fost adăugată o lecție nouă în clasa ta.",
    "type": "CLASS",
    "isRead": false,
    "createdAt": "2026-05-06T10:00:00"
  }
]
```
> Tipuri posibile `type`: `SYSTEM`, `PROGRESS`, `PAYMENT`, `CLASS`, `ACHIEVEMENT`

---

### Marchează notificare ca citită
```
PUT /api/v1/notifications/{notificationId}/read
```
| Rol permis | |
|---|---|
| Orice utilizator autentificat | ✅ |

**Response `204 No Content`**

---

### Marchează toate notificările ca citite
```
PUT /api/v1/notifications/me/read-all
```
| Rol permis | |
|---|---|
| Orice utilizator autentificat | ✅ |

**Response `204 No Content`**

---

## Contact

### Inbox-ul meu
```
GET /api/v1/contact/me/inbox
```
| Rol permis | |
|---|---|
| Orice utilizator autentificat | ✅ |

**Response `200 OK`:**
```json
[
  {
    "id": "uuid",
    "senderId": "uuid",
    "subject": "Întrebare despre lecție",
    "body": "...",
    "isRead": false,
    "sentAt": "2026-05-06T10:00:00"
  }
]
```

---

### Trimite mesaj
```
POST /api/v1/contact/send
```
| Rol permis | |
|---|---|
| Orice utilizator autentificat | ✅ |

**Request Body:**
```json
{
  "senderId": "uuid",
  "receiverId": "uuid",
  "subject": "Întrebare despre lecție",
  "body": "Bună ziua, aveam o întrebare..."
}
```

**Response `200 OK`:**
```json
"Mesajul a fost trimis cu succes!"
```

---

## Admin

### Șterge utilizator
```
DELETE /api/v1/admin/users/{targetUserId}
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Șterge clasă
```
DELETE /api/v1/admin/classes/{classId}
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Șterge lecție
```
DELETE /api/v1/admin/lessons/{lessonId}
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Banează utilizator
```
POST /api/v1/admin/users/{targetUserId}/ban
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Request Body:**
```json
{
  "reason": "Comportament inadecvat"
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "reason": "Comportament inadecvat",
  "bannedAt": "2026-05-06T10:00:00"
}
```

---

### Debanează utilizator
```
DELETE /api/v1/admin/users/{targetUserId}/ban
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `204 No Content`**

---

### Lista utilizatorilor banați
```
GET /api/v1/admin/users/banned
```
| Rol permis | |
|---|---|
| `ADMIN` | ✅ |

**Response `200 OK`:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "reason": "Comportament inadecvat",
    "bannedAt": "2026-05-06T10:00:00"
  }
]
```

---

## Coduri de eroare

| Cod | Descriere |
|-----|-----------|
| `200` | Succes |
| `201` | Creat cu succes |
| `204` | Șters / actualizat fără răspuns |
| `400` | Date invalide în request |
| `401` | Lipsesc headerele `X-User-Id` sau `X-User-Role` |
| `403` | Rolul nu are acces la acest endpoint |
| `404` | Resursa nu a fost găsită |
| `409` | Conflict (ex: studentul e deja înscris în clasă) |
