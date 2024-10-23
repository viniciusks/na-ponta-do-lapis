import { Routes } from '@angular/router'
import { UsersAdminComponent } from './admin/users-admin/users-admin.component'
import { HomeAdminComponent } from './admin/home-admin/home-admin.component'

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      },
      {
        path: 'users',
        component: UsersAdminComponent,
      },
    ],
  },
]
