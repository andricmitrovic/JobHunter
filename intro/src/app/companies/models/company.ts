import { environment } from "src/environments/environment";

export class Company {
//   private currentImg: number = 0;

  constructor(
    public username: string,
    public personalInfo: {fullName:string, email:string, password:string, adress?:string},
    public positions?: [{positionName:string, positionExp:string, length:string, techologies:[string], languages:[string]}],
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
