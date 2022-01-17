import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';

import { ListComponent } from './list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from 'src/app/models/employee';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }
}

@Injectable()
class MatDialogRefStub {
  close() { }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
      ],
      declarations: [
        ListComponent
      ],
      providers: [
        {provide: MatSnackBar, useClass: MatSnackBarStub},
        {provide: DataService, useClass: DataService},
        {provide: MatDialogRef, useClass: MatDialogRefStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = fixture.debugElement.injector.get(DataService);
  });

  afterEach(() => {
    localStorage.removeItem('rindusDataLoaded');
    localStorage.removeItem('rindusEmployees');
    localStorage.removeItem('rindusEmployeeLastId');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update the max date', () => {
    const componentSpy = spyOn(component, 'ngOnInit');
    let date = new Date();
    fixture.detectChanges();
    component.ngOnInit();
    date.setMonth(date.getMonth() - (12*18))
    expect(component.maxDate.getMonth()).toBe(date.getMonth());
  });

  it('Should return without saving the employee', () => {
    let employeeMock: Employee = {
      id: 1,
      name: '',
      lastName: '',
      dob: '1988-01-09T23:00:00.000Z',
      position: 'scrum master',
      editMode: true
    };

    const ComponentSpy = spyOn(component, 'saveEmployee');
    fixture.detectChanges();
    component.saveEmployee(employeeMock);
    expect(employeeMock.editMode).toBeTrue();
  });

  it('Should save the employee', () => {
    let employeeMock: Employee = {
      id: 1,
      name: 'Jhon',
      lastName: 'Doe',
      dob: '1988-01-09T23:00:00.000Z',
      position: 'scrum master',
      editMode: true
    };
    const componentSpy = spyOn(component, 'saveEmployee').and.callThrough();
    const serviceSpy = spyOn(dataService, 'saveEmployees');
    fixture.detectChanges();
    component.saveEmployee(employeeMock);
    component.dataSource.push(employeeMock);
    expect(serviceSpy).toHaveBeenCalledOnceWith([employeeMock], -1);
    expect(employeeMock.editMode).toBeFalse();
  });
});
