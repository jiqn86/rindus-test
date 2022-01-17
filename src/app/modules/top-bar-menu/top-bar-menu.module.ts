import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SearchComponent } from './search/search.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    SearchComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    SearchComponent,
    TopBarComponent
  ]
})
export class TopBarMenuModule { }
