import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SystemService } from '../../../../services/system/system.service';
import { ComboService } from '../../../../services/combos/combo.service';
import { Employee } from '../../../../interfaces/employee.interface';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/interfaces/role.interface';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild("fileInput", {
    read: ElementRef
  }) documentFile: ElementRef | undefined;

  imageDefault : string = "default.png";

  constructor(private systemService: SystemService, private comboService: ComboService, private route: ActivatedRoute) {
    let idEdit = this.route.snapshot.params.id;   
    this.systemService.getUser(idEdit).subscribe(r => {
      console.log(r)

      this.imageDefault = r[0].photo;

      this.form.setValue({
        employee: r[0].employee,
        email: r[0].email,
        enabled: (r[0].enabled == 1)? true : false,
        roles_id: r[0].roles_id,
        photo : r[0].photo
      })
    });

   }

  submitPressed: boolean = false;
  employees!: Employee[];
  roles!: Rol[];
  readOnlyEmail: boolean = false;

  form!: UntypedFormGroup;
  enabled = true;

 

  ngOnInit(): void {
     // console.log(idEdit);
     this.newForm();
     this.employeeList();
    this.rolesList();
  }

  employeeList(){
    this.comboService.combo('employee').subscribe(r => {
      this.employees = r;
    });
  }

  rolesList(){
    this.comboService.combo('roles').subscribe(r => {
      this.roles = r;
    });
  }

  newForm() {
    this.form = new UntypedFormGroup({
      employee: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required),
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
    this.submitPressed = true;
    console.log(this.form.value);
    if (this.form.get('employee')?.valid && this.form.get('email')?.valid && this.form.get('enabled')?.valid) {
      this.systemService.newUser(this.form.value).subscribe(r => {
        console.log(r)
        if(r.method == "insert" && r.success == 1){
          Notiflix.Notify.success('Usuario creado',
          {position: 'center-bottom'});
        }else if(r.method == "update" && r.success == 1){
          Notiflix.Notify.success('Permiso actualizado',
          {position: 'center-bottom'});
        }else if(r.success == false){
          Notiflix.Notify.failure('Error al actualizar, consulte al administrador',
          {position: 'center-bottom'});
        }
      });
    }
  }

}
