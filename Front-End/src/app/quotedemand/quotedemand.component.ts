import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-quotedemand',
  templateUrl: './quotedemand.component.html',
  styleUrls: ['./quotedemand.component.css']
})
export class QuotedemandComponent  {

  validateForm: FormGroup;

  submitForm(value: { description: string ; comment: string }): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    console.log(value);
  }


  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      name: ['' ,  [Validators.required]],
      address: ['' ,  [Validators.required]],
      phone: ['' ,  [Validators.required]],
      datePicker:['' ,  [Validators.required]],
      description: ['' ,  [Validators.required]],
      comment: ['']
    });
  }

}
