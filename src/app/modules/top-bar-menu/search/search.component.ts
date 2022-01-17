import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEmployee: EventEmitter<any> = new EventEmitter();
  searchText = "";

  constructor() { }

  /**
   * Angular Life Cycle
   */
  ngOnInit(): void { }

  /**
   * Emits an event with the text to search by
   */
  public searchInput(): void {
    this.searchEmployee.emit(this.searchText);
  }
}
