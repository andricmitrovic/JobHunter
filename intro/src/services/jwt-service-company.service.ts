import { Company } from './../app/companies/models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceCompanyService {
  private static readonly TOKENID: string = "JWT_TOKEN";

  constructor() { }
  public getToken(): string {
    const token: string | null = localStorage.getItem(JwtServiceCompanyService.TOKENID);
    if (!token) {
      return '';
    }
    return token;
  }

  public getDataFromToken(): Company | null {
    const token = this.getToken();
    if (token === '') {
      return null;
    }

  const payloadString = token.split(".")[1];
  const userDataJSON = window.atob(payloadString);
  const payload: Company = JSON.parse(userDataJSON);
  return payload;
  }
  public setToken(jwt: string): void {
    localStorage.setItem(JwtServiceCompanyService.TOKENID, jwt);
  }

  public removeToken(): void {
    localStorage.removeItem(JwtServiceCompanyService.TOKENID);
  }
}

