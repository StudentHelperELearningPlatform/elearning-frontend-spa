import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { SkillDetailStore } from '../store/skill-detail.store';

@Component({
  //selector: 'app-skill-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  store = inject(SkillDetailStore);

  studentId = '1';
  subject = '';

  ngOnInit() {
    this.subject = this.route.snapshot.paramMap.get('subject') || '';
    this.store.loadSkill(this.studentId, this.subject);
  }

  skill = computed(() => this.store.skill());

  showChart = computed(() =>
    (this.store.skill()?.trendData?.length ?? 0) >= 3
  );

  chartOptions = computed(() => {
    const data = this.store.skill()?.trendData ?? [];

    return {
      xAxis: {
        type: 'category',
        data: data.map(d => d.date)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100
      },
      series: [
        {
          data: data.map(d => d.level),
          type: 'line',
          smooth: true,
          areaStyle: {}
        }
      ]
    };
  });
}