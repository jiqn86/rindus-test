import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogComponent } from './dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
class MatDialogRefStub {
  close() { }
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let data = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [
        DialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build without a problem',
    fakeAsync(() => {
      fixture.detectChanges();

      let compiled = fixture.nativeElement;
      expect(compiled).toBeTruthy();
    })
  );
});
