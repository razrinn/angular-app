import { Component, OnInit } from '@angular/core';
import { UserRowComponent } from '../../components/user-row/user-row.component';
import { UserService } from '../../services/user.service';
import { User } from '../../app.types';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye as EyeIcon } from 'lucide-angular';

interface UsersRequest {
  users: User[] | null;
  loading: boolean;
  error: string | null;
}

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [AsyncPipe, RouterLink, LucideAngularModule],
  template: `
    <div class="overflow-auto border p-2 rounded shadow">
      @if (usersReq$ | async; as state) {
        @if (state.error) {
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Error: </strong>
            <span class="block sm:inline">{{ state.error }}</span>
          </div>
        }

        <table class="w-full overflow-auto border table-fixed">
          <thead>
            <tr class="bg-primary-foreground">
              <th class="text-left px-2 w-[30%]">Name</th>
              <th class="text-left px-2 w-[30%]">Email</th>
              <th class="text-left px-2 w-[30%]">Website</th>
              <th class="px-2 w-[32px]"></th>
            </tr>
          </thead>
          <tbody>
            @if (state.loading) {
              @for (_ of skeletonRows; track $index) {
                <tr class="animate-pulse">
                  <td [colSpan]="5" class="h-[26px] px-2">
                    <div class="h-4 bg-gray-300 rounded w-full"></div>
                  </td>
                </tr>
              }
            } @else {
              @for (user of state.users; track user.id; let i = $index) {
                <tr class="border-b">
                  <td class="px-2 whitespace-nowrap">{{ user.name }}</td>
                  <td class="px-2 whitespace-nowrap">{{ user.email }}</td>
                  <td class="px-2">
                    <a
                      href="https://{{ user.website }}"
                      target="_blank"
                      class="text-primary hover:opacity-80"
                    >
                      {{ user.website }}</a
                    >
                  </td>
                  <td class="px-2 w-[32px]">
                    <a routerLink="/{{ user.id }}">
                      <div
                        class="border flex items-center justify-center rounded hover:opacity-80"
                      >
                        <lucide-icon
                          [img]="EyeIcon"
                          class="text-zinc-500 w-4 h-4"
                        ></lucide-icon>
                      </div>
                    </a>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class UserListComponent implements OnInit {
  usersReq$!: Observable<UsersRequest>;
  skeletonRows = new Array(10).fill(0);
  readonly EyeIcon = EyeIcon;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.usersReq$ = this.userService.getUsers().pipe(
      map((users) => ({ users, loading: false, error: null })),

      catchError((error) =>
        of({
          users: null,
          loading: false,
          error: error.message || 'Failed to load users',
        }),
      ),

      startWith({ users: null, loading: true, error: null }),
    );
  }
}
