import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

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
    InputMaskModule,
    CalendarModule,
  ],
  templateUrl: './users-forms.component.html',
  styleUrl: './users-forms.component.css',
  providers: [UserService],
})
export class UsersFormsComponent implements OnInit {
  user: User;

  constructor(private _userService: UserService) {
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
