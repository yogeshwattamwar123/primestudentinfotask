import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(public http: HttpClient) { }
  private api_url = "http://localhost:3000/students/";

  getallstudents() {
    return this.http.get(this.api_url + 'allstudents');
  }

  getstudents(id) {
    return this.http.get(this.api_url + 'students/' + id);
  }

  addStudent(data) {
    return this.http.post(this.api_url + 'addstudents', data);
  }

  editStudent(data, id) {
    return this.http.put(this.api_url + 'editstudents/' + id, data);
  }

  deleteStudent(id) {
    return this.http.delete(this.api_url + 'deletestudents/' + id);
  }
}
