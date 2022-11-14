import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  uuid: string;
  template: boolean = false;
  form : UntypedFormGroup;

  selectedOption = 1;

  select_1 : any = [
    {id : 1, name : 'files'},
    {id : 2, name : 'video'}
  ]

  constructor(
    private route: ActivatedRoute,
    public formulario : UntypedFormBuilder,
  ) {
    this.uuid = this.route.snapshot.params.id;

    this.form = this.formulario.group({
      "type" : new UntypedFormControl('')
    })
  }

  ngOnInit(): void {

  }

  selectors(event: any) {
    if(event.id == 2){
      this.template = true;
    }else{
      this.template = false;
    }
    
  }

}
