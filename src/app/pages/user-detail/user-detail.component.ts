import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '~/app/app.types';
import { UserService } from '~/app/services/user.service';
import {
  LucideAngularModule,
  ChevronLeft as ChevronLeftIcon,
} from 'lucide-angular';

interface UserRequest {
  user: User | null;
  loading: boolean;
  error: string | null;
}

@Component({
  standalone: true,
  selector: 'app-user-detail',
  imports: [AsyncPipe, RouterLink, LucideAngularModule],
  template: `
    <div class="container md:w-[480px] mx-auto flex flex-col gap-4">
      <a routerLink="/" class="text-primary hover:opacity-80 flex items-center">
        <lucide-icon [img]="ChevronLeftIcon" class="w-4 h-4"></lucide-icon>
        <span>Back</span>
      </a>
      <div class="w-full border rounded shadow p-4">
        @if (userReq$ | async; as state) {
          @if (state.error) {
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Error: </strong>
              <span class="block sm:inline">{{ state.error }}</span>
            </div>
          } @else {
            <div class="flex flex-col gap-4">
              <div class="flex gap-2 items-center">
                <div
                  class="w-16 h-16 text-2xl rounded-full bg-primary-foreground flex items-center justify-center"
                >
                  {{ state.user ? state.user.name[0] : '' }}
                </div>
                <div class="flex flex-col gap-1">
                  @if (state.user) {
                    <h1 class="text-xl md:text-2xl font-bold">
                      {{ state.user.name }}
                    </h1>
                    <a
                      href="mailto:{{ state.user.email }}"
                      class="text-sm text-muted-foreground"
                    >
                      {{ state.user.email }}
                    </a>
                  } @else {
                    <div class="h-8 w-[240px] bg-gray-300 animate-pulse rounded"></div>
                    <div class="h-4 w-[100px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <p>Username</p>
                  @if (state.user) {
                    <p class="font-bold">{{ state.user.username }}</p>
                  } @else {
                    <div class="h-6 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>

                <div class="flex justify-between">
                  <p>Email</p>
                  @if (state.user) {
                    <p class="font-bold">{{ state.user.email }}</p>
                  } @else {
                    <div class="h-6 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>
                <div class="flex justify-between">
                  <p>Address</p>
                  @if (state.user) {
                    <p class="font-bold text-right max-w-64">
                      {{ state.user.address.street }},
                      {{ state.user.address.suite }},
                      {{ state.user.address.city }},
                      {{ state.user.address.zipcode }}
                    </p>
                  } @else {
                    <div class="flex flex-col gap-2">
                      <div class="h-5 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                      <div class="h-5 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                    </div>
                  }
                </div>
                <div class="flex justify-between">
                  <p>Phone</p>
                  @if (state.user) {
                    <p class="font-bold">{{ state.user.phone }}</p>
                  } @else {
                    <div class="h-6 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>
                <div class="flex justify-between">
                  <p>Website</p>
                  @if (state.user) {
                    <p class="font-bold">
                      <a
                        href="https://{{ state.user.website }}"
                        target="_blank"
                        class="text-primary hover:opacity-80"
                      >
                        {{ state.user.website }}</a
                      >
                    </p>
                  } @else {
                    <div class="h-6 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>
                <div class="flex justify-between">
                  <p>Company</p>
                  @if (state.user) {
                    <p class="font-bold">
                      {{ state.user.company.name }}
                    </p>
                  } @else {
                    <div class="h-6 w-[150px] bg-gray-300 animate-pulse rounded"></div>
                  }
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class UserDetailComponent implements OnInit {
  userReq$!: Observable<UserRequest>;
  readonly ChevronLeftIcon = ChevronLeftIcon;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];
      this.userReq$ = this.userService.getUser(userId).pipe(
        map((user) => ({ user, loading: false, error: null })),

        catchError((error) =>
          of({
            user: null,
            loading: false,
            error: error.message || 'Failed to load user',
          }),
        ),

        startWith({ user: null, loading: true, error: null }),
      );
    });
  }
}
