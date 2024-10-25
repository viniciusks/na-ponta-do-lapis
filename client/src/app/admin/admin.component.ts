import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, MenuModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Produtos',
        items: [
          {
            label: 'Usuários',
            icon: 'pi pi-users',
            routerLink: '/admin/users',
          },
        ],
      },
      {
        label: 'Deseja sair?',
        items: [
          {
            label: 'Tela inicial',
            icon: 'pi pi-home',
            routerLink: '/',
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }
}
