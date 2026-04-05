import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth.store';

@Directive({
  selector: '[appRoleVisible]',
  standalone: true
})
export class RoleVisibleDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private authStore = inject(AuthStore);
  private hasView = false;
  private allowedRoles: string[] = [];

  @Input() set appRoleVisible(roles: string[]) {
    this.allowedRoles = roles;
    this.updateView();
  }

  constructor() {
    effect(() => {
      this.updateView();
    });
  }

  private updateView() {
    const currentRole = this.authStore.role();
    const isAllowed = currentRole && this.allowedRoles.includes(currentRole);

    if (isAllowed && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isAllowed && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
