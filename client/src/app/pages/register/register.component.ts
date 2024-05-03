import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit(): void {}
}
