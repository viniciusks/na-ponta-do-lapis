import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { UsersFormsComponent } from '../users-forms/users-forms.component';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, UsersFormsComponent],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css',
  providers: [],
})
export class UsersAddComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
