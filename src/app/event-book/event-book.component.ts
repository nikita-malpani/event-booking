import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, FormArray } from '@angular/forms';
import { debug } from 'util';

@Component({
  selector: 'app-event-book',
  templateUrl: './event-book.component.html',
  styleUrls: ['./event-book.component.css']
})
export class EventBookComponent implements OnInit {
  event;
  userDetails: FormGroup;
  submitted: boolean
  invalidForm:boolean

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router ) { }

  ngOnInit() {
    this.submitted = false;
    this.invalidForm=false;
    this.event = JSON.parse(this.route.queryParams['value']['event'])

    this.userDetails = this.formBuilder.group({
      user_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]),
      phone: new FormControl('', [Validators.pattern(/^\d{10}$/)]),
      seats: new FormControl(0, [Validators.required, this.checkAvailbility()]),
      attendee_names: this.formBuilder.array([])
    })

  }

  checkAvailbility(): ValidatorFn {
    console.log("total : ",this.event.seats_available)
    const validator: ValidatorFn = (control: FormControl) => {
      console.log(control.value)
      
      return control.value > this.event.seats_available ? { notSelected: true } : null;
    };
    return validator;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userDetails.invalid) {
      console.log("Form Invalid");      
      return;
    }
    this.invalidForm=true; 
  }

  totSeats(totalSeats) {
    this.userDetails.controls.attendee_names=this.formBuilder.array([]);
    let names = this.userDetails.get('attendee_names') as FormArray;    
    for (let i = 0; i < totalSeats-1; i++) {
      names.push(new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]))
    }
  }

  cancel(){
    this.router.navigate([''])
  }

}

