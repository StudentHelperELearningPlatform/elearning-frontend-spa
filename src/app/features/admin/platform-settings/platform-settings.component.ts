import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-platform-settings',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">settings</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Platform Settings</h1>
            <p class="text-gray-600 font-medium">Configure global application preferences.</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="primary" icon="save">Save Changes</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sidebar Navigation -->
        <div class="md:col-span-1 space-y-2">
          <button class="w-full text-left px-6 py-4 rounded-2xl border-4 border-black bg-[#0ABAB5] text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="material-icons">tune</span>
              <span>General</span>
            </div>
            <span class="material-icons">chevron_right</span>
          </button>
          
          <button class="w-full text-left px-6 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 text-gray-600 font-bold transition-all flex items-center space-x-3">
            <span class="material-icons">security</span>
            <span>Security</span>
          </button>
          
          <button class="w-full text-left px-6 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 text-gray-600 font-bold transition-all flex items-center space-x-3">
            <span class="material-icons">notifications</span>
            <span>Notifications</span>
          </button>
          
          <button class="w-full text-left px-6 py-4 rounded-2xl border-2 border-transparent hover:border-black hover:bg-gray-50 text-gray-600 font-bold transition-all flex items-center space-x-3">
            <span class="material-icons">palette</span>
            <span>Appearance</span>
          </button>
        </div>

        <!-- Settings Content -->
        <div class="md:col-span-2 space-y-8">
          <app-card class="block">
            <div class="p-6 border-b-4 border-black">
              <h3 class="text-xl font-black text-black">General Settings</h3>
              <p class="text-gray-500 font-bold text-sm mt-1">Basic configuration for the platform.</p>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- Site Name -->
              <div class="space-y-2">
                <label for="platformName" class="block font-black text-black">Platform Name</label>
                <input id="platformName" type="text" value="EduLearn Platform" class="w-full px-4 py-3 bg-gray-50 border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] focus:bg-white transition-colors">
              </div>
              
              <!-- Support Email -->
              <div class="space-y-2">
                <label for="supportEmail" class="block font-black text-black">Support Email</label>
                <input id="supportEmail" type="email" value="support@edulearn.com" class="w-full px-4 py-3 bg-gray-50 border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0ABAB5] focus:bg-white transition-colors">
              </div>
              
              <!-- Registration Toggle -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-black">
                <div>
                  <h4 class="font-black text-black">Allow Public Registration</h4>
                  <p class="text-sm text-gray-500 font-bold">Enable new users to sign up independently.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer border-2 border-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-black after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0ABAB5]"></div>
                </label>
              </div>
              
              <!-- Maintenance Mode Toggle -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-black">
                <div>
                  <h4 class="font-black text-black">Maintenance Mode</h4>
                  <p class="text-sm text-gray-500 font-bold">Temporarily disable access for non-admins.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer border-2 border-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-black after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0ABAB5]"></div>
                </label>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class PlatformSettingsComponent {}
