import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-assets-admin',
  standalone: true,
  imports: [Button, ToastModule, TableModule, RouterLink, ConfirmDialogModule],
  templateUrl: './assets-admin.component.html',
  styleUrl: './assets-admin.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AssetsAdminComponent implements OnInit {
  assets: Asset[];

  constructor() {
    this.assets = [];
  }

  ngOnInit(): void {}
}
