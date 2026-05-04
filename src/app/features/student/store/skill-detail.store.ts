import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SkillTrendPoint {
  date: string;
  level: number;
}

export interface QuizScore {
  id: string;
  title: string;
  date: string;
  score: number;
}

export interface SkillDetail {
  subject: string;
  level: number;
  confidence: number;
  trendData: SkillTrendPoint[];
  recentQuizzes: QuizScore[];
  recommendations: string[];
}

@Injectable({ providedIn: 'root' })
export class SkillDetailStore {
  private http = inject(HttpClient);

  skill = signal<SkillDetail | null>(null);
  loading = signal(false);

  loadSkill(studentId: string, subject: string) {
    this.loading.set(true);

    this.http.get<SkillDetail>(`/api/students/${studentId}/skills/${subject}`)
      .subscribe({
        next: (data) => {
          this.skill.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  confidenceLabel = computed(() => {
    const c = this.skill()?.confidence ?? 0;

    if (c <= 30) return 'Beginner';
    if (c <= 60) return 'Developing';
    if (c <= 85) return 'Proficient';
    return 'Advanced';
  });

  confidenceColor = computed(() => {
    const c = this.skill()?.confidence ?? 0;

    if (c <= 30) return '#f44336';
    if (c <= 60) return '#ff9800';
    if (c <= 85) return '#2196f3';
    return '#0ABAB5';
  });
}