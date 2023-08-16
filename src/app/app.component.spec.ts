import { DebugElement, ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect } from '@jest/globals';
import { AppComponent } from './app.component';
import { AppFacadeService } from './app.facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let inputElement: DebugElement;
  let f: ComponentRef<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [AppFacadeService],
    declarations: [AppComponent]
  })
  TestBed.compileComponents();

  fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();

  inputElement = fixture.debugElement.query(By.css('#timerModuleCtrl'));

})

test('нажатие на input должно добавить класс pmc-form-field_focused на форму', () => {
  expect(inputElement.nativeElement).not.toBeNull();
  inputElement.nativeElement.value = 10;
  inputElement.nativeElement.dispatchEvent(new Event('change'));
  fixture.detectChanges();
  expect(fixture.componentInstance.listItems$).toEqual(10);

});

});

