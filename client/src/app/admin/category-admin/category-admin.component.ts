import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    TableModule,
    RouterLink,
    ConfirmDialogModule,
    NgxSpinnerComponent,
  ],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css',
  providers: [
    MessageService,
    ConfirmationService,
    CategoryService,
    NgxSpinnerService,
  ],
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[];

  constructor(
    private _categoryService: CategoryService,
    private _spinnerService: NgxSpinnerService,
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    this._spinnerService.show().then(() => {
      this.getCategories();
    });
  }

  getCategories(): void {
    this._categoryService.getCategories().subscribe((response: any) => {
      this._spinnerService.hide().then(() => {
        this.categories = response.data;
      });
    });
  }
}
