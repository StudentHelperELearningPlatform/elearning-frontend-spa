import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../features/auth/store/auth.store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // FIX: Added class: 'h-full' to the host element
  host: { style: 'display: block', class: 'h-full' },
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-72 bg-white border-r-4 border-black h-full hidden md:block overflow-y-auto p-6">
      <nav class="space-y-4">
        @if (authStore.isStudent()) {
          <a routerLink="/student/dashboard" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/student/lessons" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">library_books</span>
            <span>Lessons</span>
          </a>
          <a routerLink="/student/milestones" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">emoji_events</span>
            <span>Achievements</span>
          </a>
          <a routerLink="/student/learning-path" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">route</span>
            <span>Learning Path</span>
          </a>
          <a routerLink="/student/payments" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">payments</span>
            <span>Payments</span>
          </a>
        }

        @if (authStore.isTeacher()) {
          <a routerLink="/teacher/dashboard" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">insights</span>
            <span>Analytics</span>
          </a>
          <a routerLink="/teacher/classes" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">groups</span>
            <span>Classes</span>
          </a>
          <a routerLink="/teacher/content" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">edit_document</span>
            <span>Content Editor</span>
          </a>
          <a routerLink="/teacher/quiz-builder" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">psychology</span>
            <span>Quiz Builder</span>
          </a>
        }

        @if (authStore.isAdmin()) {
          <a routerLink="/admin/dashboard" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/admin/user-management" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">manage_accounts</span>
            <span>User Management</span>
          </a>
          <a routerLink="/admin/platform-settings" routerLinkActive="bg-[#0ABAB5]/10 text-[#0ABAB5] border-[#0ABAB5]" class="flex items-center space-x-4 px-4 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 transition-all text-gray-500 font-bold text-lg">
            <span class="material-icons text-3xl">settings</span>
            <span>Platform Settings</span>
          </a>
        }
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  authStore = inject(AuthStore);
}