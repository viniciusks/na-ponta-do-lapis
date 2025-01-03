import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MyDropdownItem } from '../../../models/myDropdownItem';
import { UtilsService } from '../../../services/utils.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import {
  auth,
  createUserWithEmailAndPassword,
} from '../../../services/firebase-auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-forms',
  standalone: true,
  imports: [
    ToastModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    RouterLink,
  ],
  templateUrl: './users-forms.component.html',
  styleUrl: './users-forms.component.css',
  providers: [UtilsService, UserService, MessageService],
})
export class UsersFormsComponent implements OnInit {
  user: User;
  states: MyDropdownItem[];
  cities: MyDropdownItem[];
  countries: MyDropdownItem[];
  action: string;

  constructor(
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.user = {
      name: '',
      cpf: '',
      email: '',
      birthdate: new Date(),
      city: {
        name: '',
        code: '',
      },
      state: {
        name: '',
        code: '',
      },
      country: {
        name: '',
        code: '',
      },
      role: 'USER_ROLE',
      isEnable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.states = [];
    this.cities = [];
    this.countries = [];
    this.action = '';
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.action = params['action'];
      if (this.action == 'edit') {
        this._activatedRoute.queryParams.subscribe((params) => {
          this._userService
            .getUser(params['uid'])
            .subscribe((response: any) => {
              this.user = response.data;
              this.user.birthdate = new Date(this.user.birthdate);
              this.getCities(this.user.state.code);
            });
        });
      }
      this.getCountries();
    });
  }

  getCountries() {
    this._utilsService.getCountries().subscribe((countries: any) => {
      this.countries = countries.map((country: any) => ({
        name: country.nome,
        code: country.nome,
      }));
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
      this.getStates();
    });
  }

  getStates() {
    this._utilsService.getStates().subscribe((states: any) => {
      this.states = states.map((state: any) => ({
        name: state.nome,
        code: state.sigla,
      }));
      this.states.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  getCities(stateCode: string) {
    this._utilsService.getCities(stateCode).subscribe((cities: any) => {
      this.cities = cities.map((city: any) => ({
        name: city.nome,
        code: city.id,
      }));
      this.cities.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onChangeState(event: any) {
    let stateCode = event.value.code;
    this.getCities(stateCode);
  }

  validationForm() {
    if (this.user.name == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O nome é obrigatório',
      });
      return false;
    }

    if (this.user.cpf == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O CPF é obrigatório',
      });
      return false;
    }

    if (this.user.email == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O email é obrigatório',
      });
      return false;
    }

    if (this.user.city.name == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'A cidade é obrigatória',
      });
      return false;
    }

    if (this.user.state.name == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O estado é obrigatório',
      });
      return false;
    }

    if (this.user.country.name == '') {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'O país é obrigatório',
      });
      return false;
    }

    return true;
  }

  redirect() {
    setTimeout(() => {
      this._router.navigate(['/admin/users']);
    }, 2000);
  }

  onSubmit() {
    if (this.validationForm()) {
      if (this.action == 'add') {
        createUserWithEmailAndPassword(
          auth,
          this.user.email,
          'napontadolapis',
        ).then((response: any) => {
          this.user.uid = response.user.uid;
          this._userService.createUser(this.user).subscribe({
            next: () => {
              this._messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Usuário criado com sucesso',
              });
              this.redirect();
            },
          });
        });
      } else if (this.action == 'edit') {
        this.user.updatedAt = new Date();
        this._userService.updateUser(this.user).subscribe({
          next: () => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Usuário atualizado com sucesso',
            });
            this.redirect();
          },
        });
      }
    }
  }
}
