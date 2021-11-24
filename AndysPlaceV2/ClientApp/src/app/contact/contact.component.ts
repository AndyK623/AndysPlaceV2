import { Component, Inject, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient, HttpParams } from '@angular/common/http';

import { ContactForm } from './ContactForm';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss']
})

export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      message: new FormControl('', Validators.required)
    })

  }

  onSubmit() {

    document.getElementById('spinner').style.display = 'block';

    var url = this.baseUrl + "api/Contact/SendEmail";

    var contactForm = <ContactForm>{};

    contactForm.name = this.form.get('name').value;
    contactForm.email = this.form.get('email').value;
    contactForm.message = this.form.get('message').value;

    this.form.reset();

    this.http.post<ContactForm>(url, contactForm).subscribe(result => {

      if (result) {
        document.getElementById('spinner').style.display = 'none';
      }

      alert("Thanks! The message has been sent correctly. I'll respond to you as soon as possible.");

    }, error => console.error(error));

  }

}
