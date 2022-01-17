import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/modules/common/dialog/dialog.component';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  @Input() dataSource: Employee [] = [];
  @Input() positions: string[] = [];
  @Output() updateCopy: EventEmitter<number> = new EventEmitter();

  displayedColumns: string[] = ['name', 'lastName', 'dob', 'position', 'actions'];
  newEmployeeDate = null;
  maxDate = new Date();

  constructor(private dataService: DataService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  /**
   * Angular Life Cycle
   */
  ngOnInit(): void {
    this.maxDate.setMonth(this.maxDate.getMonth() - (12*18));
  }

  /**
   * Opens a dialog with the employee to be deleted
   *
   * @param {Employee} employee The employee object
   */
  private openDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: employee.name, lastName: employee.lastName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(item => {
          return item.id != employee.id
        });
        this.dataService.saveEmployees(this.dataSource, -1);
        this.updateCopy.emit(employee.id);
        this.openSnackBar('Employee deleted!');
      }
    });
  }

  /**
   * Opens a Snack Bar to show message
   *
   * @param {string} message The message tto show
   */
  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  /**
   * Calls the dialog to confirm th action
   *
   * @param {Employee} employee tThe employee object
   */
  public deleteEmployee(employee:Employee): void {
    this.openDialog(employee);
  }

  public formatDate(employeeDate: any, event: any): void {
    const date: Date = event;
    const month = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    employeeDate = `${month}/${day}/${date.getFullYear()}`;
  }

  /**
   * Persists a new employee in the local storage
   *
   * @param {Employee} employee The employee object to be saved
   */
  public saveEmployee(employee: Employee): void {
    if (employee.name.length < 2 ||
        employee.lastName.length < 2 ||
        !employee.dob ||
        employee.position == '') {
          this.openSnackBar('Please complete all the fields');
          return;
        }
    employee.editMode = false;
    this.dataService.saveEmployees(this.dataSource, -1);
    this.openSnackBar('Employee saved!');
  }
}
