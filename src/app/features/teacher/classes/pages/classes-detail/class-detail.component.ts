import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-class-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  store = inject(ClassStore);

  classId!: string;

  students = computed(() =>
    this.store.currentClass()?.students ?? []
  );

  lessons = computed(() =>
    this.store.currentClass()?.lessons ?? []
  );

  ngOnInit(): void {
    this.classId = this.route.snapshot.params['classId'];
    this.store.loadClassDetail(this.classId);
  }

  removeStudent(studentId: string) {
    this.store.removeStudent(this.classId, studentId);
  }

  removeLesson(lessonId: string) {
    this.store.removeLesson(this.classId, lessonId);
  }
}