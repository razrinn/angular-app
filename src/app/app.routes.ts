import { Routes } from '@angular/router';
import { UserDetailComponent } from '~/app/pages/user-detail/user-detail.component';
import { UserListComponent } from '~/app/pages/user-list/user-list.component';

export const routes: Routes = [
  { path: ':userId', pathMatch: 'full', component: UserDetailComponent },
  { path: '', pathMatch: 'full', component: UserListComponent },
];
