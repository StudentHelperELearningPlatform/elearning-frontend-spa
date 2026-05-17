import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassDetailComponent } from '../../classes/pages/classes-detail/class-detail.component';

@Component({
  selector: 'app-teacher-class-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    ClassDetailComponent,
  ],
  templateUrl:
    './teacher-class-detail-page.component.html',
  styleUrls: [
    './teacher-class-detail-page.component.scss',
  ],
})
export class TeacherClassDetailPageComponent {}