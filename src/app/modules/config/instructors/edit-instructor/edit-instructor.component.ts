import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  constructor(private configService: ConfigService, private route: ActivatedRoute) { }

  submitPressed: boolean = false;
  readOnly: boolean = false;
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    unique_code: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl(''),
    address: new UntypedFormControl(''),
    enabled: new UntypedFormControl(1, Validators.required),
  });

  ngOnInit(): void {
    let idEdit = this.route.snapshot.params.id;
    // console.log(idEdit);
    this.configService.getInstructor(idEdit).subscribe(r => {
      console.log(r);
      let instructor = r[0];
      this.form.patchValue(instructor);
      this.readOnly = true;
    });
  }

  submit() {
    this.submitPressed = true;
    console.log(this.form.value);
    if (this.form.get('name')?.valid && this.form.get('enabled')?.valid && this.form.get('email')?.valid && this.form.get('unique_code')?.valid) {
      this.configService.newInstructor(this.form.value).subscribe(r => {
        console.log(r);
      });
    }
  }
}
