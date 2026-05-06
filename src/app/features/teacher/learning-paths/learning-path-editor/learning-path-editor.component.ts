import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


interface Lesson {
  id: string;
  title: string;
  prerequisites: string[];
}

@Component({
  selector: 'app-learning-path-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  templateUrl: './learning-path-editor.component.html',
  styleUrls: ['./learning-path-editor.component.scss']
})
export class LearningPathEditorComponent implements OnInit {

  form!: FormGroup;

  allLessons: Lesson[] = [
    { id: '1', title: 'Lesson 1', prerequisites: [] },
    { id: '2', title: 'Lesson 2', prerequisites: [] },
    { id: '3', title: 'Lesson 3', prerequisites: [] }
  ];

  selectedLessons: Lesson[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  addLesson(lesson: Lesson) {
    if (!this.selectedLessons.find(l => l.id === lesson.id)) {
      this.selectedLessons.push({ ...lesson, prerequisites: [] });
    }
  }

  removeLesson(index: number) {
    this.selectedLessons.splice(index, 1);
  }

  drop(event: CdkDragDrop<Lesson[]>) {
    moveItemInArray(this.selectedLessons, event.previousIndex, event.currentIndex);
  }

  setPrerequisites(lessonIndex: number, prereqIds: string[]) {
    this.selectedLessons[lessonIndex].prerequisites = prereqIds;
  }

  saveDraft() {
    console.log('SAVE DRAFT', this.form.value, this.selectedLessons);
  }

  publish() {
    console.log('PUBLISH', this.form.value, this.selectedLessons);
  }

  onPrereqChange(index: number, event: Event) {
  const select = event.target as HTMLSelectElement;

  const values = Array
    .from(select.selectedOptions)
    .map(option => option.value);

  this.setPrerequisites(index, values);
}
}