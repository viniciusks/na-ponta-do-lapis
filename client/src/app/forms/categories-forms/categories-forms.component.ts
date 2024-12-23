import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/category';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../services/category.service';

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
  providers: [MessageService, CategoryService],
})
export class CategoriesFormsComponent implements OnInit {
  action: string;
  category: Category;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _messageService: MessageService,
    private _router: Router,
  ) {
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

  redirect() {
    setTimeout(() => {
      this._router.navigate(['/admin/categories']);
    }, 2000);
  }

  onSubmit(): void {
    if (this.category.name === '' || this.category.description === '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos',
      });
      return;
    }

    this._categoryService.createCategory(this.category).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria criada com sucesso',
        });
        this.redirect();
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar categoria',
        });
      },
    });
  }
}
