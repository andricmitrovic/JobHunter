import { JwtService } from './../../../services/jwt.service';
import { query } from '@angular/animations';
import { Student } from './../models/student';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { StudentPagination } from './models/student-pagination';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public readonly studentSubject : Subject<Student> = new Subject<Student>();
  public readonly tokenJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIiwiaWF0IjoxNjE3NzM4NzEzLCJleHAiOjE2MjAzMzA3MTN9.h-H96EdSvm_q6PFrKrjPoi-c5akNVgDynrrq1bTblIw";

  public readonly studentObservable = this.studentSubject.asObservable();

  private readonly url = "http://localhost:3000/api/students";

  constructor(private http: HttpClient, private jwtService:JwtService) { }

  public getStudents(query: any, page: number = 1, limit: number = 10): Observable<Student[]>
  {
    console.log("From get request");
    console.log(query);

    const data = {
                 page: page.toString(),
                 limit: limit.toString(),
                 adress: query.adress,
                 requiredTechnologies: query.technologies,
                 faculty: query.faculty,
                 searchString: query.searchString
                };

    const params: HttpParams = new HttpParams({fromObject: data})

    const obs: Observable<StudentPagination> = this.http.get<StudentPagination>(this.url, {params});

    const newObs: Observable<Student[]> =  obs.pipe(
      map((pagination: StudentPagination) => {return pagination.docs})
    );

    return newObs;
  }

  public Login(email: string, password: string): Observable<Student | null>
  {
    const body = {email, password};
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', this.tokenJwt)
    return this.http.post<{token : string}>(this.url, body, {headers}).pipe(
      catchError((error:HttpErrorResponse) => this.handleError(error)),
      map((response: { token: string }) => this.mapResponseToUser(response))
    );
  }

  public postStudent(student: Student): Observable<Student>
  {

    const headers: HttpHeaders = new HttpHeaders().append('x-access-token', this.tokenJwt)
    const obs: Observable<Student> = this.http.post<Student>("http://localhost:3000/api/students", student, {headers});

    return obs;
  }


  private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
    return of({ token: this.jwtService.getToken()});
  }


  private mapResponseToUser(response: { token: string }): Student | null{
    // Cuvamo JWT u memoriju veb pregledaca
    this.jwtService.setToken(response.token);
    // Saljemo podatke o korisniku na osnovu postavljenog JWT tokena
    return this.sendUserDataIfExists();
  }

  public logouStudent(): void {
    // Uklanjamo JWT iz memorije i saljemo svim komponentama da korisnik "ne postoji"
    this.jwtService.removeToken();
    this.studentSubject.next(undefined);

  }
  public sendUserDataIfExists(): Student | null {
    // Dohvatamo podatke iz JWT
    const payloadData: Student | null = this.jwtService.getDataFromToken();


    // Kreiramo objekat za trenutno registrovanog korisnika i prosledjujemo ga svim pretplacenim komponentama
    const student: Student | null = payloadData
      ? new Student(payloadData.email, payloadData.personalInfo, payloadData.education, payloadData.experience, payloadData.technologies,
        payloadData.languages, payloadData.portfolio, payloadData.img, payloadData.about) : null;

    if (student)
      this.studentSubject.next(student);
    return student;
  }
}
