import { Component, OnInit } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    Button,
    ToastModule,
    TableModule,
    RouterLink,
  ],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css',
  providers: [MessageService],
})
export class UsersAdminComponent implements OnInit {
  users: User[];

  constructor(private _messageService: MessageService) {
    this.users = [];
  }

  ngOnInit() {
    console.log('UsersAdminComponent - ngOnInit');
  }
}
