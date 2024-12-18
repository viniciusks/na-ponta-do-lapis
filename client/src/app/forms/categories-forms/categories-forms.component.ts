import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-forms',
  standalone: true,
  imports: [],
  templateUrl: './categories-forms.component.html',
  styleUrl: './categories-forms.component.css',
})
export class CategoriesFormsComponent implements OnInit {
  action: string;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.action = '';
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.action = params['action'];
    });
  }
}
