import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Asset } from '../../models/asset';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-assets-forms',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    RippleModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    NgxSpinnerModule,
  ],
  templateUrl: './assets-forms.component.html',
  styleUrl: './assets-forms.component.css',
  providers: [MessageService, CategoryService, NgxSpinnerService, AssetService],
})
export class AssetsFormsComponent implements OnInit {
  action: string;
  asset: Asset;
  categories: Category[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _spinnerService: NgxSpinnerService,
    private _messageService: MessageService,
    private _assetService: AssetService,
  ) {
    this.action = '';
    this.asset = {
      name: '',
      description: '',
      price: 0,
      category: {
        name: '',
        description: '',
      },
      payday: new Date(),
      assetHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      dividend: 0,
    };
    this.categories = [];
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.getCategories();
      this.action = params['action'];
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((response: any) => {
      this.categories = response.data;
    });
  }

  validateForm() {
    if (this.asset.name === '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O nome é obrigatório',
      });
      return false;
    }
    if (this.asset.description === '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'A descrição é obrigatória',
      });
      return false;
    }
    if (this.asset.price === 0) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O preço é obrigatório',
      });
      return false;
    }
    if (this.asset.category.name === '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Categoria é obrigatória',
      });
      return false;
    }
    return true;
  }

  onSubmit() {
    this._spinnerService.show().then(() => {
      if (!this.validateForm()) {
        this._spinnerService.hide();
        return;
      }

      this._assetService.createAsset(this.asset).subscribe({
        next: (response: any) => {
          this._spinnerService.hide().then(() => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Ativo criado com sucesso',
            });
          });
        },
        error: (error: any) => {
          this._spinnerService.hide().then(() => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            });
          });
        },
      });
    });
  }
}
