import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  constructor(private configService: ConfigService, private route: ActivatedRoute) { }

  submitPressed: boolean = false;
  readOnly: boolean = false;
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    enabled: new UntypedFormControl(1, Validators.required),
    courses_type: new UntypedFormControl(null),
  });

  ngOnInit(): void {
    let idEdit = this.route.snapshot.params.id;
    // console.log(idEdit);
    this.configService.getCourse(idEdit).subscribe(r => {
      console.log(r);
      let course = r[0];
      this.form.patchValue(course);
      this.readOnly = true;
    });
  }

  submit() {
    this.submitPressed = true;
    console.log(this.form.value);
    if (this.form.get('name')?.valid && this.form.get('enabled')?.valid && this.form.get('description')?.valid) {
      this.configService.newCourse(this.form.value).subscribe(r => {
        console.log(r);
      });
    }
  }

}
