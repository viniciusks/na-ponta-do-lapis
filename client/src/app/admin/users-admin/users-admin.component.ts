import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { auth } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [Button, ToastModule, TableModule, RouterLink, ConfirmDialogModule],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css',
  providers: [UserService, MessageService, ConfirmationService],
})
export class UsersAdminComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
  ) {
    this.users = [];
  }

  ngOnInit() {
    this._userService.getUsers().subscribe((response: any) => {
      const users = response as User[];
      this.users = users;
    });
  }

  deleteUser(uid: string) {
    this._confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar este usuário?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        let user = auth.currentUser;
        // this._userService.deleteUser(uid).subscribe((response: any) => {
        //   this._messageService.add({
        //     severity: 'success',
        //     summary: 'Success',
        //     detail: 'Usuário deletado com sucesso',
        //   });
        //   this.users = this.users.filter((user) => user.uid !== uid);
        // });
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Você rejeitou a ação',
          life: 3000,
        });
      },
    });
  }
}
