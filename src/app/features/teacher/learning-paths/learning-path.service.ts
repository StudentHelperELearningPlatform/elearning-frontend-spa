import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LearningPath } from './learning-path.model';

@Injectable({
  providedIn: 'root'
})
export class LearningPathEditorService {

  getLearningPath(id: string): Observable<LearningPath> {
    return of({
      id,
      name: 'Demo Path',
      description: 'Example learning path',
      status: 'draft',
      lessons: []
    });
  }

  createLearningPath(path: LearningPath): Observable<unknown> {
    console.log('POST', path);
    return of({ success: true });
  }

  updateLearningPath(id: string, path: LearningPath): Observable<unknown> {
    console.log('PUT', id, path);
    return of({ success: true });
  }
}