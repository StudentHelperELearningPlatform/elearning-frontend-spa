import { Component, inject, OnInit } from '@angular/core';
import { ClassStore } from '../../state/class.store';

@Component({
  selector: 'app-teacher-classes-page',
  templateUrl: './teacher-classes-page.component.html',
})
export class TeacherClassesPageComponent implements OnInit {
  store = inject(ClassStore);

  ngOnInit() {
    this.store.loadClasses();
  }
}