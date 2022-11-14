import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';

/******************************
 * services
 */
import { TrainingsService } from 'src/app/services/trainings/trainings.service';

/******************************
 * material
 */
import { MatDialog } from '@angular/material/dialog';
import * as Notiflix from 'notiflix';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  uuid : any;
  formsQuestions: UntypedFormGroup;
  formsAnswer : UntypedFormGroup;
  questionArray : any = [];
  questionId : number = 0;
  valor : boolean = false;

  constructor(
    public formulario:UntypedFormBuilder,
    public dialog: MatDialog,
    private _trainings : TrainingsService,
    private route: ActivatedRoute
  ) {

    this.uuid = this.route.snapshot.params.id;

    this.formsQuestions = this.formulario.group({
      "question" : new UntypedFormControl('', Validators.required),
      "question_type" : new UntypedFormControl('', [Validators.required])
    });    

    this.formsAnswer = this.formulario.group({
      "question_id" : new UntypedFormControl(''),
      "answer" : new UntypedFormControl('', Validators.required),
      "value" :new UntypedFormControl('', Validators.required),
    });

   }

  ngOnInit(): void {
    this.getQuestions(this.uuid);
  }


  getQuestions(uuid : any){
    this._trainings.questions(uuid).subscribe(r=>{
      console.log(r)
      this.questionArray = r;
    });
  }

  openQuestions(template : any){
    const dialogRef = this.dialog.open(template);
  }

  openAnswer(template : any, question_id : number){
    const dialogRef = this.dialog.open(template);
    this.questionId = question_id;
  }

  generateQuestions(){

    if(this.formsQuestions.value.question.length == 0){

      Notiflix.Notify.failure('Ingrese una pregunta',
        {position: 'center-bottom'});

    }else if(this.formsQuestions.value.question_type === ''){

      Notiflix.Notify.failure('Seleccione tipo de pregunta',
        {position: 'center-bottom'});

    }else{

      let data = {
        "question" : this.formsQuestions.value.question,
        "question_type" : this.formsQuestions.value.question_type,
        "uuid" : this.uuid
      }

      console.log(data)

        this._trainings.generateQuestions(data).subscribe(r=>{
          console.log(r);
          this.getQuestions(this.uuid);
        });
    }
  }

  answers(questionId : any){
    console.log(this.formsAnswer.value, questionId)

    let data = {
      "question_id" : questionId,
      "answer" : this.formsAnswer.value.answer,
      "value" : this.formsAnswer.value.value
    }

    this._trainings.generateAnswer(data).subscribe(r=>{
      console.log(r);
      this.getQuestions(this.uuid);
    });
  }

  get getAnswers(){
    return this.formsQuestions.get('answers') as UntypedFormArray;
  }

  deleteAnswer(id : number){

    this._trainings.deleteAnswer({id : id}).subscribe(r=>{

      if(r == 1){
        Notiflix.Notify.success('Respuesta borrada',
        {position: 'center-bottom'});

        this.getQuestions(this.uuid);

      }else{
        Notiflix.Notify.failure('Error al borrar respuesta',
        {position: 'center-bottom'});
      }
    });

  }

 

}
