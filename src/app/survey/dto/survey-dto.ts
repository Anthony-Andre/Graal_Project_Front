import { Level } from "src/app/core/enums/level";
import { PoeType } from "src/app/core/enums/poe-type";
import { Question } from "src/app/question/core/models/question";

export class SurveyDto {
  public id?: number;
  public title: string = "";
  public poeType!: PoeType;
  public level!: Level;
  public questions: Array<Question> = [];


  public constructor(formValues: any) {
    Object.assign(this, formValues);
    // this.poeType = formValues.type; 
  }

  public setQuestions(questions: Array<Question>) {
    this.questions = questions;
  }

}
