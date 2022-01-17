import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Gets the example data
   *
   * @returns {Observable<[Employee]>}
   */
  public getBaseData(): Observable<[Employee]> {
    const dataUrl = 'assets/data.json';
    return this.http.get<[Employee]>(dataUrl);
  }

  /**
   * Gets the last id for the employees
   *
   * @returns {number}
   */
  public getEmployeeLastId(): number {
    const lastId = localStorage.getItem('rindusEmployeeLastId') || '0';
    return parseInt(lastId);
  }

  /**
   * Gets the position from the endpoint
   *
   * @returns {Observable<any>}
   */
  public getPositions(): Observable<any> {
    const positionUrl = '/api/positions';
    return this.http.get(positionUrl)
      .pipe(
        map((positions: any) => {
          return positions['positions'];
        })
      );
  }

  /**
   * Persists the data in the local storge
   *
   * @param {Employee[]} employees The employees list
   * @param {number} id The last id
   */
  public saveEmployees(employees: Employee[], id = 0) {
    localStorage.setItem('rindusEmployees', JSON.stringify(employees));
    localStorage.setItem('rindusDataLoaded', 'true');
    if (id >= 0) {
      localStorage.setItem('rindusEmployeeLastId', id.toString());
      if (id == 0) {
        localStorage.setItem('rindusEmployeeLastId', employees.length.toString());
      }
    }
  }
}
