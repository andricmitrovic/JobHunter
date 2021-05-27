import { Subscription } from 'rxjs';
import { StudentService } from './../../students/services/student.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-user-form-update',
  templateUrl: './user-form-update.component.html',
  styleUrls: ['./user-form-update.component.css']
})
export class UserFormUpdateComponent implements OnInit, OnDestroy {

  @Input() student! : Student;
  formUpdateProfile : FormGroup;
  formTechnologies : FormGroup;

  exp :  [{
    company: string;
    position: string;
    length: string;
  }];

  tech : [string];
  sub : Subscription;

  constructor(private fb:FormBuilder, private studentService: StudentService) {

  }

  ngOnInit(): void {

    this.formUpdateProfile = this.fb.group({

      fullName : [this.student.personalInfo.fullName, [Validators.required]],
      about : [this.student.about],
      adress : [this.student.personalInfo.adress],
      gender : [this.student.personalInfo.gender],
      dateOfBirth : [this.student.personalInfo.dateOfBirth],
      gitHub : [this.student.portfolio?.gitHub],
      linkedin : [this.student.portfolio?.linkedin],
      university: [this.student.education?.university],
      faculty: [this.student.education?.faculty],
      gpa: [this.student.education?.gpa, [Validators.min(6.0), Validators.max(10.0)]],
      technologies : new FormArray([]),
      experience : new FormArray([])
    });


    this.exp = this.student.experience;
    this.tech = this.student.technologies;
    this.formUpdateProfile.updateValueAndValidity();

  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();

  }

  public get fullName(){
    return this.formUpdateProfile.get("fullName").value;
  }

  public get address(){
    return this.formUpdateProfile.get("adress").value;
  }
  public get gender(){
    return this.formUpdateProfile.get("gender").value;
  }
  public get dateOfBirth(){
    return this.formUpdateProfile.get("dateOfBirth").value;
  }

  public get gitHub(){
    return this.formUpdateProfile.get("gitHub").value;
  }
  public get linkedin(){
    return this.formUpdateProfile.get("linkedin").value;
  }

  public get about(){
    return this.formUpdateProfile.get("about").value;
  }

  public get university(){
    return this.formUpdateProfile.get("university").value;
  }
  public get faculty(){
    return this.formUpdateProfile.get("faculty").value;
  }

  public get gpa(){
    return this.formUpdateProfile.get("gpa").value;
  }

  get technologies() {
    return this.formUpdateProfile.get('technologies') as FormArray;
  }

  get experience() {
    return this.formUpdateProfile.get('experience') as FormArray;
  }

  public addExperience(){
    const group = this.fb.group({
      company: [''],
      position: [''],
      length : ['']
    });

    this.experience.push(group);
  }
  public deleteExperience(i : number){
    this.experience.removeAt(i);
  }
  public addTech(){
    this.technologies.push(new FormControl (''));
  }

  public deleteTech(i : number){
    this.technologies.removeAt(i);
  }

  public removeExp(i : number){
    this.exp.splice(i, 1);
  }
  public removeTech(i : number){
    this.tech.splice(i, 1);
  }
  public submitChanges(){

    console.log(this.formUpdateProfile);

    this.student.personalInfo = {
        fullName: this.fullName,
        adress: this.address,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        password : this.student.personalInfo.password
      };
    this.student.portfolio = {
      gitHub: this.gitHub,
      linkedin: this.linkedin
    }
    this.student.about = this.about;

    this.student.education = {
      university: this.university,
      faculty : this.faculty,
      gpa : this.gpa
    };

    this.tech.push(this.technologies.value.join(", "));
    this.student.technologies = this.tech;

    this.exp.push(this.experience.value);

    this.student.experience = this.exp;

    console.log(this.student);
    this.sub = this.studentService.updateProfile(this.student).subscribe(
        (student:Student | null)=>{
          this.student = student;
          this.formUpdateProfile.valueChanges.subscribe((student: Student)=>{this.formUpdateProfile.reset()});
        }
      );

  }

}
