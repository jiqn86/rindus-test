import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Employee } from '../models/employee';

import { DataService } from './data.service';

describe('DataService', () => {
  let dataService: DataService;
  let httpService: HttpClient;
  let mockEmployee: [Employee] = [
    {
      id: 1,
      name: 'Jhon',
      lastName: 'Doe',
      dob: '1988-01-09T23:00:00.000Z',
      position: 'scrum master'
    }
  ];

  beforeEach(() => {
    dataService = new DataService(httpService)
  });

  afterEach(() => {
    localStorage.removeItem('rindusDataLoaded');
    localStorage.removeItem('rindusEmployees');
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('Should return base data', () => {
    const serviceSpy = spyOn(dataService, 'getBaseData').and.returnValue(of(mockEmployee));
    dataService.getBaseData().subscribe(
      res => {
        expect(res).toBe(mockEmployee);
      }
    );
  });

  it('Should return a defined id', () => {
    const id = dataService.getEmployeeLastId();
    expect(id).toBeDefined();
  });

  it('Should save a new Employee', () => {
    dataService.saveEmployees(mockEmployee);
    const dataLoaded = localStorage.getItem('rindusDataLoaded');
    expect(dataLoaded).toBe('true');
  });
});
