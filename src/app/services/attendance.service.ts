import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { AttendanceModel } from '../models/Attendance/AttendanceModel';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl=environment.baseApi;
  constructor(public http:HttpClient) { }

  attend(attendanceDTO: AttendanceModel): Observable<any> {
    return this.http.post<AttendanceModel>(`${this.baseUrl}/Attendance`, attendanceDTO);
  }
}
