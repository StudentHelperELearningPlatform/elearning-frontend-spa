import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, ContactMessage, AdminUserRaw, AdminLessonRaw, AdminClassRaw } from '../../../core/services/admin.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED' | 'PENDING';
  avatarSeed?: string;
  raw: AdminUserRaw; // Dynamic inspection of all backend fields
}

interface AdminLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  author: string;
  status: 'PUBLISHED' | 'DRAFT';
}

interface AdminClass {
  id: string;
  name: string;
  teacher: string;
  studentsCount: number;
  subject: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent
  ],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      <!-- Top Header Panel -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-5">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span class="material-icons text-[#0ABAB5] text-3xl font-bold">admin_panel_settings</span>
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-black text-black tracking-tight">Admin Control Center</h1>
            <p class="text-gray-600 font-bold text-sm md:text-base mt-1">Platform-wide management and student assistance inbox.</p>
          </div>
        </div>
        
        <!-- Tab Navigation Menu -->
        <div class="flex flex-wrap gap-2 w-full lg:w-auto">
          <button 
            (click)="setActiveTab('overview')"
            [ngClass]="activeTab() === 'overview' ? 'bg-[#0ABAB5] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50 border-2 border-transparent'"
            class="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all text-sm">
            <span class="material-icons text-lg">dashboard</span>
            <span>Overview</span>
          </button>
          
          <button 
            (click)="setActiveTab('users')"
            [ngClass]="activeTab() === 'users' ? 'bg-[#0ABAB5] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50 border-2 border-transparent'"
            class="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all text-sm">
            <span class="material-icons text-lg">manage_accounts</span>
            <span>User Management</span>
          </button>

          <button 
            (click)="setActiveTab('content')"
            [ngClass]="activeTab() === 'content' ? 'bg-[#0ABAB5] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50 border-2 border-transparent'"
            class="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all text-sm">
            <span class="material-icons text-lg">auto_stories</span>
            <span>Lessons & Classes</span>
          </button>

          <button 
            (click)="setActiveTab('inbox')"
            [ngClass]="activeTab() === 'inbox' ? 'bg-[#0ABAB5] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50 border-2 border-transparent'"
            class="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-black font-black transition-all text-sm relative">
            <span class="material-icons text-lg">chat_bubble</span>
            <span>Contact Inbox</span>
            @if (unreadMessagesCount() > 0) {
              <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full border-2 border-black flex items-center justify-center font-black animate-pulse">
                {{ unreadMessagesCount() }}
              </span>
            }
          </button>
        </div>
      </div>

      <!-- Quick Summary Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Stat Card 1 -->
        <app-card class="block transform hover:-translate-y-1 transition-all duration-300">
          <div class="p-6 flex items-center space-x-4">
            <div class="w-14 h-14 bg-[#0ABAB5]/10 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-icons text-[#0ABAB5] text-2xl font-bold">gavel</span>
            </div>
            <div>
              <p class="text-gray-500 font-bold text-xs uppercase tracking-wider">Banned Users</p>
              <h3 class="text-3xl font-black text-black mt-0.5">{{ users().length }}</h3>
            </div>
          </div>
        </app-card>

        <!-- Stat Card 2 -->
        <app-card class="block transform hover:-translate-y-1 transition-all duration-300">
          <div class="p-6 flex items-center space-x-4">
            <div class="w-14 h-14 bg-indigo-100 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-icons text-indigo-600 text-2xl font-bold">menu_book</span>
            </div>
            <div>
              <p class="text-gray-500 font-bold text-xs uppercase tracking-wider">Active Lessons</p>
              <h3 class="text-3xl font-black text-black mt-0.5">{{ lessons().length }}</h3>
            </div>
          </div>
        </app-card>

        <!-- Stat Card 3 -->
        <app-card class="block transform hover:-translate-y-1 transition-all duration-300">
          <div class="p-6 flex items-center space-x-4">
            <div class="w-14 h-14 bg-yellow-100 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span class="material-icons text-yellow-600 text-2xl font-bold">groups</span>
            </div>
            <div>
              <p class="text-gray-500 font-bold text-xs uppercase tracking-wider">Total Classes</p>
              <h3 class="text-3xl font-black text-black mt-0.5">{{ classes().length }}</h3>
            </div>
          </div>
        </app-card>

        <!-- Stat Card 4 -->
        <app-card class="block transform hover:-translate-y-1 transition-all duration-300">
          <div class="p-6 flex items-center space-x-4">
            <div class="w-14 h-14 bg-red-100 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
              <span class="material-icons text-red-500 text-2xl font-bold">mark_as_unread</span>
            </div>
            <div>
              <p class="text-gray-500 font-bold text-xs uppercase tracking-wider">Unread Mail</p>
              <h3 class="text-3xl font-black text-black mt-0.5">{{ unreadMessagesCount() }}</h3>
            </div>
          </div>
        </app-card>
      </div>

      <!-- MAIN TAB CONTENT PANELS -->
      
      <!-- 1. OVERVIEW TAB -->
      @if (activeTab() === 'overview') {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Shortcuts & Quick Tools -->
          <div class="lg:col-span-1 space-y-6">
            <app-card class="block">
              <div class="p-6 border-b-4 border-black bg-gray-50">
                <h3 class="text-lg font-black text-black flex items-center space-x-2">
                  <span class="material-icons text-[#0ABAB5]">bolt</span>
                  <span>Quick Actions</span>
                </h3>
              </div>
              <div class="p-6 space-y-3">
                <button (click)="setActiveTab('users')" class="w-full text-left p-4 rounded-xl border-2 border-black bg-white hover:bg-gray-50 transition-all font-bold flex items-center justify-between group shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                  <div class="flex items-center space-x-3">
                    <span class="material-icons text-[#0ABAB5] group-hover:rotate-12 transition-transform">gavel</span>
                    <span>Review Banned Users</span>
                  </div>
                  <span class="material-icons">chevron_right</span>
                </button>
                <button (click)="setActiveTab('content')" class="w-full text-left p-4 rounded-xl border-2 border-black bg-white hover:bg-gray-50 transition-all font-bold flex items-center justify-between group shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                  <div class="flex items-center space-x-3">
                    <span class="material-icons text-indigo-500 group-hover:scale-11 transition-transform">delete_sweep</span>
                    <span>Clean Up Courses & Lessons</span>
                  </div>
                  <span class="material-icons">chevron_right</span>
                </button>
                <button (click)="setActiveTab('inbox')" class="w-full text-left p-4 rounded-xl border-2 border-black bg-white hover:bg-gray-50 transition-all font-bold flex items-center justify-between group shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                  <div class="flex items-center space-x-3">
                    <span class="material-icons text-red-500 group-hover:animate-bounce transition-transform">feedback</span>
                    <span>Support Desk Inbox</span>
                  </div>
                  <span class="material-icons">chevron_right</span>
                </button>
              </div>
            </app-card>

            <!-- System Info -->
            <app-card class="block">
              <div class="p-6 border-b-4 border-black bg-gray-50">
                <h3 class="text-lg font-black text-black flex items-center space-x-2">
                  <span class="material-icons text-indigo-500">dns</span>
                  <span>System Environment</span>
                </h3>
              </div>
              <div class="p-6 space-y-4">
                <div class="flex justify-between items-center text-sm font-bold">
                  <span class="text-gray-500">API Status</span>
                  <app-badge variant="success">ONLINE</app-badge>
                </div>
                <div class="flex justify-between items-center text-sm font-bold">
                  <span class="text-gray-500">Authentication</span>
                  <app-badge variant="primary">KEYCLOAK SECURED</app-badge>
                </div>
                <div class="flex justify-between items-center text-sm font-bold">
                  <span class="text-gray-500">DB Gateway</span>
                  <span class="text-black bg-gray-100 border border-black px-2 py-1 rounded text-xs">PostgreSQL Live Sync</span>
                </div>
              </div>
            </app-card>
          </div>

          <!-- Right Column: Recent Activity Feed & Messages Preview -->
          <div class="lg:col-span-2 space-y-6">
            <app-card class="block">
              <div class="p-6 border-b-4 border-black flex justify-between items-center bg-gray-50">
                <h3 class="text-xl font-black text-black flex items-center space-x-2">
                  <span class="material-icons text-red-500">mail</span>
                  <span>Recent Unread Support Tickets (S6-contact)</span>
                </h3>
                <app-button variant="secondary" size="sm" (click)="setActiveTab('inbox')">View All</app-button>
              </div>

              @if (inboxLoading()) {
                <div class="p-12 text-center">
                  <span class="material-icons animate-spin text-[#0ABAB5] text-3xl">sync</span>
                  <p class="text-gray-500 font-bold text-sm mt-2">Se încarcă mesajele din API...</p>
                </div>
              } @else if (inboxError()) {
                <div class="p-8 text-center bg-red-50 text-red-600 font-bold">
                  <span class="material-icons text-3xl">error_outline</span>
                  <p class="text-sm mt-1">Eroare încărcare mesaje: {{ inboxError() }}</p>
                </div>
              } @else if (unreadMessages().length === 0) {
                <div class="p-12 text-center">
                  <div class="w-16 h-16 bg-[#0ABAB5]/10 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
                    <span class="material-icons text-[#0ABAB5] text-3xl">done_all</span>
                  </div>
                  <h4 class="text-lg font-black text-black">Inbox Cleared!</h4>
                  <p class="text-gray-500 font-bold text-sm mt-1">There are no unread support messages in the inbox.</p>
                </div>
              } @else {
                <div class="divide-y-2 divide-gray-100">
                  @for (msg of unreadMessages().slice(0, 3); track msg.id) {
                    <div (click)="selectAndOpenMessage(msg)" (keydown.enter)="selectAndOpenMessage(msg)" role="button" tabindex="0" class="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 items-start">
                      <div class="w-10 h-10 rounded-xl border-2 border-black bg-red-100 flex items-center justify-center shrink-0">
                        <span class="material-icons text-red-500 text-sm">markunread</span>
                      </div>
                      <div class="flex-1 space-y-1.5 min-w-0">
                        <div class="flex justify-between items-start">
                          <span class="font-black text-black text-sm block truncate">{{ msg.senderName }}</span>
                          <span class="text-[10px] text-gray-400 font-bold ml-2">{{ msg.timestamp | date:'shortTime' }}</span>
                        </div>
                        <h4 class="font-extrabold text-black text-sm truncate">{{ msg.subject }}</h4>
                        <p class="text-xs text-gray-500 font-bold line-clamp-2">{{ msg.message }}</p>
                      </div>
                    </div>
                  }
                </div>
              }
            </app-card>

            <!-- Quick Stats Chart / Info Area -->
            <app-card class="block">
              <div class="p-6 border-b-4 border-black bg-gray-50">
                <h3 class="text-xl font-black text-black flex items-center space-x-2">
                  <span class="material-icons text-[#0ABAB5]">trending_up</span>
                  <span>User Distribution Insights</span>
                </h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div class="p-4 bg-gray-50 border-2 border-black rounded-2xl">
                    <span class="font-black text-[#0ABAB5] text-2xl">72%</span>
                    <p class="text-xs text-gray-500 font-bold mt-1">Students</p>
                  </div>
                  <div class="p-4 bg-gray-50 border-2 border-black rounded-2xl">
                    <span class="font-black text-indigo-500 text-2xl">12%</span>
                    <p class="text-xs text-gray-500 font-bold mt-1">Teachers</p>
                  </div>
                  <div class="p-4 bg-gray-50 border-2 border-black rounded-2xl">
                    <span class="font-black text-yellow-500 text-2xl">14%</span>
                    <p class="text-xs text-gray-500 font-bold mt-1">Parents</p>
                  </div>
                  <div class="p-4 bg-gray-50 border-2 border-black rounded-2xl">
                    <span class="font-black text-red-500 text-2xl">2%</span>
                    <p class="text-xs text-gray-500 font-bold mt-1">Admins</p>
                  </div>
                </div>
              </div>
            </app-card>
          </div>
        </div>
      }

      <!-- 2. USER CONTROLLER TAB -->
      @if (activeTab() === 'users') {
        <app-card class="block animate-fadeIn">
          <div class="p-6 border-b-4 border-black flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-[#0ABAB5]/10 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span class="material-icons text-[#0ABAB5] font-bold">manage_accounts</span>
              </div>
              <div>
                <h3 class="text-xl font-black text-black">User Registry & Administration</h3>
                <p class="text-xs text-gray-500 font-bold">Live database inspection and management of platform accounts. No mocked properties.</p>
              </div>
            </div>
            
            <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <!-- Status Filter Selectors -->
              <div class="flex bg-white border-2 border-black rounded-xl p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button 
                  (click)="statusFilter.set('ALL')"
                  [ngClass]="statusFilter() === 'ALL' ? 'bg-[#0ABAB5] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50'"
                  class="px-3 py-1.5 rounded-lg text-xs font-black transition-all border border-transparent select-none">
                  All
                </button>
                <button 
                  (click)="statusFilter.set('ACTIVE')"
                  [ngClass]="statusFilter() === 'ACTIVE' ? 'bg-[#0ABAB5] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50'"
                  class="px-3 py-1.5 rounded-lg text-xs font-black transition-all border border-transparent select-none">
                  Active
                </button>
                <button 
                  (click)="statusFilter.set('BANNED')"
                  [ngClass]="statusFilter() === 'BANNED' ? 'bg-[#0ABAB5] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-50'"
                  class="px-3 py-1.5 rounded-lg text-xs font-black transition-all border border-transparent select-none">
                  Banned
                </button>
              </div>

              <div class="relative flex-1 md:w-72">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                  type="text" 
                  [value]="userSearchQuery()"
                  (input)="updateUserSearch($event)"
                  placeholder="Search by name or email..." 
                  class="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] transition-all text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-none">
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b-4 border-black bg-gray-100">
                  <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">User Profile Details</th>
                  <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Live Database Entity Properties</th>
                  <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Security Status</th>
                  <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs text-right">Administrative Options</th>
                </tr>
              </thead>
              <tbody class="divide-y-2 divide-gray-100 bg-white">
                @if (usersLoading()) {
                  <tr>
                    <td colspan="4" class="p-12 text-center font-bold text-gray-500">
                      <div class="flex flex-col items-center justify-center space-y-3">
                        <span class="material-icons animate-spin text-[#0ABAB5] text-3xl">sync</span>
                        <span>Se încarcă lista de utilizatori din API...</span>
                      </div>
                    </td>
                  </tr>
                } @else if (usersError()) {
                  <tr>
                    <td colspan="4" class="p-12 text-center bg-red-50 border-y-2 border-red-200">
                      <div class="flex flex-col items-center justify-center space-y-2 text-red-600">
                        <span class="material-icons text-4xl">error_outline</span>
                        <h4 class="font-black text-lg">Eroare de conexiune API!</h4>
                        <p class="text-sm font-bold max-w-lg">
                          Endpoint-urile de administrare utilizatori au returnat o eroare:
                        </p>
                        <p class="text-xs bg-white border border-red-200 px-3 py-1.5 rounded-lg font-mono font-bold max-w-xl">
                          {{ usersError() }}
                        </p>
                        <p class="text-xs text-gray-500 font-bold mt-2">
                          Verifică dacă serviciul de backend este pornit și ruta este implementată corect în API Gateway.
                        </p>
                        <button (click)="loadUsers()" class="mt-2 px-4 py-1.5 bg-red-600 text-white rounded-lg border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                          Reîncearcă Apelul API
                        </button>
                      </div>
                    </td>
                  </tr>
                } @else if (filteredUsers().length === 0) {
                  <tr>
                    <td colspan="4" class="p-12 text-center font-bold text-gray-500">
                      <div class="flex flex-col items-center justify-center space-y-2">
                        <span class="material-icons text-3xl text-[#0ABAB5] font-bold">check_circle_outline</span>
                        <h4 class="font-black text-black">Conexiune Reușită (200 OK)</h4>
                        <p class="text-sm text-gray-400 font-bold">Nu s-a găsit niciun utilizator care să corespundă criteriilor selectate.</p>
                      </div>
                    </td>
                  </tr>
                } @else {
                  @for (user of filteredUsers(); track user.id) {
                    <tr class="hover:bg-gray-50 transition-colors group align-top">
                      <!-- User Info -->
                      <td class="p-4 w-1/4">
                        <div class="flex items-start space-x-3">
                          <app-avatar [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.avatarSeed" size="md" class="border border-black shrink-0"></app-avatar>
                          <div class="min-w-0">
                            <p class="font-extrabold text-black text-sm truncate">{{ user.name }}</p>
                            <p class="text-xs text-gray-400 font-bold truncate mt-0.5">{{ user.email }}</p>
                            <span class="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-black border border-black rounded text-[10px] font-black uppercase">
                              ROLE: {{ user.role }}
                            </span>
                          </div>
                        </div>
                      </td>

                      <!-- Raw Live Fields Inspection -->
                      <td class="p-4 w-2/5">
                        <div class="text-[11px] font-mono bg-gray-50 border-2 border-black rounded-xl p-3 space-y-1 max-h-40 overflow-y-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <div class="text-[10px] uppercase font-black tracking-wider text-gray-400 border-b border-gray-200 pb-1 mb-1.5 flex justify-between items-center">
                            <span>Raw Postgres Record</span>
                            <span class="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">UUID Auto-Detected</span>
                          </div>
                          @for (entry of getObjectEntries(user.raw); track entry.key) {
                            <div class="flex justify-between items-start gap-4 py-0.5 border-b border-gray-100 last:border-0"
                                 [ngClass]="{'bg-[#0ABAB5]/10 font-bold px-1 rounded': entry.value === user.id}">
                              <span class="text-gray-500 font-bold shrink-0">{{ entry.key }}:</span>
                              <span class="text-black font-extrabold break-all text-right select-all">
                                {{ entry.value }}
                                @if (entry.value === user.id) {
                                  <span class="text-[8px] bg-[#0ABAB5] text-white px-1 py-0.2 rounded ml-1">TARGET KEY</span>
                                }
                              </span>
                            </div>
                          }
                        </div>
                      </td>

                      <!-- Security Status -->
                      <td class="p-4 w-1/6">
                        <div class="flex items-center space-x-2">
                          @if (user.status === 'ACTIVE') {
                            <app-badge variant="success">Active Access</app-badge>
                          } @else if (user.status === 'BANNED') {
                            <app-badge variant="danger">Banned Account</app-badge>
                          } @else {
                            <app-badge variant="warning">Pending</app-badge>
                          }
                        </div>
                      </td>

                      <!-- Action Buttons -->
                      <td class="p-4 text-right w-1/6">
                        <div class="flex justify-end items-center space-x-2.5">
                          @if (user.role !== 'ADMIN') {
                            @if (user.status === 'BANNED') {
                              <!-- Restore (Unban) -->
                              <button 
                                (click)="unbanUser(user)"
                                class="flex items-center space-x-1 px-3 py-1.5 rounded-lg border-2 border-black bg-[#0ABAB5] text-white font-black text-xs hover:bg-[#0ABAB5]/90 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Restore Account Access">
                                <span class="material-icons text-sm">lock_open</span>
                                <span>Unban</span>
                              </button>
                            } @else {
                              <!-- Ban User -->
                              <button 
                                (click)="banUser(user.id)"
                                class="flex items-center space-x-1 px-3 py-1.5 rounded-lg border-2 border-black bg-red-500 text-white font-black text-xs hover:bg-red-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Ban Account Access">
                                <span class="material-icons text-sm">gavel</span>
                                <span>Ban</span>
                              </button>
                            }
                            
                            <!-- Delete User -->
                            <button 
                              (click)="deleteUser(user.id)"
                              class="w-8 h-8 rounded-lg border-2 border-black bg-white text-gray-500 flex items-center justify-center hover:bg-red-100 hover:text-red-600 hover:border-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Permanently Delete Account">
                                <span class="material-icons text-sm">delete</span>
                            </button>
                          } @else {
                            <span class="text-xs text-gray-400 font-bold italic pr-2">Protected System Profile</span>
                          }
                        </div>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </app-card>
      }

      <!-- 3. CONTENT CONTROLLER TAB -->
      @if (activeTab() === 'content') {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
          
          <!-- Lessons Card Panel -->
          <app-card class="block">
            <div class="p-6 border-b-4 border-black flex justify-between items-center bg-gray-50">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-indigo-50 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span class="material-icons text-indigo-600 font-bold">book</span>
                </div>
                <div>
                  <h3 class="text-xl font-black text-black">Active Curriculum Lessons</h3>
                  <p class="text-xs text-gray-500 font-bold">Oversee and delete instructional units.</p>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Lesson Title</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Curriculum</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs text-right">Delete Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y-2 divide-gray-100">
                  @if (lessonsLoading()) {
                    <tr>
                      <td colspan="3" class="p-12 text-center font-bold text-gray-500 bg-white">
                        <span class="material-icons animate-spin text-indigo-600 text-3xl">sync</span>
                        <p class="text-sm mt-2">Se încarcă lecțiile din API...</p>
                      </td>
                    </tr>
                  } @else if (lessonsError()) {
                    <tr>
                      <td colspan="3" class="p-8 text-center bg-red-50 text-red-600 font-bold">
                        <span class="material-icons text-3xl">error_outline</span>
                        <p class="text-sm mt-1">Eroare API la lecții: {{ lessonsError() }}</p>
                        <button (click)="loadLessons()" class="mt-2 px-3 py-1 bg-red-600 text-white rounded border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all">Reîncearcă</button>
                      </td>
                    </tr>
                  } @else if (lessons().length === 0) {
                    <tr>
                      <td colspan="3" class="p-12 text-center font-bold text-gray-500 bg-white">
                        <div class="flex flex-col items-center justify-center space-y-2">
                          <span class="material-icons text-3xl text-gray-400">check_circle_outline</span>
                          <h4 class="font-black text-black">Conexiune Reușită (200 OK)</h4>
                          <p class="text-sm text-gray-400 font-bold">Nu există lecții create în baza de date.</p>
                        </div>
                      </td>
                    </tr>
                  } @else {
                    @for (lesson of lessons(); track lesson.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="p-4">
                          <div class="space-y-0.5">
                            <span class="font-extrabold text-black text-sm block">{{ lesson.title }}</span>
                            <span class="text-[10px] text-gray-400 font-bold uppercase">Author: {{ lesson.author }}</span>
                          </div>
                        </td>
                        <td class="p-4">
                          <div class="flex flex-wrap gap-1">
                            <span class="px-2 py-0.5 bg-gray-100 text-black border border-black rounded text-[10px] font-black uppercase">
                              {{ lesson.subject }}
                            </span>
                            <span class="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-[10px] font-black">
                              Grade {{ lesson.grade }}
                            </span>
                          </div>
                        </td>
                        <td class="p-4 text-right">
                          <button 
                            (click)="deleteLesson(lesson.id)"
                            class="w-8 h-8 rounded-lg border-2 border-black bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Delete Lesson">
                            <span class="material-icons text-sm">delete_forever</span>
                          </button>
                        </td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </app-card>

          <!-- Classes Card Panel -->
          <app-card class="block">
            <div class="p-6 border-b-4 border-black flex justify-between items-center bg-gray-50">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-yellow-50 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span class="material-icons text-yellow-600 font-bold">groups</span>
                </div>
                <div>
                  <h3 class="text-xl font-black text-black">Active Virtual Classrooms</h3>
                  <p class="text-xs text-gray-500 font-bold">Oversee and delete student cohorts.</p>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Cohort</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs">Primary Teacher</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-xs text-right">Delete Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y-2 divide-gray-100">
                  @if (classesLoading()) {
                    <tr>
                      <td colspan="3" class="p-12 text-center font-bold text-gray-500 bg-white">
                        <span class="material-icons animate-spin text-yellow-600 text-3xl">sync</span>
                        <p class="text-sm mt-2">Se încarcă clasele din API...</p>
                      </td>
                    </tr>
                  } @else if (classesError()) {
                    <tr>
                      <td colspan="3" class="p-8 text-center bg-red-50 text-red-600 font-bold">
                        <span class="material-icons text-3xl">error_outline</span>
                        <p class="text-sm mt-1">Eroare API la clase: {{ classesError() }}</p>
                        <button (click)="loadClasses()" class="mt-2 px-3 py-1 bg-red-600 text-white rounded border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all">Reîncearcă</button>
                      </td>
                    </tr>
                  } @else if (classes().length === 0) {
                    <tr>
                      <td colspan="3" class="p-12 text-center font-bold text-gray-500 bg-white">
                        <div class="flex flex-col items-center justify-center space-y-2">
                          <span class="material-icons text-3xl text-gray-400">check_circle_outline</span>
                          <h4 class="font-black text-black">Conexiune Reușită (200 OK)</h4>
                          <p class="text-sm text-gray-400 font-bold">Nu există nicio clasă creată în baza de date.</p>
                        </div>
                      </td>
                    </tr>
                  } @else {
                    @for (cls of classes(); track cls.id) {
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="p-4">
                          <div class="space-y-0.5">
                            <span class="font-extrabold text-black text-sm block">{{ cls.name }}</span>
                            <span class="text-[10px] text-gray-400 font-bold uppercase">{{ cls.subject }}</span>
                          </div>
                        </td>
                        <td class="p-4">
                          <div class="flex flex-col space-y-0.5">
                            <span class="font-bold text-black text-xs">{{ cls.teacher }}</span>
                            <span class="text-[9px] text-gray-400 font-bold">{{ cls.studentsCount }} Students</span>
                          </div>
                        </td>
                        <td class="p-4 text-right">
                          <button 
                            (click)="deleteClass(cls.id)"
                            class="w-8 h-8 rounded-lg border-2 border-black bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Delete Class">
                            <span class="material-icons text-sm">delete_forever</span>
                          </button>
                        </td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </app-card>
        </div>
      }

      <!-- 4. CONTACT INBOX TAB (S6-contact) -->
      @if (activeTab() === 'inbox') {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          
          <!-- Messages List Pane (Left) -->
          <app-card class="lg:col-span-1 block h-[600px] flex flex-col overflow-hidden">
            <div class="p-4 border-b-4 border-black bg-gray-50 shrink-0">
              <h3 class="text-lg font-black text-black flex items-center space-x-2">
                <span class="material-icons text-red-500">inbox</span>
                <span>Contact Messages</span>
              </h3>
            </div>
            
            <div class="flex-1 overflow-y-auto divide-y-2 divide-gray-100 bg-white">
              @if (inboxLoading()) {
                <div class="p-12 text-center h-full flex flex-col justify-center items-center">
                  <span class="material-icons animate-spin text-[#0ABAB5] text-3xl">sync</span>
                  <p class="text-xs text-gray-400 font-bold mt-2">Se încarcă mesageria...</p>
                </div>
              } @else if (inboxError()) {
                <div class="p-8 text-center bg-red-50 text-red-600 font-bold h-full flex flex-col justify-center items-center">
                  <span class="material-icons text-3xl">error_outline</span>
                  <p class="text-xs mt-2">Eroare Inbox: {{ inboxError() }}</p>
                  <button (click)="loadContactMessages()" class="mt-2 px-3 py-1 bg-red-600 text-white rounded border-2 border-black font-black text-[9px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Reîncearcă</button>
                </div>
              } @else if (contactMessages().length === 0) {
                <div class="p-12 text-center h-full flex flex-col justify-center items-center">
                  <div class="w-14 h-14 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mb-4">
                    <span class="material-icons text-gray-400 text-2xl">mail_outline</span>
                  </div>
                  <h4 class="font-black text-black">Inbox Empty</h4>
                  <p class="text-xs text-gray-400 font-bold mt-1">Conexiune Reușită (200 OK) - Nu există mesaje.</p>
                </div>
              } @else {
                @for (msg of contactMessages(); track msg.id) {
                  <div 
                    (click)="selectMessage(msg)"
                    (keydown.enter)="selectMessage(msg)"
                    role="button"
                    tabindex="0"
                    [ngClass]="{
                      'bg-[#0ABAB5]/5 border-l-4 border-l-[#0ABAB5]': selectedMessage()?.id === msg.id,
                      'bg-white': selectedMessage()?.id !== msg.id,
                      'font-extrabold': !msg.read
                    }"
                    class="p-4 hover:bg-gray-50 transition-all cursor-pointer flex gap-3 items-start relative select-none">
                    
                    <!-- Unread Bullet -->
                    @if (!msg.read) {
                      <div class="w-2.5 h-2.5 bg-red-500 border border-black rounded-full absolute top-5 left-2 shrink-0"></div>
                    }
                    
                    <div class="flex-1 min-w-0 pl-2">
                      <div class="flex justify-between items-center">
                        <span class="text-xs font-black text-black truncate pr-2">{{ msg.senderName }}</span>
                        <span class="text-[9px] text-gray-400 font-bold shrink-0">{{ msg.timestamp | date:'MMM d' }}</span>
                      </div>
                      <h4 class="text-xs font-extrabold text-gray-800 truncate mt-1">{{ msg.subject }}</h4>
                      <p class="text-[11px] text-gray-500 font-medium line-clamp-2 mt-0.5">{{ msg.message }}</p>
                    </div>
                  </div>
                }
              }
            </div>
          </app-card>

          <!-- Selected Message Detail Pane (Right) -->
          <app-card class="lg:col-span-2 block h-[600px] flex flex-col overflow-hidden bg-white">
            @if (selectedMessage(); as msg) {
              <!-- Detail Header -->
              <div class="p-6 border-b-4 border-black bg-gray-50 shrink-0 flex justify-between items-start md:items-center gap-4">
                <div class="flex items-center space-x-3.5 min-w-0">
                  <app-avatar [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + msg.senderEmail" size="md" class="border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"></app-avatar>
                  <div class="min-w-0">
                    <h3 class="text-base font-black text-black truncate">{{ msg.senderName }}</h3>
                    <p class="text-xs text-gray-500 font-bold truncate mt-0.5">{{ msg.senderEmail }}</p>
                  </div>
                </div>

                <!-- Inbox Header Toolbar Controls -->
                <div class="flex space-x-2 shrink-0">
                  <button 
                    (click)="toggleMessageRead(msg)"
                    class="w-9 h-9 rounded-lg border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" 
                    [title]="msg.read ? 'Mark as Unread' : 'Mark as Read'">
                    <span class="material-icons text-sm text-gray-700">
                      {{ msg.read ? 'mark_as_unread' : 'mark_chat_read' }}
                    </span>
                  </button>
                  <button 
                    (click)="deleteMessage(msg.id)"
                    class="w-9 h-9 rounded-lg border-2 border-black bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" 
                    title="Delete Message">
                    <span class="material-icons text-sm">delete</span>
                  </button>
                </div>
              </div>

              <!-- Message Body -->
              <div class="flex-1 p-6 overflow-y-auto space-y-6">
                <!-- Meta -->
                <div class="p-4 bg-gray-50 border-2 border-black rounded-2xl space-y-2">
                  <div class="flex justify-between items-center text-xs font-bold">
                    <span class="text-gray-500 uppercase tracking-wider">Subject Title</span>
                    <span class="text-gray-400">{{ msg.timestamp | date:'EEEE, MMM d, y, h:mm a' }}</span>
                  </div>
                  <h2 class="text-base md:text-lg font-black text-black tracking-tight leading-tight">{{ msg.subject }}</h2>
                </div>

                <!-- Content Text -->
                <div class="prose max-w-none text-black font-medium leading-relaxed bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-pre-wrap">
                  {{ msg.message }}
                </div>
              </div>

              <!-- Quick Reply Box -->
              <div class="p-4 border-t-4 border-black bg-gray-50 shrink-0">
                <div class="flex gap-3">
                  <input type="text" placeholder="Type a supportive response to sender..." class="flex-1 px-4 py-2.5 bg-white border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-none">
                  <app-button variant="primary" icon="send" size="md" (click)="simulateReply()">Reply</app-button>
                </div>
              </div>
            } @else {
              <!-- Unselected State -->
              <div class="flex-1 flex flex-col justify-center items-center p-12 text-center">
                <div class="w-16 h-16 bg-[#0ABAB5]/10 rounded-full border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span class="material-icons text-[#0ABAB5] text-3xl font-bold">mail</span>
                </div>
                <h4 class="text-lg font-black text-black">Support Desk Inbox</h4>
                <p class="text-gray-500 font-bold text-sm max-w-sm mt-1">
                  Select a message from the contact queue to read details, reply, or archive.
                </p>
              </div>
            }
          </app-card>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly notificationService = inject(NotificationService);

  activeTab = signal<'overview' | 'users' | 'content' | 'inbox'>('overview');
  userSearchQuery = signal<string>('');
  statusFilter = signal<'ALL' | 'ACTIVE' | 'BANNED'>('ALL');
  
  // Data lists
  users = signal<AdminUser[]>([]);
  lessons = signal<AdminLesson[]>([]);
  classes = signal<AdminClass[]>([]);
  contactMessages = signal<ContactMessage[]>([]);
  selectedMessage = signal<ContactMessage | null>(null);

  // States
  usersLoading = signal<boolean>(false);
  lessonsLoading = signal<boolean>(false);
  classesLoading = signal<boolean>(false);
  inboxLoading = signal<boolean>(false);

  usersError = signal<string | null>(null);
  lessonsError = signal<string | null>(null);
  classesError = signal<string | null>(null);
  inboxError = signal<string | null>(null);

  // Computeds
  unreadMessagesCount = computed(() => 
    this.contactMessages().filter(m => !m.read).length
  );

  unreadMessages = computed(() => 
    this.contactMessages().filter(m => !m.read)
  );

  filteredUsers = computed(() => {
    const query = this.userSearchQuery().trim().toLowerCase();
    const filter = this.statusFilter();
    let list = this.users();

    if (filter === 'ACTIVE') {
      list = list.filter(u => u.status === 'ACTIVE');
    } else if (filter === 'BANNED') {
      list = list.filter(u => u.status === 'BANNED');
    }

    if (!query) return list;
    return list.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    this.loadUsers();
    this.loadLessons();
    this.loadClasses();
    this.loadContactMessages();
  }

  setActiveTab(tab: 'overview' | 'users' | 'content' | 'inbox') {
    this.activeTab.set(tab);
  }

  updateUserSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.userSearchQuery.set(value);
  }

  getObjectEntries(obj: Record<string, unknown> | null | undefined): { key: string; value: string | number | boolean | null | undefined }[] {
    if (!obj) return [];
    return Object.entries(obj)
      .filter(([key]) => key !== 'raw' && key !== 'avatarSeed')
      .map(([key, value]) => ({
        key,
        value: typeof value === 'object' && value !== null ? JSON.stringify(value) : (value as string | number | boolean | null | undefined)
      }));
  }

  // Loaders calling actual service HTTP endpoints
  loadUsers() {
    this.usersLoading.set(true);
    this.usersError.set(null);
    
    // Fetch live banned users list first (GET /api/v1/admin/users/banned)
    this.adminService.getBannedUsers().subscribe({
      next: (bannedData) => {
        const bannedList = bannedData || [];
        const bannedIds = new Set<string>();
        
        bannedList.forEach((u: AdminUserRaw) => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          const extractorKeys: (keyof AdminUserRaw)[] = ['userId', 'keycloakId', 'sub', 'targetUserId', 'id'];
          const detectedUuid = extractorKeys
            .map((key) => u[key])
            .find((val): val is string => typeof val === 'string' && uuidRegex.test(val)) ?? '';
          
          const finalId = detectedUuid || u.userId || u.id || '';
          if (finalId) bannedIds.add(finalId);
        });

        // Fetch all users list (GET /api/v1/users)
        this.adminService.getUsers().subscribe({
          next: (allUsersData) => {
            const mappedUsersList = (allUsersData || []).map((u: AdminUserRaw) => {
              const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
              const extractorKeys: (keyof AdminUserRaw)[] = ['userId', 'keycloakId', 'sub', 'targetUserId', 'id'];
              let detectedUuid = extractorKeys
                .map((key) => u[key])
                .find((val): val is string => typeof val === 'string' && uuidRegex.test(val)) ?? '';
              
              if (!detectedUuid) {
                const allKeys = Object.keys(u) as (keyof AdminUserRaw)[];
                detectedUuid = allKeys
                  .map((key) => u[key])
                  .find((val): val is string => typeof val === 'string' && uuidRegex.test(val)) ?? '';
              }
              const finalId = detectedUuid || u.userId || u.id || '';
              const isBanned = bannedIds.has(finalId) || u.status === 'BANNED' || u.banned === true;
              const userName = u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || u.email || 'User';

              return {
                id: finalId,
                name: userName,
                email: u.email || '',
                role: (u.role || 'STUDENT').toUpperCase() as 'STUDENT' | 'TEACHER' | 'ADMIN',
                status: (isBanned ? 'BANNED' : 'ACTIVE') as 'ACTIVE' | 'BANNED' | 'PENDING',
                avatarSeed: u.email || finalId || 'User',
                raw: u
              };
            });

            this.users.set(mappedUsersList);
            this.usersLoading.set(false);
          },
          error: (err) => {
            console.warn('GET /users failed (backend team might still be working on it), falling back to banned users list:', err);
            // Fallback to displaying banned users only
            const mappedBanned = bannedList.map((u: AdminUserRaw) => {
              const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
              const extractorKeys: (keyof AdminUserRaw)[] = ['userId', 'keycloakId', 'sub', 'targetUserId', 'id'];
              const detectedUuid = extractorKeys
                .map((key) => u[key])
                .find((val): val is string => typeof val === 'string' && uuidRegex.test(val)) ?? '';
              
              const finalId = detectedUuid || u.userId || u.id || '';
              const userName = u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || u.email || 'Banned User';
              
              return {
                id: finalId,
                name: userName,
                email: u.email || '',
                role: (u.role || 'STUDENT').toUpperCase() as 'STUDENT' | 'TEACHER' | 'ADMIN',
                status: 'BANNED' as const,
                avatarSeed: u.email || finalId || 'Banned',
                raw: u
              };
            });

            this.users.set(mappedBanned);
            this.usersLoading.set(false);
          }
        });
      },
      error: (err) => {
        this.users.set([]);
        const errorMsg = err.error?.message || err.message || err.statusText || 'Connection failed';
        this.usersError.set(errorMsg);
        this.usersLoading.set(false);
        this.notificationService.error(`API Error loading banned users: ${errorMsg}`);
      }
    });
  }

  loadLessons() {
    this.lessonsLoading.set(true);
    this.lessonsError.set(null);
    this.adminService.getLessons().subscribe({
      next: (data) => {
        const mappedLessons = (data || []).map((l: AdminLessonRaw) => ({
          id: l.id || '',
          title: l.title || 'Untitled Lesson',
          subject: l.subject || 'General',
          grade: l.grade || 10,
          author: l.author || l.teacherName || 'Unknown Teacher',
          status: (l.status || 'PUBLISHED').toUpperCase() as 'PUBLISHED' | 'DRAFT'
        }));
        this.lessons.set(mappedLessons);
        this.lessonsLoading.set(false);
      },
      error: (err) => {
        this.lessons.set([]);
        const errorMsg = err.error?.message || err.message || err.statusText || 'Connection failed';
        this.lessonsError.set(errorMsg);
        this.lessonsLoading.set(false);
        this.notificationService.error(`API Error: Cannot load Lessons list (${errorMsg})`);
      }
    });
  }

  loadClasses() {
    this.classesLoading.set(true);
    this.classesError.set(null);
    this.adminService.getClasses().subscribe({
      next: (data) => {
        const mappedClasses = (data || []).map((c: AdminClassRaw) => ({
          id: c.id || '',
          name: c.name || 'Unnamed Class',
          teacher: c.teacher || c.teacherName || 'Unknown Teacher',
          studentsCount: c.studentsCount || c.studentCount || 0,
          subject: c.subject || 'General'
        }));
        this.classes.set(mappedClasses);
        this.classesLoading.set(false);
      },
      error: (err) => {
        this.classes.set([]);
        const errorMsg = err.error?.message || err.message || err.statusText || 'Connection failed';
        this.classesError.set(errorMsg);
        this.classesLoading.set(false);
        this.notificationService.error(`API Error: Cannot load Classes list (${errorMsg})`);
      }
    });
  }

  loadContactMessages() {
    this.inboxLoading.set(true);
    this.inboxError.set(null);
    this.adminService.getContactMessages().subscribe({
      next: (messages) => {
        const mappedMessages = (messages || []).map((m: ContactMessage) => ({
          id: m.id || '',
          senderName: m.senderName || 'Anonymous',
          senderEmail: m.senderEmail || '',
          subject: m.subject || 'No Subject',
          message: m.message || '',
          timestamp: m.timestamp || new Date().toISOString(),
          read: !!m.read
        }));
        this.contactMessages.set(mappedMessages);
        this.inboxLoading.set(false);
      },
      error: (err) => {
        this.contactMessages.set([]);
        const errorMsg = err.error?.message || err.message || err.statusText || 'Connection failed';
        this.inboxError.set(errorMsg);
        this.inboxLoading.set(false);
        this.notificationService.error(`API Error: Cannot load Support Inbox (${errorMsg})`);
      }
    });
  }

  // Administrative Actions
  banUser(userId: string) {
    if (confirm('Are you sure you want to ban this user? They will lose access to the platform.')) {
      this.adminService.banUser(userId).subscribe({
        next: () => {
          this.notificationService.success('User has been banned.');
          this.loadUsers(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'API Error';
          this.notificationService.error(`Failed to ban user: ${errorMsg}`);
        }
      });
    }
  }

  unbanUser(user: AdminUser) {
    const targetId = user.id;
    if (!targetId) {
      this.notificationService.error('Cannot unban: No valid target User ID could be extracted from database entity.');
      console.error('Banned user entity missing keys:', user.raw);
      return;
    }

    if (confirm(`Are you sure you want to restore access for user: ${user.name}? (ID: ${targetId})`)) {
      this.adminService.unbanUser(targetId).subscribe({
        next: () => {
          this.notificationService.success(`User access has been restored for ${user.name}.`);
          this.loadUsers(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || err.statusText || 'Unknown Server Error';
          const fullErrDetails = `HTTP status: ${err.status} - ${errorMsg}`;
          this.notificationService.error(`Failed to restore user: ${fullErrDetails}`);
          console.error('Unban API request failed details:', err);
        }
      });
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.notificationService.success('User account permanently deleted.');
          this.loadUsers(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'API Error';
          this.notificationService.error(`Failed to delete user: ${errorMsg}`);
        }
      });
    }
  }

  deleteLesson(lessonId: string) {
    if (confirm('Are you sure you want to permanently delete this lesson? This will remove it from all curriculums.')) {
      this.adminService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.notificationService.success('Lesson deleted successfully.');
          this.loadLessons(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'API Error';
          this.notificationService.error(`Failed to delete lesson: ${errorMsg}`);
        }
      });
    }
  }

  deleteClass(classId: string) {
    if (confirm('Are you sure you want to permanently delete this virtual class cohort?')) {
      this.adminService.deleteClass(classId).subscribe({
        next: () => {
          this.notificationService.success('Virtual class deleted successfully.');
          this.loadClasses(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'API Error';
          this.notificationService.error(`Failed to delete class: ${errorMsg}`);
        }
      });
    }
  }

  // Inbox & Support Actions
  selectMessage(message: ContactMessage) {
    this.selectedMessage.set(message);
    if (!message.read) {
      this.markMessageReadState(message.id, true);
    }
  }

  selectAndOpenMessage(message: ContactMessage) {
    this.setActiveTab('inbox');
    this.selectMessage(message);
  }

  toggleMessageRead(message: ContactMessage) {
    this.markMessageReadState(message.id, !message.read);
  }

  markMessageReadState(messageId: string, readState: boolean) {
    this.adminService.markContactMessageRead(messageId, readState).subscribe({
      next: () => {
        // Sync selected message state
        const currentSelected = this.selectedMessage();
        if (currentSelected?.id === messageId) {
          this.selectedMessage.set({ ...currentSelected, read: readState });
        }
        this.loadContactMessages(); // Refresh actual database state
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.message || 'API Error';
        this.notificationService.error(`Failed to update message status: ${errorMsg}`);
      }
    });
  }

  deleteMessage(messageId: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.adminService.deleteContactMessage(messageId).subscribe({
        next: () => {
          if (this.selectedMessage()?.id === messageId) {
            this.selectedMessage.set(null);
          }
          this.notificationService.success('Message deleted successfully.');
          this.loadContactMessages(); // Refresh actual database state
        },
        error: (err) => {
          const errorMsg = err.error?.message || err.message || 'API Error';
          this.notificationService.error(`Failed to delete message: ${errorMsg}`);
        }
      });
    }
  }

  simulateReply() {
    this.notificationService.success('Reply sent successfully! (Simulated)');
  }
}
