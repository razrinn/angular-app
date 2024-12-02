import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <main class="min-h-screen">
      <header class="p-2 shadow shadow-accent border-b">
        <nav>
          <a routerLink="/" class="text-primary hover:opacity-80 font-bold"
            >Angular!</a
          >
        </nav>
      </header>
      <section class="p-2"><router-outlet /></section>
    </main>
  `,
})
export class AppComponent {
  title = 'angular-app';
}
