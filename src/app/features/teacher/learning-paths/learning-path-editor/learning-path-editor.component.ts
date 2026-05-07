import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LearningPathEditorService } from '../learning-path.service';
import { LearningPath } from '../learning-path.model';

interface Lesson {
  id: string;
  title: string;
  prerequisites: string[];
}

@Component({
  selector: 'app-learning-path-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './learning-path-editor.component.html',
  styleUrls: ['./learning-path-editor.component.scss'],
})
export class LearningPathEditorComponent implements OnInit {

  private fb = inject(FormBuilder);
  private learningPathService = inject(LearningPathEditorService);

  form!: FormGroup;

  allLessons: Lesson[] = [
    { id: '1', title: 'Lesson 1', prerequisites: [] },
    { id: '2', title: 'Lesson 2', prerequisites: [] },
    { id: '3', title: 'Lesson 3', prerequisites: [] },
  ];

  selectedLessons: Lesson[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  addLesson(lesson: Lesson | null) {
    if (!lesson) return;

    if (!this.selectedLessons.find((l) => l.id === lesson.id)) {
      this.selectedLessons.push({ ...lesson, prerequisites: [] });
    }
  }

  removeLesson(index: number) {
    this.selectedLessons.splice(index, 1);
  }

  drop(event: CdkDragDrop<Lesson[]>) {
    moveItemInArray(this.selectedLessons, event.previousIndex, event.currentIndex);
  }

  setPrerequisites(index: number, ids: string[]) {
    const valid = ids.filter((id) => {
      const prereqIndex = this.selectedLessons.findIndex((l) => l.id === id);
      return prereqIndex < index;
    });

    this.selectedLessons[index].prerequisites = valid;
  }

  onPrereqChange(index: number, event: Event) {
    const select = event.target as HTMLSelectElement;
    const values = Array.from(select.selectedOptions).map((o) => o.value);

    this.setPrerequisites(index, values);
  }

  saveDraft() {
    const payload: LearningPath = {
      name: this.form.value.name,
      description: this.form.value.description,
      lessons: this.selectedLessons.map((l) => ({
        id: l.id,
        title: l.title,
        prerequisites: l.prerequisites,
      })),
      status: 'draft',
    };

    this.learningPathService.createLearningPath(payload).subscribe();
  }

  publish() {
    const payload: LearningPath = {
      name: this.form.value.name,
      description: this.form.value.description,
      lessons: this.selectedLessons.map((l) => ({
        id: l.id,
        title: l.title,
        prerequisites: l.prerequisites,
      })),
      status: 'published',
    };

    this.learningPathService.createLearningPath(payload).subscribe();
  }

  addSelectedLesson(lessonId: string | null) {
    if (!lessonId) return;

    const lesson = this.allLessons.find((l) => l.id === lessonId) ?? null;
    this.addLesson(lesson);
  }
}