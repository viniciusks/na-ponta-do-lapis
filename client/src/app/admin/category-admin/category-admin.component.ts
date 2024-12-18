import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    TableModule,
    RouterLink,
    ConfirmDialogModule,
  ],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css',
  providers: [MessageService, ConfirmationService],
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  ngOnInit(): void {}
}
