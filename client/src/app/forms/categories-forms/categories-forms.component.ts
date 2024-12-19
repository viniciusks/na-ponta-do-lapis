import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-categories-forms',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    ToastModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './categories-forms.component.html',
  styleUrl: './categories-forms.component.css',
  providers: [MessageService],
})
export class CategoriesFormsComponent implements OnInit {
  action: string;
  category: Category;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.action = '';
    this.category = {
      name: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.action = params['action'];
    });
  }

  onSubmit(): void {
    console.log(this.category);
  }
}
