import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  avatarSeed?: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, BadgeComponent, AvatarComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Admin Dashboard</h1>
            <p class="text-gray-600 font-medium">Manage users and platform settings.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="primary" icon="person_add">Add User</app-button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="w-12 h-12 bg-[#0ABAB5]/10 rounded-xl border-2 border-black flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-[#0ABAB5]">people</span>
            </div>
            <p class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Total Users</p>
            <p class="text-3xl font-black text-black">1,248</p>
          </div>
        </app-card>
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="w-12 h-12 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-black">school</span>
            </div>
            <p class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Students</p>
            <p class="text-3xl font-black text-black">956</p>
          </div>
        </app-card>
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="w-12 h-12 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-black">local_library</span>
            </div>
            <p class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Teachers</p>
            <p class="text-3xl font-black text-black">84</p>
          </div>
        </app-card>
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="w-12 h-12 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-black">family_restroom</span>
            </div>
            <p class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Parents</p>
            <p class="text-3xl font-black text-black">208</p>
          </div>
        </app-card>
      </div>

      <!-- User Management Table -->
      <app-card class="block">
        <div class="p-6 border-b-4 border-black flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
              <span class="material-icons text-black">manage_accounts</span>
            </div>
            <h3 class="text-xl font-black text-black">User Management</h3>
          </div>
          
          <div class="flex space-x-2 w-full sm:w-auto">
            <div class="relative flex-1 sm:w-64">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input type="text" placeholder="Search users..." class="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] focus:bg-white transition-colors">
            </div>
            <app-button variant="secondary" icon="filter_list">Filter</app-button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b-4 border-black bg-gray-100">
                <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">User</th>
                <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Role</th>
                <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Status</th>
                <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr class="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors group">
                  <td class="p-4">
                    <div class="flex items-center space-x-3">
                      <app-avatar [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.avatarSeed" size="sm"></app-avatar>
                      <div>
                        <p class="font-bold text-black">{{ user.name }}</p>
                        <p class="text-xs text-gray-500 font-bold">{{ user.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <app-badge [variant]="getRoleBadgeVariant(user.role)">{{ user.role }}</app-badge>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center space-x-2">
                      <div class="w-2.5 h-2.5 rounded-full border border-black" 
                           [ngClass]="{
                             'bg-[#0ABAB5]': user.status === 'ACTIVE',
                             'bg-gray-400': user.status === 'INACTIVE',
                             'bg-yellow-400': user.status === 'PENDING'
                           }"></div>
                      <span class="font-bold text-sm text-gray-700">{{ user.status }}</span>
                    </div>
                  </td>
                  <td class="p-4 text-right">
                    <div class="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="w-8 h-8 rounded-lg border-2 border-black bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Edit">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="w-8 h-8 rounded-lg border-2 border-black bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]" title="Delete">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        
        <div class="p-4 border-t-4 border-black bg-gray-50 flex justify-between items-center rounded-b-2xl">
          <span class="text-sm font-bold text-gray-500">Showing 1 to 5 of 1,248 entries</span>
          <div class="flex space-x-2">
            <button class="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="material-icons text-sm">chevron_left</span>
            </button>
            <button class="w-8 h-8 rounded-lg border-2 border-black bg-[#0ABAB5] text-white flex items-center justify-center font-black">
              1
            </button>
            <button class="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100">
              2
            </button>
            <button class="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100">
              3
            </button>
            <button class="w-8 h-8 rounded-lg border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100">
              <span class="material-icons text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class UserManagementComponent {
  users = signal<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STUDENT', status: 'ACTIVE', avatarSeed: 'John' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'TEACHER', status: 'ACTIVE', avatarSeed: 'Jane' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', role: 'PARENT', status: 'ACTIVE', avatarSeed: 'Robert' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'STUDENT', status: 'PENDING', avatarSeed: 'Emily' },
    { id: '5', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN', status: 'ACTIVE', avatarSeed: 'Admin' },
  ]);

  getRoleBadgeVariant(role: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral' {
    switch (role) {
      case 'STUDENT': return 'secondary';
      case 'TEACHER': return 'primary';
      case 'PARENT': return 'warning';
      case 'ADMIN': return 'danger';
      default: return 'neutral';
    }
  }
}
