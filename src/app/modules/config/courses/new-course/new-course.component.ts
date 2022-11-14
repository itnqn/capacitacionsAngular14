import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../services/config/config.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  submitPressed: boolean = false;
  form!: UntypedFormGroup;
  services!: Service[];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.newForm();
  }

  newForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required),
      enabled: new UntypedFormControl(1, Validators.required),
      courses_type: new UntypedFormControl(null),
    });
  }

  submit() {
    this.submitPressed = true;
    console.log(this.form.value);
    if (this.form.get('name')?.valid && this.form.get('enabled')?.valid) {
      this.configService.newCourse(this.form.value).subscribe(r => {
        console.log(r);
      });
    }
  }

}
