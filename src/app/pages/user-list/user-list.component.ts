import { Component } from '@angular/core';
import { UserRowComponent } from '../../components/user-row/user-row.component';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [UserRowComponent],
  template: `
    <p>user-list works!</p>
    <app-user-row />
  `,
})
export class UserListComponent {}
