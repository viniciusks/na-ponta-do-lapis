import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './users-forms.component.html',
  styleUrl: './users-forms.component.css',
  providers: [UtilsService, UserService],
})
export class UsersFormsComponent implements OnInit {
  user: User;
  states: MyDropdownItem[];
  selectedState: MyDropdownItem;
  cities: MyDropdownItem[];
  selectedCity: MyDropdownItem;
  countries: MyDropdownItem[];
  selectedCountry: MyDropdownItem;

  constructor(
    private _utilsService: UtilsService,
    private _userService: UserService,
  ) {
    this.user = {
      name: '',
      cpf: '',
      email: '',
      birthdate: new Date(),
      city: '',
      state: '',
      country: '',
      role: 'USER_ROLE',
      isEnable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.states = [];
    this.selectedState = { name: '', code: '' };
    this.cities = [];
    this.selectedCity = { name: '', code: '' };
    this.countries = [];
    this.selectedCountry = { name: '', code: '' };
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this._utilsService.getCountries().subscribe((countries: any) => {
      this.countries = countries.map((country: any) => ({
        name: country.nome,
        code: country.sigla,
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
}
