import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

export const routes: Routes = [
  { path: ':userId', pathMatch: 'full', component: UserDetailComponent },
  { path: '', pathMatch: 'full', component: UserListComponent },
];
