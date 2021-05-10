export class Student{


constructor(public name : string,  public date:Date, public email: string, public password: string,
            public imgUrl:string){

}

}
import { environment } from "src/environments/environment";
/*
export class Student {
//   private currentImg: number = 0;

  constructor(
    public _id: string,
    public email: string,
    public personalInfo: {fullName:string, adress:string, gender:string, dateOfBirth:string, password:string},
    public username: string,
    public education: {university:string, faculty:string, gpa:string},
    public experience: [{company:string, position:string, length:string}],
    public languages: string,
    public portfolio: {gitHub:string, linkedin:string},
    public img: string,
    public about: string,
  ) {
  }
  */
