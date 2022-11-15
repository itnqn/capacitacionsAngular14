import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings/trainings.service';

/********************************
 * interfaces
 */
import {coursesResources} from '../../../../interfaces/resources.interface';

import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  uuid: string;
  template: boolean = false;
  form : UntypedFormGroup;
  form_2 : UntypedFormGroup;
  allResources : coursesResources[] = [];

  selectedOption = 1;

  select_1 : any = [
    {id : 1, name : 'Documentos'},
    {id : 2, name : 'video'}
  ]

  constructor(
    private route: ActivatedRoute,
    public formulario : UntypedFormBuilder,
    private _trainings : TrainingsService
  ) {
    this.uuid = this.route.snapshot.params.id;

    this.form = this.formulario.group({
      "type" : new UntypedFormControl(''),
      "url_video" : new UntypedFormControl(''),
    });

    this.form.setValue({
      "type" : 'video',
      "url_video" : '',
    });

    this.form_2 = this.formulario.group({
      "type" : 'file',
      "files" : ''
    })
  }

  ngOnInit(): void {
    this.resourcesGetAll();
  }

  selectors(event: any) {
    console.log(event)
    if(event.id == 2){
      this.template = true;
    }else{
      this.template = false;
    }
    
  }


  saveResourcesFiles(){
    this.form_2.value.uuid = this.uuid;
    console.log(this.form_2.value);
    if(this.form.value.url_video.length == 0){
      Notiflix.Notify.failure('Debe colocar url del video',
        {position: 'center-bottom'});
    }else{
      this._trainings.coursesFiles(this.form_2.value).subscribe(res=>{
        console.log(res)
      });
    }
  }

  saveResourcesVideo(){   

    this.form.value.uuid = this.uuid;
    console.log(this.form.value);
    if(this.form.value.type == ''){
      Notiflix.Notify.failure('Seleccione tipo de recurso',
        {position: 'center-bottom'});
    }else{
      this._trainings.coursesVideo(this.form.value).subscribe(res=>{
        this.resourcesGetAll();
      });
    }
  }


  resourcesGetAll(){
    this._trainings.getAllResources(this.uuid).subscribe(res=>{
      this.allResources = res;
    });
  }

  deleteResources(id : any){
    this._trainings.resourcesDelete(id).subscribe(res=>{
      console.log(res)
      if(res){
        Notiflix.Notify.success('Recurso borrado',
        {position: 'center-bottom'});
        this.resourcesGetAll();
      }else{
        Notiflix.Notify.failure('Error al borrar recurso',
        {position: 'center-bottom'});
      }
    })
  }

}
