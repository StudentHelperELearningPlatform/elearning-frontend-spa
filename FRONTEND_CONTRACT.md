 # Frontend contract

## Lista endpoint-uri ale frontend-ului

| Metoda | Endpoint | Descriere                                                                                  |
|---|---|--------------------------------------------------------------------------------------------|
| GET | /api/auth/check-email | Verifica daca un email este deja inregistrat -> backend2                                   |
| POST | /api/auth/register | Inregistreaza un user dupa email -> backend2                                               |
| GET | /api/learning-paths/:id | Structura lectiilor, status & score la lectii combina lessons si user service -> backend2? |
| GET | /api/lessons/:id | Afiseaza o lectie dupa ID -> backend1                                                      |
| PUT | /api/lessons/:lessonId/progress | Updateaza progresul unei lectii dupa ID                                                    |
| GET | /api/quizzez/:id | Afiseaza un quiz dupa ID -> backend1                                                       |
| POST | /api/quizzez/:id/submit | Da submit la un quiz -> backend 1                                                          |

## Lista endpoint-uri pe care le avem in comun

| Ce mockuiesc ei | Ce avem noi real         | Problema |
|---|--------------------------|---|
| GET /api/lessons/:id | GET /api/v1/lessons/{id} | Lipseste versionarea , diferenta de naming (int front "modules", in back "subcapitols"), structura diferita(int front "modules" cu type si content, in back "subcapitols" cu "blocks" care are "blockType", diferenta la enumuri, in front e "type", in back "blockType") Ex:
Front:
```json
{
  "modules": [
    { "type": "text", "content": "..." }
  ]
}
```
Back:
```json
{
  "subcapitols": [
    {
      "blocks": [
        { "blockType": "TEXT" }
      ]
    }
  ]
}
```
Propunere : frontend ar trebui sa se alinieze la structura din backend -> *lesson -> subcapitol -> blocks*

| GET  /api/quizzez/:id & POST /api/quizzez/:id/submit | NU EXISTA IN BACKEND | IN BACKEND EXISTA : GET  /api/v1/lessons/{lessonId}/final-quiz/questions, POST /api/v1/subcapitols/{id}/check-quiz/submit, POST /api/v1/lessons/{lessonId}/final-quiz/questions; |
|---|---|---|
ASTFEL:
- In frontend este un *TYPO*  quizzez
- In frontend quiz global per id ? In backend quiz per subcapitol + quiz final per leectie
- In frontend submitul e diferit : POST /api/quizzez/:id/submit vs Backend POST /api/v1/subcapitols/{id}/check-quiz/submit

Propuneri :
- Frontend sa se alinieze la structura din backend :
  * check quiz -> /subcapitols/{id}/check-quiz/submit
  * quiz final -> /lessons/{lessonId}/final-quiz/questions


---

## Probleme globale 
- Lipsa versionare la endpointuri 
  - In frontend : /api/..
  - In backend : /api/v1/..
  **REZOLVAT URGENT**
- Naming inconsistent
  - modules vs subcapitols
  - text vs TEXT
  - quiz vs check-quiz / final-quiz

---

## Endpointuri lipsa (exista in backend, nu le am gasit in frontend)

### Content Blocks

- GET /api/v1/subcapitols/{id}/blocks

Reason:
Permite o incarcare mai usoara vs incarcarea intregii lectii

### Question Management

- GET /api/v1/questions/{id}
- PUT /api/v1/questions/{id}
- PATCH /api/v1/questions/{id}/approve
- DELETE /api/v1/questions/{id}

Reason:
Necesar pentru admin/profesor



