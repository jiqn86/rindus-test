import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() addEmployee: EventEmitter<any> = new EventEmitter();
  @Output() searchText: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**
   * Angular Life Cycle
   */
  ngOnInit(): void { }

  /**
   * Emits an event with the value search
   *
   * @param {string} event The text to search by
   */
  public emitSearchText(event: string): void {
    this.searchText.emit(event);
  }

  /**
   * Emits an event to create  new employee
   */
  public newEmployee(): void {
    this.addEmployee.emit();
  }
}
