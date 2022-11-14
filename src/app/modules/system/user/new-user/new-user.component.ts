import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SystemService } from '../../../../services/system/system.service';
import { ComboService } from '../../../../services/combos/combo.service';
import { Employee } from '../../../../interfaces/employee.interface';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/interfaces/role.interface';
import { Selectable } from '../../../../interfaces/selectable.interface';

import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  @ViewChild("fileInput", {
    read: ElementRef
  }) documentFile: ElementRef | undefined;

  imageDefault : string = "default.png";

  constructor(
    private systemService: SystemService, 
    private comboService: ComboService, 
    private route: ActivatedRoute, 
    private fb: UntypedFormBuilder) {  

  }

  submitPressed: boolean = false;
  form!: UntypedFormGroup;
  employees!: Selectable[];
  roles!: Rol[];
  enabled = true;

  ngOnInit(): void {
    // let idEdit = this.route.snapshot.params.id;
    // console.log(idEdit);
    this.newForm();
    this.comboService.combo('employee').subscribe(r => {
      this.employees = r;
    });
    this.comboService.combo('roles').subscribe(r => {
      this.roles = r;
    });
  }

  newForm() {
    this.form = new UntypedFormGroup({
      employee: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      re_password : new UntypedFormControl('', Validators.required),
      enabled: new UntypedFormControl(1, Validators.required),
      roles_id: new UntypedFormControl('', Validators.required),
      photo : new UntypedFormControl('')
    });
  }

  uploadImage(){
    let arch = this.documentFile?.nativeElement.files; 
    let formData = new FormData();
    formData.append('photo', arch[0]);

     this.systemService.uploadImage(formData).subscribe(r => {
       this.imageDefault = r.image;   
     });
  }

  submit() {

    if(this.form.value.password != this.form.value.re_password){
      Notiflix.Notify.failure('Error, passwor no coinciden',
      {position: 'center-bottom'});
    }else{

      this.submitPressed = true;
      if (this.form.value.enabled) {
        this.form.value.enabled = 1;
      }
      else {
        this.form.value.enabled = 0;
      }
      console.log(this.form.value);
      this.systemService.newUser(this.form.value).subscribe(r=>{
      console.log(r);
      });
    }
    

       
    
    
    
  }

}
