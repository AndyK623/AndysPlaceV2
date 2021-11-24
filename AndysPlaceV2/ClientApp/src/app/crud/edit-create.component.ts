import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from './Customer';
import { Country } from './Country';

import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html'
})
export class EditCreateComponent implements OnInit {

  title: string;

  form: FormGroup;

  customer: Customer;

  customerId?: number;

  countries: Country[];

  minOpeningDate = new Date(1753, 1, 1);
  maxOpeningDate = new Date();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string)
  {

  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      companyName: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      emailAddress: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[+]?[0-9\-\(\)]+$/)]),
      openingDate: new FormControl('', [Validators.required]),
      countryId: new FormControl('', Validators.required)
    }, null, this.isDupeCustomer());

    this.loadData();
    this.loadCountries();
  }

  isDupeCustomer(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      var customer = <Customer>{};

      customer.customerId = +this.activatedRoute.snapshot.paramMap.get('id');
      customer.firstName = this.form.get('firstName').value;
      customer.lastName = this.form.get('lastName').value;
      customer.companyName = this.form.get('companyName').value;
      customer.emailAddress = this.form.get('emailAddress').value;
      customer.phone = this.form.get('phone').value;
      customer.openingDate = this.form.get('openingDate').value;
      customer.countryId = this.form.get('countryId').value;

      var url = this.baseUrl + 'api/Crud/IsDupeCustomer';

      return this.http.post<boolean>(url, customer).pipe(map(result => {
        return (result ? { isDupeCustomer: true } : null);
      }));

    }
  }

  loadData() {
    this.customerId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (this.customerId) {
      var url = this.baseUrl + 'api/Crud/' + this.customerId;

      this.http.get<Customer>(url).subscribe(result => {
        this.customer = result;
        this.title = "Edit " + result.firstName + ' ' + result.lastName;

        this.form.patchValue(this.customer);
      }, error => console.error(error));
    }
    else {
      this.title = "Create a New Customer";
    }

  }

  loadCountries() {
    var url = this.baseUrl + 'api/Country';

    this.http.get<Country[]>(url).subscribe(result => {
      this.countries = result;
    }, error => console.error(error));
  }

  onSubmit() {

    var customer = (this.customerId) ? this.customer : <Customer>{};

    customer.firstName = this.form.get('firstName').value;
    customer.lastName = this.form.get('lastName').value;
    customer.companyName = this.form.get('companyName').value;
    customer.emailAddress = this.form.get('emailAddress').value;
    customer.phone = this.form.get('phone').value;
    customer.openingDate = this.form.get('openingDate').value;
    customer.countryId = this.form.get('countryId').value;
    
    if (this.customerId) {
      var url = this.baseUrl + 'api/Crud/' + this.customerId;

      this.http.put<Customer>(url, customer).subscribe(result => {
        alert('Customer ' + customer.firstName + ' ' + customer.lastName + ' has been updated.');

        this.router.navigate(['/Crud']);
      }, error => console.error(error));
    }
    else {
      var url = this.baseUrl + 'api/Crud';

      this.http.post<Customer>(url, customer).subscribe(result => {
        alert('Customer ' + customer.firstName + ' ' + customer.lastName + ' has been created.');

        this.router.navigate(['/Crud']);
      }, error => console.error(error));
    }

  }

}
