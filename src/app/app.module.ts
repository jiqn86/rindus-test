import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom Modules
import { CommonRindusModule } from './modules/common/common-rindus.module';
import { EmployeeListModule } from './modules/employee-list/employee-list.module';
import { TopBarMenuModule } from './modules/top-bar-menu/top-bar-menu.module';

// Material Modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { EmployeeListContainerComponent } from './components/employee-list-container/employee-list-container.component';
import { LoadingComponent } from './components/loading/loading.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeListContainerComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonRindusModule,
    EmployeeListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    TopBarMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
