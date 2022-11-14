import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/services/system/system.service';
import { Permission } from '../../../../interfaces/permission.interface';
import { ComboService } from '../../../../services/combos/combo.service';

@Component({
  selector: 'app-new-rol',
  templateUrl: './new-rol.component.html',
  styleUrls: ['./new-rol.component.css']
})
export class NewRolComponent implements OnInit {

  constructor(private systemService: SystemService, private comboService: ComboService, private route: ActivatedRoute) { }

  submitPressed: boolean = false;
  form!: UntypedFormGroup;
  permissions!: Permission[];

  ngOnInit(): void {
    this.newForm();
    this.comboService.combo('permissions').subscribe(r => {
      this.permissions = r;
    });
  }

  newForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      enabled: new UntypedFormControl(1, Validators.required),
    });
  }

  submit() {
    this.submitPressed = true;
    console.log(this.form.value);
    if (this.form.get('name')?.valid && this.form.get('enabled')?.valid) {
      this.systemService.newRol(this.form.value).subscribe(r => {
        console.log(r);
      });
    }
  }

}
