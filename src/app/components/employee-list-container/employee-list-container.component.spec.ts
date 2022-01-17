import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService } from 'src/app/services/data.service';
import { LoadingComponent } from '../loading/loading.component';

import { EmployeeListContainerComponent } from './employee-list-container.component';

describe('EmployeeListContainerComponent', () => {
  let component: EmployeeListContainerComponent;
  let fixture: ComponentFixture<EmployeeListContainerComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        EmployeeListContainerComponent,
        LoadingComponent
      ],
      providers: [
        {provide: DataService, useClass: DataService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListContainerComponent);
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

  it('should add a new employee to data surce', () => {
    const serviceSpy = spyOn(dataService, 'getEmployeeLastId').and.returnValue(1);
    const serviceSaveSpy = spyOn(dataService, 'saveEmployees');
    const componentSpy = spyOn(component, 'addEmployee').and.callThrough();
    fixture.detectChanges();
    component.addEmployee();
    expect(component.employeesDataCopy.length).toBeGreaterThan(0);
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSaveSpy).toHaveBeenCalled();
  });
});
