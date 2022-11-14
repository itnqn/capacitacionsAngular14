import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-new-instructor',
  templateUrl: './new-instructor.component.html',
  styleUrls: ['./new-instructor.component.css']
})
export class NewInstructorComponent implements OnInit {

  submitPressed: boolean = false;
  form!: UntypedFormGroup;

  constructor(private configService: ConfigService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.newForm();
  }

  newForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      unique_code: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl(''),
      address: new UntypedFormControl(''),
      enabled: new UntypedFormControl(1, Validators.required),
    });
  }

  submit() {
    this.submitPressed = true;
    //console.log(this.form.value);
    if (this.form.get('name')?.valid && this.form.get('enabled')?.valid && this.form.get('email')?.valid && this.form.get('unique_code')?.valid) {
      this.configService.newInstructor(this.form.value).subscribe(r => {
        //console.log(r);
        this._snackBar.open('Éxito!', 'OK', {duration: 2000, verticalPosition: 'top'});
        setTimeout(() => {
          this.router.navigate(['./config/instructors/list']);
        }, 2000);
      });
    }
  }

}
