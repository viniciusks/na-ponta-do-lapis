import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private _router: Router,
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
    this._spinnerService.show().then(() => {
      this._activatedRoute.params.subscribe((params) => {
        this.action = params['action'];
        if (this.action == 'edit') {
          this._activatedRoute.queryParams.subscribe((queryParams) => {
            this.getAsset(queryParams['uid']);
          });
        } else {
          this.getCategories();
        }
      });
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((response: any) => {
      this._spinnerService.hide().then(() => {
        this.categories = response.data;
      });
    });
  }

  getAsset(uid: string) {
    this._assetService.getAsset(uid).subscribe({
      next: (response: any) => {
        this.asset = response.data;
        this.asset.payday = new Date(this.asset.payday);
      },
      error: (error: any) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar ativo',
        });
      },
      complete: () => {
        this.getCategories();
      },
    });
  }

  validateForm() {
    const showError = (detail: string) => {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail,
      });
    };

    if (this.asset.name === '') {
      showError('O nome é obrigatório');
      return false;
    }
    if (this.asset.description === '') {
      showError('A descrição é obrigatória');
      return false;
    }
    if (this.asset.price === 0) {
      showError('O preço é obrigatório');
      return false;
    }
    if (this.asset.category.name === '') {
      showError('Categoria é obrigatória');
      return false;
    }
    return true;
  }

  redirect() {
    setTimeout(() => {
      this._router.navigate(['/admin/assets']);
    }, 2000);
  }

  handleResponse(response: any, successMessage: string) {
    this._spinnerService.hide().then(() => {
      this._messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: successMessage,
      });
      this.redirect();
    });
  }

  handleError(error: any) {
    this._spinnerService.hide().then(() => {
      this._messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.error.message,
      });
    });
  }

  registerAssetHistory() {
    if (this.asset.assetHistory.length > 0) {
      this.asset.assetHistory.forEach((history) => {
        history.date = new Date(history.date);
      });
    }

    this.asset.assetHistory.push({
      price: this.asset.price,
      dividend: this.asset.dividend,
      date: new Date(),
    });
  }

  onSubmit() {
    this._spinnerService.show().then(() => {
      if (!this.validateForm()) {
        this._spinnerService.hide();
        return;
      }

      this.registerAssetHistory();
      console.log(this.asset);

      const request =
        this.action === 'add'
          ? this._assetService.createAsset(this.asset)
          : this._assetService.updateAsset(this.asset);

      request.subscribe({
        next: (response: any) =>
          this.handleResponse(
            response,
            this.action === 'add'
              ? 'Ativo criado com sucesso'
              : 'Ativo atualizado com sucesso',
          ),
        error: (error: any) => this.handleError(error),
      });
    });
  }
}
