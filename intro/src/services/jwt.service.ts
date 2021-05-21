import { Student } from './../app/students/models/student';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  private static readonly TOKENID: string = "JWT_TOKEN";

  constructor() {}

  public getToken(): string {
    const token: string | null = localStorage.getItem(JwtService.TOKENID);
    if (!token) {
      return '';
    }
    return token;
  }

  public getDataFromToken(): Student | null {
    const token = this.getToken();
    if (token === '') {
      return null;
    }

  const payloadString = token.split(".")[1];
  const userDataJSON = window.atob(payloadString);
  const payload: Student = JSON.parse(userDataJSON);
  return payload;
  }

  public setToken(jwt: string): void {
    localStorage.setItem(JwtService.TOKENID, jwt);
  }

  public removeToken(): void {
    localStorage.removeItem(JwtService.TOKENID);
  }
}
