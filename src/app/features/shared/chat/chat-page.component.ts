import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '@features/auth/store/auth.store';
import { ChatStore, Conversation } from './chat.store';

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .chat-bubble-me {
        background: #0abab5;
        color: #fff;
        border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
        box-shadow: 3px 3px 0 rgba(0,0,0,0.18);
      }
      .chat-bubble-them {
        background: #fff;
        border: 2.5px solid #000;
        border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
        box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
      }
      .contact-item {
        transition: background 0.15s, border-color 0.15s;
        cursor: pointer;
      }
      .contact-item:hover {
        background: #f0fdfc;
      }
      .contact-item.active {
        background: #0abab514;
        border-color: #0abab5 !important;
      }
      .send-btn {
        transition: transform 0.12s, box-shadow 0.12s;
      }
      .send-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 4px 6px 0 rgba(0,0,0,1);
      }
      .send-btn:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 2px 2px 0 rgba(0,0,0,1);
      }
      .thread-scroll {
        scroll-behavior: smooth;
      }
    `,
  ],
  template: `
    <div class="h-full flex flex-col" style="height: calc(100vh - 80px);">

      <!-- Page title -->
      <div class="px-6 pt-6 pb-4 flex-shrink-0">
        <h1 class="text-3xl font-black tracking-tight">Messages</h1>
        <p class="text-gray-500 font-medium mt-1">Your conversations</p>
      </div>

      <!-- Main panel -->
      <div class="flex flex-1 min-h-0 mx-6 mb-6 border-4 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">

        <!-- ──────── Left: contact list ──────── -->
        <aside class="w-80 flex-shrink-0 border-r-4 border-black bg-white flex flex-col">
          <div class="px-4 py-4 border-b-2 border-black bg-[#0ABAB5]/8">
            <p class="text-xs font-black uppercase tracking-widest text-gray-400">
              {{ store.hasActiveConversations() ? 'Conversations' : 'Start a Chat' }}
            </p>
          </div>

          <div class="flex-1 overflow-y-auto">
            @if (store.loading()) {
              <div class="flex flex-col gap-3 p-4">
                @for (_ of [1,2,3,4]; track $index) {
                  <div class="flex items-center gap-3 p-2 animate-pulse">
                    <div class="w-12 h-12 rounded-2xl bg-gray-200 flex-shrink-0"></div>
                    <div class="flex-1">
                      <div class="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                      <div class="h-3 bg-gray-100 rounded w-full"></div>
                    </div>
                  </div>
                }
              </div>
            } @else if (store.error()) {
              <div class="p-6 text-center">
                <span class="material-icons text-4xl text-red-400 mb-2">error_outline</span>
                <p class="text-sm font-bold text-red-600">{{ store.error() }}</p>
                <button
                  class="mt-3 text-xs font-black text-[#0ABAB5] hover:underline"
                  (click)="store.loadInbox()"
                >Retry</button>
              </div>
            } @else if (store.conversations().length === 0) {
              <div class="p-8 text-center flex flex-col items-center gap-3">
                <div class="w-16 h-16 rounded-2xl bg-[#0ABAB5]/10 border-2 border-[#0ABAB5]/30 flex items-center justify-center">
                  <span class="material-icons text-3xl text-[#0ABAB5]">forum</span>
                </div>
                <p class="text-sm font-black text-gray-700">No conversations yet</p>
                <p class="text-xs text-gray-400">Messages you exchange with others will appear here.</p>
              </div>
            } @else {
              <ul class="divide-y-2 divide-black/5">
                @for (conv of store.conversations(); track conv.contactId) {
                  <li
                    class="contact-item px-4 py-3 border-l-4 border-transparent"
                    [class.active]="store.selectedContactId() === conv.contactId"
                    (click)="selectContact(conv)"
                    (keydown.enter)="selectContact(conv)"
                    tabindex="0"
                    role="button"
                    [attr.aria-label]="'Open conversation with ' + conv.contactName"
                  >
                    <div class="flex items-center gap-3">
                      <!-- Avatar -->
                      <div
                        class="w-12 h-12 rounded-2xl border-2 border-black flex-shrink-0 flex items-center justify-center font-black text-base text-white"
                        [style.background]="avatarColor(conv.contactId)"
                      >
                        {{ initials(conv.contactName) }}
                      </div>
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-baseline justify-between gap-1">
                          <p class="font-black text-sm truncate">{{ conv.contactName }}</p>
                          <p class="text-xs text-gray-400 flex-shrink-0">
                            {{ conv.lastMessage.sentAt | date:'shortTime' }}
                          </p>
                        </div>
                        <p class="text-xs text-gray-500 truncate mt-0.5">{{ conv.lastMessage.body }}</p>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            }
          </div>
        </aside>

        <!-- ──────── Right: thread + composer ──────── -->
        <div class="flex-1 flex flex-col bg-gray-50 min-w-0">

          @if (!store.selectedConversation()) {
            <!-- Empty / pick a conversation -->
            <div class="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
              <div class="w-24 h-24 rounded-3xl bg-[#0ABAB5]/10 border-4 border-[#0ABAB5]/20 flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.06)]">
                <span class="material-icons text-5xl text-[#0ABAB5]">chat_bubble_outline</span>
              </div>
              <p class="text-xl font-black text-gray-800">Select a conversation</p>
              <p class="text-sm text-gray-400 max-w-xs">Choose someone from the list to read and send messages.</p>
            </div>
          } @else {
            <!-- Thread header -->
            <div class="px-6 py-4 border-b-4 border-black bg-white flex items-center gap-4 flex-shrink-0">
              <div
                class="w-11 h-11 rounded-2xl border-2 border-black flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                [style.background]="avatarColor(store.selectedConversation()!.contactId)"
              >
                {{ initials(store.selectedConversation()!.contactName) }}
              </div>
              <div>
                <p class="font-black text-base">{{ store.selectedConversation()!.contactName }}</p>
                <p class="text-xs text-gray-400 font-medium">
                  {{ store.selectedConversation()!.messages.length }}
                  {{ store.selectedConversation()!.messages.length === 1 ? 'message' : 'messages' }}
                </p>
              </div>
            </div>

            <!-- Messages -->
            <div
              #threadRef
              class="flex-1 overflow-y-auto thread-scroll px-6 py-4 flex flex-col gap-3"
            >
              @for (msg of store.selectedConversation()!.messages; track msg.id) {
                <div
                  class="flex"
                  [class.justify-end]="isMe(msg.senderId)"
                  [class.justify-start]="!isMe(msg.senderId)"
                >
                  <!-- Avatar for them -->
                  @if (!isMe(msg.senderId)) {
                    <div
                      class="w-8 h-8 rounded-xl border-2 border-black flex-shrink-0 flex items-center justify-center font-black text-xs text-white mr-2 mt-auto"
                      [style.background]="avatarColor(msg.senderId)"
                    >
                      {{ initials(store.selectedConversation()!.contactName) }}
                    </div>
                  }

                  <div class="max-w-[68%] flex flex-col" [class.items-end]="isMe(msg.senderId)">
                    <div
                      class="px-4 py-2.5 text-sm font-medium leading-relaxed"
                      [class.chat-bubble-me]="isMe(msg.senderId)"
                      [class.chat-bubble-them]="!isMe(msg.senderId)"
                    >
                      {{ msg.body }}
                    </div>
                    <p class="text-[10px] text-gray-400 mt-1 px-1">
                      {{ msg.sentAt | date:'shortTime' }}
                    </p>
                  </div>
                </div>
              }

              <!-- Sending indicator -->
              @if (store.sending()) {
                <div class="flex justify-end">
                  <div class="chat-bubble-me px-4 py-2.5 text-sm flex items-center gap-2 opacity-60">
                    <span class="material-icons text-base animate-spin">autorenew</span>
                    Sending…
                  </div>
                </div>
              }
            </div>

            <!-- Send error -->
            @if (store.sendError()) {
              <div class="mx-6 mb-2 px-4 py-2 bg-red-50 border-2 border-red-300 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
                <span class="material-icons text-sm">error</span>
                {{ store.sendError() }}
              </div>
            }

            <!-- Composer -->
            <div class="px-6 py-4 border-t-4 border-black bg-white flex-shrink-0">
              <div class="flex gap-3 items-end">
                <textarea
                  id="chat-message-input"
                  #messageInput
                  [(ngModel)]="draft"
                  (keydown.enter)="onEnter($event)"
                  [disabled]="store.sending()"
                  rows="1"
                  placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
                  class="flex-1 resize-none rounded-2xl border-2 border-black px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 focus:border-[#0ABAB5] transition-all leading-relaxed disabled:opacity-50"
                  style="max-height: 120px; overflow-y: auto;"
                ></textarea>
                <button
                  id="chat-send-btn"
                  type="button"
                  class="send-btn w-12 h-12 rounded-2xl bg-[#0ABAB5] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_rgba(0,0,0,1)] disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  [disabled]="!draft().trim() || store.sending()"
                  (click)="send()"
                  aria-label="Send message"
                >
                  <span class="material-icons text-white text-xl">send</span>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ChatPageComponent implements OnInit {
  protected readonly store = inject(ChatStore);
  private readonly authStore = inject(AuthStore);

  @ViewChild('threadRef') threadRef?: ElementRef<HTMLDivElement>;

  readonly draft = signal('');

  private readonly AVATAR_PALETTE = [
    '#0ABAB5', '#6366f1', '#f59e0b', '#ec4899', '#10b981',
    '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316',
  ];

  ngOnInit(): void {
    this.store.loadInbox();
  }

  selectContact(conv: Conversation) {
    this.store.selectContact(conv.contactId);
    // Scroll to bottom after view updates
    setTimeout(() => this.scrollToBottom(), 50);
  }

  isMe(senderId: string): boolean {
    return senderId === this.authStore.user()?.id;
  }

  initials(name?: string): string {
    return getInitials(name);
  }

  avatarColor(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.AVATAR_PALETTE[Math.abs(hash) % this.AVATAR_PALETTE.length];
  }

  onEnter(event: Event) {
    const keyEvent = event as KeyboardEvent;
    if (!keyEvent.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send() {
    const contactId = this.store.selectedContactId();
    const msg = this.draft().trim();
    if (!contactId || !msg) return;

    this.store.sendMessage(contactId, msg);
    this.draft.set('');
    setTimeout(() => this.scrollToBottom(), 80);
  }

  private scrollToBottom() {
    const el = this.threadRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
