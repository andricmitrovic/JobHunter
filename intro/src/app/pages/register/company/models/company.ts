
export class Company {
//   private currentImg: number = 0;

  constructor(
    public email: string,
    public personalInfo: {fullName:string, web?:String, password:string, adress?:string},
    public positions?: [{positionName?:string, positionExp?:string, length?:string, technologies?:[string], languages?: [string]}],
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
