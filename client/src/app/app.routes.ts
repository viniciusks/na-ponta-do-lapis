import { Routes } from '@angular/router';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AdminComponent } from './admin/admin.component';
import { UsersFormsComponent } from './admin/users-admin/users-forms/users-forms.component';
import { AssetsAdminComponent } from './admin/assets-admin/assets-admin.component';

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
        path: 'users/:action',
        component: UsersFormsComponent,
      },
      {
        path: 'assets',
        component: AssetsAdminComponent,
      },
    ],
  },
];
