import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <header class="p-2 shadow shadow-accent">
      <nav>
        <a routerLink="/" class="hover:text-primary">Home</a>
      </nav>
    </header>
    <main class="p-2">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'angular-app';
}
