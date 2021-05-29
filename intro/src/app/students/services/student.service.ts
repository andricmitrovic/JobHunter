import { JwtService } from './../../../services/jwt.service';
import { Student } from './../models/student';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject} from 'rxjs';
import { StudentPagination } from './models/student-pagination';
import { catchError, map } from "rxjs/operators";
import { error } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  public readonly studentSubject : Subject<Student> = new Subject<Student>();
  public readonly tokenJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIiwiaWF0IjoxNjE3NzM4NzEzLCJleHAiOjE2MjAzMzA3MTN9.h-H96EdSvm_q6PFrKrjPoi-c5akNVgDynrrq1bTblIw';

  public readonly studentObservable = this.studentSubject.asObservable();

  private readonly urlStudent = "http://localhost:3000/api/students";
  private readonly urlRegistration = "http://localhost:3000/api/registration";
  private readonly urlProfile = "http://localhost:3000/api/profile";
  private readonly urlchangePassword = "http://localhost:3000/api/changePassword";


  constructor(private http: HttpClient, private jwtService:JwtService) { }

  public updateProfile(student: Student) {

    const body = {student : student};
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', this.tokenJwt);
    headers.append('Content-Type', 'application/json');

    return this.http.post<{token : string}>(this.urlProfile, body, {headers}).pipe(
      catchError((error:HttpErrorResponse) => this.handleError(error)),
      map((response: { token: string }) => this.mapResponseToUser(response))
    );

  }

  public getStudents(query: any, page: number = 1, limit: number = 10): Observable<Student[]>
  {

    const data = {
                 page: page.toString(),
                 limit: limit.toString(),
                 adress: query.adress,
                 requiredTechnologies: query.technologies,
                 faculty: query.faculty,
                 searchString: query.searchString
                };

    const params: HttpParams = new HttpParams({fromObject: data})

    const obs: Observable<StudentPagination> = this.http.get<StudentPagination>(this.urlStudent, {params});

    const newObs: Observable<Student[]> =  obs.pipe(
      map((pagination: StudentPagination) => {return pagination.docs})
    );

    return newObs;
  }

  public Login(email: string, password: string): Observable<Student | null>
  {
    const body = {email, password};
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', this.tokenJwt);

    return this.http.post<{token : string}>(this.urlStudent, body, {headers}).pipe(
      catchError((error:HttpErrorResponse) => {window.alert("Invalid email or password! Try again!");
              return new Observable<null>();}),
      map((response: { token: string }) => this.mapResponseToUser(response))
    );
  }

  public changeStudentPassword(email:string, old_password: string, new_password: string): Observable< boolean| null>
  {

    const body = {email, old_password, new_password};

    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', this.tokenJwt);
    //headers.append('Content-Type', 'application/json');

    return this.http.post<{success : boolean}>(this.urlchangePassword , body, {headers}).pipe(
      catchError((error:HttpErrorResponse) => {window.alert("You entered wrong password! Try again!"); return new Observable<null>();}),
      map((response: { success: boolean }) => response.success));

  }

  public deleteStudentAccount(email:string): Observable<string | null>
  {
    const data = {email: email};
    const params: HttpParams = new HttpParams({fromObject: data});

    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.get<{success : string}>(this.urlProfile, {headers, params}).pipe(
      catchError((error:HttpErrorResponse) => this.handleError(error)),
      map((response :{success: string})=>{return response.success})
    );

  }


  public postStudent(student: Student): Observable<Student | null>
  {

    const headers: HttpHeaders = new HttpHeaders();
    headers.append('x-access-token', this.tokenJwt);
    headers.append('Content-Type', 'application/json');

    return this.http.post<Student>("http://localhost:3000/api/registration", student, {headers}).pipe(
        catchError((error: HttpErrorResponse)=>{window.alert("Profile with the same email already exists. Try again!");
                   return new Observable<null>();}));
  }


  private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    console.error(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
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
    location.replace("#/login");
    location.reload();
  }
  public sendUserDataIfExists(): Student | null {
    // Dohvatamo podatke iz JWT
    const payloadData: Student | null = this.jwtService.getDataFromToken();


    // Kreiramo objekat za trenutno registrovanog korisnika i prosledjujemo ga svim pretplacenim komponentama
    const student: Student | null = payloadData
      ? new Student(payloadData.email, payloadData.personalInfo, payloadData.education, payloadData.experience, payloadData.technologies,
        payloadData.languages, payloadData.portfolio, payloadData.img, payloadData.about) : null;

    if (student) {
      this.studentSubject.next(student);
    }
    return student;
  }
}
