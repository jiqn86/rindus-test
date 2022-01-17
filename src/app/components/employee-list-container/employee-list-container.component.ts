import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee-list-container',
  templateUrl: './employee-list-container.component.html',
  styleUrls: ['./employee-list-container.component.css']
})
export class EmployeeListContainerComponent implements OnInit {

  isDataLoaded = false;
  employeesData: Employee[] = [];
  employeesDataCopy: Employee[] = [];
  positions: string[] = [];
  onErrorPositions = [
      "full-stack developer",
      "front-end developer",
      "sw admin",
      "help desk",
      "scrum master",
      "product manager"
    ];

  constructor(private dataService: DataService) { }

  /**
   * Angular Life Cycle
   */
  ngOnInit(): void {
    //Simple timeout to show the spinner
    setTimeout(() => {
      this.checkInitialData();
      this.setPositions();
    }, 1500);
  }

  /**
   * Logic to insert a new employee in the data set
   */
  public addEmployee(): void {
    const id = this.dataService.getEmployeeLastId();
    const newEmployee: Employee = {
      id: id > 0 ? (id + 1) : (this.employeesData.length + 1),
      name: '',
      lastName: '',
      dob: null,
      position: '',
      editMode: true
    };
    this.employeesDataCopy.unshift(newEmployee);
    this.dataService.saveEmployees(this.employeesDataCopy, newEmployee.id);
    this.checkInitialData();
  }

  /**
   * Checks if we have data already in the local storage
   * Or sets it for the first time with example data
   */
  private checkInitialData(): void {
    if (localStorage.getItem('rindusDataLoaded')) {
      const storedEmployees = localStorage.getItem('rindusEmployees') || "";
      this.employeesData = JSON.parse(storedEmployees);
      this.employeesDataCopy = this.employeesData;
      this.isDataLoaded = true;
    } else{
      this.dataService.getBaseData().subscribe(
        (resp: [Employee]) => {
          this.employeesData = resp;
          this.employeesDataCopy = this.employeesData;
          this.dataService.saveEmployees(this.employeesData);
          this.isDataLoaded = true;
        }
      );
    }
  }

  /**
   * Requires te positions from the data service
   */
  private setPositions(): void {
    this.dataService.getPositions().subscribe(
      (res: string[]) => {
        this.positions = res;
      },
      () => {
        this.positions = this.onErrorPositions;
      }
    );
  }

  /**
   * Filters the employees by a search text
   *
   * @param {string} searchText The text to filter by
   */
  public filterEmployees(searchText: string): void {
    this.employeesData = this.employeesDataCopy.filter((employee:Employee) => {
      return employee.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
             employee.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
             employee.position.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

  /**
   * Updates a copy of the data when removing an employee
   *
   * @param {number} id The id to remove from the copy
   */
  public updateCopy(id: number): void {
    this.employeesDataCopy = this.employeesDataCopy.filter(employee => employee.id != id)
    this.dataService.saveEmployees(this.employeesDataCopy, -1);
  }

}
