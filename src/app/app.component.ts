import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { AppFacadeService } from './app.facade.service';
import { IItem } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AppFacadeService
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public timerModuleCtrl = new FormControl(300);
  public arraySizeModuleCtrl = new FormControl(100);
  public additionalArrayIdsModuleCtrl = new FormControl('');
  public listItems$: Observable<IItem[]>;
  private subscription: Subscription;

  constructor(
    private appFacadeService: AppFacadeService,
  ) {
    this.subscription = new Subscription();
    this.listItems$ = this.appFacadeService.getItems();
    this.subscription.add(
    this.arraySizeModuleCtrl.valueChanges.pipe(
      debounce(() => timer(this.timerModuleCtrl.value ?? 0)),
      tap((value: number | null)=> this.appFacadeService.setFilterLength(value)),
    ).subscribe()
    );
    this.subscription.add(
    this.additionalArrayIdsModuleCtrl.valueChanges.pipe(
     debounce(() => timer(this.timerModuleCtrl.value ?? 0)),
     map((value: string | null)=> value?.length ? value?.replace(' ','').split(',').map((item: string)=>+item): []),
     tap((value: number[])=> this.appFacadeService.setFilterListArray(value)),   
    ).subscribe()
    );
    this.timerModuleCtrl.setValue(300);
    this.arraySizeModuleCtrl.setValue(1000);
    this.additionalArrayIdsModuleCtrl.setValue('200');
  }
  ngOnInit(): void {
      
  }
  public setFloat(value: number): string {
    if(value?.toString()?.split('.')[1].length > 6){
      return value?.toFixed(6) + '...'
    } else {
      return value + '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
