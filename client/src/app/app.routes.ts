import { Routes } from '@angular/router';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AdminComponent } from './admin/admin.component';
import { UsersAddComponent } from './admin/users-admin/users-add/users-add.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      },
      {
        path: 'users',
        component: UsersAdminComponent,
      },
      {
        path: 'users/add',
        component: UsersAddComponent,
      },
    ],
  },
];
