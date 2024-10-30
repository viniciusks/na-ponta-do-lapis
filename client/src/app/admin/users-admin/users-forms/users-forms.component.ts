import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-forms',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    ToastModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './users-forms.component.html',
  styleUrl: './users-forms.component.css',
  providers: [MessageService, UserService],
})
export class UsersFormsComponent implements OnInit {
  user: User;

  constructor(
    private _messageService: MessageService,
    private _userService: UserService,
  ) {
    this.user = {
      name: '',
      cpf: '',
      email: '',
      birthdate: new Date(),
      city: '',
      state: '',
      country: '',
      role: 'USER_ROLE',
      isEnable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  ngOnInit() {
    console.log('UsersFormsComponent - ngOnInit');
  }
}
