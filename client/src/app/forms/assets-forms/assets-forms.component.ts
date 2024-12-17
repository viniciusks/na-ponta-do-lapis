import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Asset } from '../../models/asset';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';

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
  ],
  templateUrl: './assets-forms.component.html',
  styleUrl: './assets-forms.component.css',
  providers: [MessageService],
})
export class AssetsFormsComponent implements OnInit {
  action: string;
  asset: Asset;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.action = '';
    this.asset = {
      name: '',
      description: '',
      price: 0,
      categoryUid: '',
      payday: new Date(),
      assetHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      dividend: 0,
    };
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.action = params['action'];
    });
  }
}
