import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [Button, ToastModule, TableModule, RouterLink],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css',
  providers: [UserService, MessageService],
})
export class UsersAdminComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
  ) {
    this.users = [];
  }

  ngOnInit() {
    this._userService.getUsers().subscribe((response: any) => {
      const users = response as User[];
      this.users = users;
    });
  }
}
