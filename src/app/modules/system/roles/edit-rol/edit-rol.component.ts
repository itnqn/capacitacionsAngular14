import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SystemService } from '../../../../services/system/system.service';
import { ComboService } from '../../../../services/combos/combo.service';
import { ActivatedRoute } from '@angular/router';

import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {

  idEdit : number = 0;
  modules : any;


  constructor(private systemService: SystemService, private route: ActivatedRoute) {
     this.idEdit = this.route.snapshot.params.id;
   }



  listSubModule : any = [
    "sub module 1",
    "sub module 2",
    "sub module 3"
  ];

  submitPressed: boolean = false;
  form = new UntypedFormGroup({
    id: new UntypedFormControl('', Validators.required),
    name: new UntypedFormControl('', Validators.required),
    enabled: new UntypedFormControl(1, Validators.required)
  });

  ngOnInit(): void {  

    this.getRolHasPermissions();
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

  getRolHasPermissions(){
    this.systemService.roleshaspermissions(this.idEdit).subscribe(r=>{
      console.log(r);
      this.modules = r;
    })
  }

  onOffCheck(event : any, module_id : number, permissions_id : number){
    
    let data = {  
      roles_id : this.idEdit,
      permissions_id : permissions_id,
      method : event.checked
    };

    this.systemService.onOffCheck(data).subscribe(r=>{
      
      if(r.method == "insert" && r.success){
        Notiflix.Notify.success('Permiso asignado',
        {position: 'center-bottom'});
      }else if(r.method == "delete" && r.success){
        Notiflix.Notify.success('Permiso revocado',
        {position: 'center-bottom'});
      }else if(r.success == false){
        Notiflix.Notify.failure('Error de asignacion, consulte al administrador',
        {position: 'center-bottom'});
      }

    });
  }

}
