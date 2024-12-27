import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Asset } from '../../models/asset';
import { AssetService } from '../../services/asset.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assets-admin',
  standalone: true,
  imports: [
    Button,
    ToastModule,
    TableModule,
    RouterLink,
    ConfirmDialogModule,
    NgxSpinnerModule,
  ],
  templateUrl: './assets-admin.component.html',
  styleUrl: './assets-admin.component.css',
  providers: [
    MessageService,
    ConfirmationService,
    AssetService,
    NgxSpinnerService,
  ],
})
export class AssetsAdminComponent implements OnInit {
  assets: Asset[];

  constructor(
    private _assetService: AssetService,
    private _spinnerService: NgxSpinnerService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
  ) {
    this.assets = [];
  }

  ngOnInit(): void {
    this._spinnerService.show().then(() => {
      this.getAssets();
    });
  }

  getAssets(): void {
    this._assetService.getAssets().subscribe((response: any) => {
      this._spinnerService.hide().then(() => {
        this.assets = response.data;
      });
    });
  }

  deleteAsset(assetUid: string): void {
    this._confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar este ativo?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this._assetService.deleteAsset(assetUid).subscribe({
          next: () => {
            this._messageService.add({
              severity: 'success',
              summary: 'Deletado',
              detail: 'Ativo deletada com sucesso',
              life: 3000,
            });
            this.getAssets();
          },
          error: (error: any) => {
            this._messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao deletar a Ativo',
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Rejeitado',
          detail: 'Você rejeitou a ação',
          life: 3000,
        });
      },
    });
  }
}
