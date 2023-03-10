import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { Survey } from 'src/app/survey/core/models/survey';
import { environment } from 'src/environments/environment';
import { Poe } from '../models/poe';
import { Stagiaire } from '../models/stagiaire';
import { PoeDto } from '../poes/dto/poe-dto';
import { StagiaireService } from './stagiaire.service';


@Injectable({
  providedIn: 'root'
})
export class PoeService {

  private poes: Array<Poe> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/poe`;
  private mailStatus: number = 0;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setBeginDate(inputPoe.beginDate);
            poe.setEndDate(inputPoe.endDate);
            poe.setPoeType(inputPoe.type);
            poe.setTrainees(inputPoe.trainees);
            poe.setOneMonthMailSent(inputPoe.oneMonthMailSent);
            poe.setSixMonthMailSent(inputPoe.sixMonthMailSent);
            poe.setOneYearMailSent(inputPoe.oneYearMailSent);
            return poe;
          })
        })
      )
  }

  public findOne(id: number): Observable<Poe> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(new Date(inputPoe.beginDate));
        poe.setEndDate(new Date(inputPoe.endDate));
        poe.setPoeType(inputPoe.type);
        poe.setTrainees(inputPoe.trainees);
        poe.setOneMonthMailSent(inputPoe.oneMonthMailSent);
        poe.setSixMonthMailSent(inputPoe.sixMonthMailSent);
        poe.setOneYearMailSent(inputPoe.oneYearMailSent);
        return poe;
      })
    )
  }

  public addPoe(poe: PoeDto): Observable<Poe> {
    console.log('add poe : ', poe)
    return this.httpClient.patch<PoeDto>(
      this.controllerBaseUrl,
      poe
    )
      .pipe(
        take(1),
        map((poeDto: PoeDto) => {
          const poe: Poe = new Poe();
          poe.setId(poeDto.id!);
          poe.setTitle(poeDto.title)
          poe.setBeginDate(poeDto.beginDate)
          poe.setEndDate(poeDto.endDate)
          poe.setPoeType(poeDto.type)
          return poe;
        })
      );
  }

  public delete(poe: Poe): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${poe.getId()}`,
      {
        observe: 'response'
      }
    );
  }

  public update(poe: Poe): Observable<Poe> {
    return this.httpClient.put<Poe>(
      this.controllerBaseUrl,
      poe
    )
      .pipe(
        take(1),
        map((anyPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(anyPoe.id!);
          poe.setTitle(anyPoe.title);
          poe.setBeginDate(new Date(anyPoe.beginDate));
          poe.setEndDate(new Date(anyPoe.endDate));
          poe.setPoeType(anyPoe.type);
          return poe;
        })
      )
  }

  public addTrainee(poe: Poe, stagiaire: Stagiaire): Observable<Poe> {
    return this.httpClient.patch<Poe>(
      `${this.controllerBaseUrl}/${poe.getId()}/addTrainee/${stagiaire.getId()}`, poe)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setPoeType(inputPoe.type);
          const trainees: Array<Stagiaire> = [];
          poe.setTrainees(inputPoe.trainees);
          return poe;
        })
      )
  }

  public addTrainees(poe: Poe, stagiaires: Array<Stagiaire>): Observable<Poe> {
    const stagiaireIds: any[] = [];
    for (let stagiaire of stagiaires) { stagiaireIds.push(stagiaire.getId); }
    return this.httpClient.patch<Poe>(
      `${this.controllerBaseUrl}/${poe.getId()}/addTrainees`,
      stagiaireIds
    ).pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id!);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(new Date(inputPoe.beginDate));
        poe.setEndDate(new Date(inputPoe.endDate));
        poe.setPoeType(inputPoe.type);
        poe.setTrainees(inputPoe.trainees);
        return poe;
      })
    )
  }

  public deleteTrainee(poe: Poe, stagiaire: Stagiaire): Observable<Poe> {
    return this.httpClient.patch<Poe>(
      `${this.controllerBaseUrl}/${poe.getId()}/deleteTrainee/${stagiaire.getId()}`,
      ''
    ).pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id!);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(new Date(inputPoe.beginDate));
        poe.setEndDate(new Date(inputPoe.endDate));
        poe.setPoeType(inputPoe.type);
        poe.setTrainees(inputPoe.trainees);
        return poe;
      })
    )
  }


  public clearTrainees(poe: Poe): Observable<Poe> {
    return this.httpClient.patch<Poe>(`${this.controllerBaseUrl}/${poe.getId()}/clearTrainees`, '')
      .pipe(
        take(1),
        map((inputPoe: any) => {
          console.log("inputPoe in clearTrainees",JSON.stringify(inputPoe));
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setPoeType(inputPoe.type);
          poe.setTrainees(inputPoe.trainees);
          console.log("poe in clearTrainees",JSON.stringify(poe));
          return poe;          
        })
      )
  }

  public mailToPoe(poe: Poe, surveyId: number, stopDate: String | null): Observable<Poe> {
    console.log(`Appel au service pour envoi de mail OK`);
    return this.httpClient.patch<Poe>(`${this.controllerBaseUrl}/${poe.getId()}/mailToPoe/${surveyId}`, stopDate)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id!);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setPoeType(inputPoe.type);
          poe.setTrainees(inputPoe.trainees);
          poe.setOneMonthMailSent(inputPoe.oneMonthMailSent);
          poe.setSixMonthMailSent(inputPoe.sixMonthMailSent);
          poe.setOneYearMailSent(inputPoe.oneYearMailSent);
          return poe;
        })
      )  
  }
}
