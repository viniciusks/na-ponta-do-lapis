import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UsersFormsComponent } from '../users-forms/users-forms.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [ToastModule, Button, RouterLink, FormsModule, UsersFormsComponent],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css',
  providers: [MessageService],
})
export class UsersAddComponent implements OnInit {
  constructor(private _messageService: MessageService) {}

  ngOnInit() {
    console.log('UsersAddComponent - ngOnInit');
  }
}
