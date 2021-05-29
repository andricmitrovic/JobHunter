import { RegisterComponent } from './../../pages/register/register.component';
import { JwtServiceCompanyService } from './../../../services/jwt-service-company.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Company } from '../models/company';
import { CompanyPagination } from './models/company-pagination';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public readonly companySubject : Subject<Company> = new Subject<Company>();
  public readonly tokenJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIiwiaWF0IjoxNjE3NzM4NzEzLCJleHAiOjE2MjAzMzA3MTN9.h-H96EdSvm_q6PFrKrjPoi-c5akNVgDynrrq1bTblIw';

  public readonly companyObservable = this.companySubject.asObservable();

  private readonly urlCompany = "http://localhost:3000/api/companies";
  private readonly urlRegistration = "http://localhost:3000/api/registrationCompany";
  private readonly urlProfile = "http://localhost:3000/api/profileCompanies";
  private readonly urlchangePassword = "http://localhost:3000/api/changePasswordCompany";

  constructor(private http: HttpClient, private jwtService: JwtServiceCompanyService) { }

  public getCompanies(query: any, page: number = 1, limit: number = 10): Observable<Company[]>
  {
    console.log("From get request");
    console.log(query);

    const data = {
      page: page.toString(),
      limit: limit.toString(),
      adress: query.adress,
      positionSeniority: query.positionSeniority,      // ovo treba enum da bude kasnije
      length: query.length,                        // isto neki enum
      searchString: query.searchString
     };


    const params: HttpParams = new HttpParams({fromObject: data})

    const obs: Observable<CompanyPagination> = this.http.get<CompanyPagination>(this.urlCompany, {params});

    const newObs: Observable<Company[]> =  obs.pipe(
      map((pagination: CompanyPagination) => {return pagination.docs})
    );

    return newObs;
  }
  public updateProfile(company: Company) {

    const body = {company : Company};
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', this.tokenJwt);

    return this.http.post<{token : string}>(this.urlProfile, body, {headers}).pipe(
      catchError((error:HttpErrorResponse) => this.handleError(error)),
      map((response: { token: string }) => this.mapResponseToUser(response))
    );

  }



private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
  const serverError: { message: string; status: number; stack: string } = error.error;
  console.error(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
  return of({ token: this.jwtService.getToken()});
}


private mapResponseToUser(response: { token: string }): Company | null{
  // Cuvamo JWT u memoriju veb pregledaca
  this.jwtService.setToken(response.token);
  // Saljemo podatke o korisniku na osnovu postavljenog JWT tokena
  return this.sendUserDataIfExists();
}
public logoutCompany(): void {
  // Uklanjamo JWT iz memorije i saljemo svim komponentama da korisnik "ne postoji"
  this.jwtService.removeToken();
  this.companySubject.next(undefined);
  location.reload();
}

public sendUserDataIfExists(): Company | null {
  // Dohvatamo podatke iz JWT
  const payloadData: Company | null = this.jwtService.getDataFromToken();


  // Kreiramo objekat za trenutno registrovanog korisnika i prosledjujemo ga svim pretplacenim komponentama
  const company: Company | null = payloadData
    ? new Company(payloadData.email, payloadData.personalInfo, payloadData.positions, payloadData.about) : null;

  if (company) {
    this.companySubject.next(company);
  }
  return company;
}
public Login(email: string, password: string): Observable<Company | null>
{
  const body = {email, password};
  const headers: HttpHeaders = new HttpHeaders();
  headers.append('Authorization', this.tokenJwt);

  return this.http.post<{token : string}>(this.urlCompany, body, {headers}).pipe(
    catchError((error:HttpErrorResponse) => {window.alert("Invalid email or password! Try again!");
            return new Observable<null>();}),
    map((response: { token: string }) => this.mapResponseToUser(response))
  );
}
public changeCompanyPassword(email:string, old_password: string, new_password: string): Observable< boolean| null>
{

  const body = {email, old_password, new_password};

  const headers: HttpHeaders = new HttpHeaders();
  headers.append('Authorization', this.tokenJwt);
  //headers.append('Content-Type', 'application/json');

  return this.http.post<{success : boolean}>(this.urlchangePassword , body, {headers}).pipe(
    catchError((error:HttpErrorResponse) => {window.alert("You entered wrong password! Try again!"); return new Observable<null>();}),
    map((response: { success: boolean }) => response.success));

}

public deleteCompanyAccount(email:string): Observable<string | null>
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


public RegisterCompany(company: Company): Observable<Company>
{
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIn0.LeAxoSHdgvR5coB2vzg0kYKI6DAdXhyOF4fzuzaQ_BU"

  const headers: HttpHeaders = new HttpHeaders().append('x-access-token', token)
  const obs: Observable<Company> = this.http.post<Company>(this.urlRegistration, company, {headers}).pipe(
    catchError((error: HttpErrorResponse)=>{window.alert("Profile with the same email already exists. Try again!");
    return new Observable<null>();}
    ));

  return obs;
}

}
