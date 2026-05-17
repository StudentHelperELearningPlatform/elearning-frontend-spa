import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesListComponent } from '../../classes/pages/classes-list/classes-list.component';

@Component({
  selector: 'app-teacher-classes-page',
  standalone: true,
  imports: [
    CommonModule,
    ClassesListComponent,
  ],
  templateUrl:
    './teacher-classes-page.component.html',
  styleUrls: [
    './teacher-classes-page.component.scss',
  ],
})
export class TeacherClassesPageComponent {}