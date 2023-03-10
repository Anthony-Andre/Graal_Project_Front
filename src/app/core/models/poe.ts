import { PoeType } from "../enums/poe-type";
import { Stagiaire } from "./stagiaire";

export class Poe {
    private id: number = 0;
    private title: string = "";
    private beginDate!: Date;
    private endDate!: Date;
    private type!: PoeType;
    private trainees!: Array<Stagiaire>;
    private oneMonthMailSent: number = 0;
    private sixMonthMailSent: number = 0;
    private oneYearMailSent: number = 0;


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getBeginDate(): Date {
        return this.beginDate;
    }

    public setBeginDate(beginDate: Date): void {
        this.beginDate = beginDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getType(): PoeType {
        return this.type;
    }

    public setPoeType(type: PoeType): void {
        this.type = type;
    }

    public getTrainees(): Array<Stagiaire> {
        return this.trainees;
    }

    public setTrainees(trainees: Array<Stagiaire>): void {
        this.trainees = trainees;
    }

    public getOneMonthMailSent(): number {
        return this.oneMonthMailSent;
    }

    public setOneMonthMailSent(value: number) {
        this.oneMonthMailSent = value;
    }

    public getSixMonthMailSent(): number {
        return this.sixMonthMailSent;
    }

    public setSixMonthMailSent(value: number) {
        this.sixMonthMailSent = value;
    }

    public getOneYearMailSent(): number {
        return this.oneYearMailSent;
    }

    public setOneYearMailSent(value: number) {
        this.oneYearMailSent = value;
    }
}


