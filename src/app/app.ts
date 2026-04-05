import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Hello, {{ title() }}</h1>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100dvh;
      }
    `,
  ],
})
export class App {
  title = signal('E-Learning Platform');
}
