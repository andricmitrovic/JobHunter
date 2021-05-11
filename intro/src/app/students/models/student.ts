import { environment } from "src/environments/environment";

export class Student {
//   private currentImg: number = 0;

  constructor(
    public email: string,
    public personalInfo: {fullName:string, dateOfBirth:Date, password:string, adress?:string, gender?:string},
    public education?: {university:string, faculty:string, gpa:string},
    public experience?: [{company:string, position:string, length:string}],
    public technologies?: [string],
    public languages?: string,
    public portfolio?: {gitHub: string, linkedin:string},
    public img?: string,
    public about?: string,
  ) {
  }


//   get imgSrc(): string {
//     return environment.fileDownloadUrl + this.imgUrls[this.currentImg];
//   }

//   nextImage(): void {
//     this.currentImg++;
//     if (this.currentImg === this.imgUrls.length) {
//       this.currentImg = 0;
//     }
//   }
}
