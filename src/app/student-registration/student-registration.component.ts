import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  studentsForm: FormGroup;
  courseDetails = [];
  allstudents;
  dateofbirth;
  selectedid;
  selectedimage
  constructor(private formBuilder: FormBuilder, private studentservice: StudentsService,
    private datepipe: DatePipe,) { }

  ngOnInit(): void {

    this.courseDetails = [
      {id:'C', course_name: 'C'},
      {id:'C++', course_name: 'C++'},
      {id:'oops', course_name: 'oops'},
      {id:'Angular', course_name: 'Angular'},
    ]

    this.studentsForm = this.formBuilder.group({
      studentname: ['', [Validators.required]],
      fathername: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],
      courseapplied: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required]],
      emailid: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      avatar: [''],
    });

    this.getallstudents();
  }

  getallstudents() {
    this.studentservice.getallstudents()
    .subscribe (res => {
      this.allstudents = res
    })
  }

  onSubmit(form) {console.log(form.value)
    if(this.studentsForm.invalid) {
      return
    }    
    if(this.selectedid) {
      // var data ={
      //   'address' :form.value.address,
      //   'courseapplied' :form.value.courseapplied.id,
      //   'dateofbirth' :form.value.dateofbirth,
      //   'emailid' :form.value.emailid,
      //   'fathername' :form.value.fathername,
      //   'mobilenumber' :form.value.mobilenumber,
      //   'studentname' :form.value.studentname,
      //   'gender' :form.value.gender,
      // }
      var formData: any = new FormData();
      formData.append("address", form.value.address);
      formData.append("courseapplied", form.value.courseapplied.id);
      formData.append("dateofbirth", form.value.dateofbirth);
      formData.append("emailid", form.value.emailid);
      formData.append("fathername", form.value.fathername);
      formData.append("mobilenumber", form.value.mobilenumber);
      formData.append("studentname", form.value.studentname);
      formData.append("gender", form.value.gender);
      formData.append("avatar", this.studentsForm.get('avatar').value);
      this.studentservice.editStudent(formData, this.selectedid)
      .subscribe( res => {
        this.getallstudents();
        this.selectedid = '';
      })
    }
    else {
      // var data ={
      //   'address' :form.value.address,
      //   'courseapplied' :form.value.courseapplied.id,
      //   'dateofbirth' :this.dateofbirth,
      //   'emailid' :form.value.emailid,
      //   'fathername' :form.value.fathername,
      //   'mobilenumber' :form.value.mobilenumber,
      //   'studentname' :form.value.studentname,
      //   'gender' :form.value.gender,
      // }
      var formData: any = new FormData();
      formData.append("address", form.value.address);
      formData.append("courseapplied", form.value.courseapplied.id);
      formData.append("dateofbirth", this.dateofbirth);
      formData.append("emailid", form.value.emailid);
      formData.append("fathername", form.value.fathername);
      formData.append("mobilenumber", form.value.mobilenumber);
      formData.append("studentname", form.value.studentname);
      formData.append("gender", form.value.gender);
      formData.append("avatar", this.studentsForm.get('avatar').value);

      this.studentservice.addStudent(formData)
      .subscribe( res => {
        this.getallstudents();
        this.selectedid = '';
      })
    }
  }

  incomingfile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.selectedimage = (_event.target as FileReader).result; 
    }

    const file = (event.target as HTMLInputElement).files[0];
    this.studentsForm.patchValue({
      avatar: file
    });

    this.studentsForm.get('avatar').updateValueAndValidity()
  }

  formatDate(event) {
    this.dateofbirth = this.datepipe.transform(event, 'yyyy-MM-dd');
    /* console.log(this.bg_expiry_date) */
  }

  bgExpiryDate() {

  }

  editstudents () {
    this.studentservice.getstudents(this.selectedid)
    .subscribe (res => {
      if(res[0]['avatar']) {
        this.selectedimage = res[0]['avatar'];
      }
      this.studentsForm.patchValue ({
        address :res[0]['address'],
        courseapplied :{id:res[0]['courseapplied'], course_name:res[0]['courseapplied']},
        dateofbirth :new Date(res[0]['dateofbirth']),
        emailid :res[0]['emailid'],
        fathername :res[0]['fathername'],
        mobilenumber :res[0]['mobilenumber'],
        studentname :res[0]['studentname'],
        gender :res[0]['gender'],
      })
    })
  }

  deletestudents() {
    this.studentservice.deleteStudent(this.selectedid)
    .subscribe (res => {
      this.getallstudents();
    })
  }
}
