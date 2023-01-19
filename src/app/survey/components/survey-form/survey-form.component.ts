import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from 'src/app/core/enums/level';
import { PoeType } from 'src/app/core/enums/poe-type';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { SurveyDto } from '../../dto/survey-dto';
import { SurveyMatDialogComponent } from '../survey-mat-dialog/survey-mat-dialog/survey-mat-dialog.component';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {


  public addMode: boolean = true;
  survey: Survey = new Survey();
  surveyFormGroup!: FormGroup;
  questionToAdd: Question = new Question();
  questions: Array<Question> = [];
  allQuestions: Array<Question> = [];

  title = this.formBuilder.group({ titleControl: ['', Validators.required] });
  surveyForm = this.formBuilder.group({
    typeControl: ['', Validators.required],
    levelControl: ['', Validators.required]
  });
  addQuestions = this.formBuilder.group({
    oldQuestionControl: [''],
    newQuestionControl: ['']
  });

  @ViewChild(SurveyMatDialogComponent) comp!: SurveyMatDialogComponent
  public showInput = false;
  public showSelect = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private _location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {


    const data: any = this.route.snapshot.data;
    console.log(data);
    this.surveyFormGroup = data.form;

    if (this.surveyFormGroup.value.id !== 0 && this.surveyFormGroup.value.id !== undefined) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }

    this.questionService.findAll().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
    });

    if (this.addMode === false) {
      this.route.params
        .subscribe((routeParams: Params) => {
          const surveyId: number = routeParams['id'];
          this.surveyService.findOne(surveyId)
            .subscribe((survey: Survey) => {
              this.survey = survey;
              this.survey.getQuestions().map((anyQuestion: any) => {
                const question: Question = new Question();
                question.setId(anyQuestion.id);
                question.setText(anyQuestion.text);
                question.setAnswerType(anyQuestion.answerType);
                question.setAnswersProposed(anyQuestion.answersProposed);
                this.questions.push(question);
                console.log(this.questions)
                return question;
              }
              )
            });
        })
    }


  }

  public get c(): { [key: string]: AbstractControl } {
    return this.surveyFormGroup.controls;
  }

  onSubmit() {
    console.log("this.questions", this.questions);
    console.log("this.surveyForm", this.surveyFormGroup);
    console.log('Delegate add survey: ', this.surveyFormGroup.value);
    const dto: SurveyDto = new SurveyDto(this.surveyFormGroup.value);
    console.log(this.surveyFormGroup.value)
    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.surveyService.addSurvey(dto);
    } else {
      subscription = this.surveyService.addSurvey(this.surveyFormGroup.value); // A remplacer par un update ? 
    }
    subscription.subscribe(() => this.goHome())
  }

  InsertQuestion() {
    //console.log('Insert')
    this.showInput = !this.showInput
    //this.passenger.push(
    //new FormGroup({
    //   addNewQuestion: new FormControl(''),
    // })
    //);


    this.dialog.open(SurveyMatDialogComponent, {
      ///data:s,
      height: '450px',
      width: '600px'

    })
      .afterClosed().subscribe((result) => {
      })
  }

  InsertSelect() {
    this.showSelect = !this.showSelect
  }


  public nextStape(): void {
    this.router.navigate(['/', 'question'])
  }

  public goHome(): void {
    this._location.back();
  }

  public addCurrentQuestion(): void {
    var questionId = ((<HTMLInputElement>document.getElementById("addCurrentQuestion")).value);
    console.log("idQuestion :", questionId);

    this.questionService.findOne(parseInt(questionId))
      .subscribe((question: Question) => {
        this.questionToAdd = question;
        console.log(this.questionToAdd);
        this.questions.push(question);
        console.log(this.questions)
        console.log(((<HTMLInputElement>document.getElementById("questions"))));
        this.allQuestions.splice(
          this.allQuestions.findIndex((q: Question) => q.getId() === question.getId()),
          1);
      });

  }

}


