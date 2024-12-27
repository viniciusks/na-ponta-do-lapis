import { Routes } from '@angular/router';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AdminComponent } from './admin/admin.component';
import { UsersFormsComponent } from './admin/users-admin/users-forms/users-forms.component';
import { AssetsAdminComponent } from './admin/assets-admin/assets-admin.component';
import { AssetsFormsComponent } from './forms/assets-forms/assets-forms.component';
import { CategoryAdminComponent } from './admin/category-admin/category-admin.component';
import { CategoriesFormsComponent } from './forms/categories-forms/categories-forms.component';

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
      {
        path: 'assets/:action',
        component: AssetsFormsComponent,
      },
      {
        path: 'categories',
        component: CategoryAdminComponent,
      },
      {
        path: 'categories/:action',
        component: CategoriesFormsComponent,
      },
    ],
  },
];
