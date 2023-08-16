import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { IItem } from './app.models';
import { ARRAY_ITEMS } from './app.mock';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Injectable()
export class AppFacadeService implements OnDestroy {
  private destroy$: Subject<void>;
  private listItems$: Observable<IItem[]>;
  private mokcs$: BehaviorSubject<IItem[]>;
  private filterLength$: BehaviorSubject<number | null>;
  private filterListArray$: BehaviorSubject<number[]>;
  
  constructor() {
    this.destroy$ = new Subject<void>();
    this.mokcs$ = new BehaviorSubject(ARRAY_ITEMS);
    this.filterLength$ = new BehaviorSubject<number | null>(1000);
    this.filterListArray$ = new BehaviorSubject([965, 200])
    this.listItems$ = combineLatest([
    this.mokcs$,
    this.filterLength$,
    this.filterListArray$,
    ]).pipe(
      distinctUntilChanged(),
      map(([mokcs, filterLength, filterListArray]:[IItem[], number | null, number[]]) => {
          const valueFilterListArray = filterListArray.length ? mokcs?.filter((item: IItem)=>filterListArray?.some((a: number)=>a ===+item.id)): mokcs;
          return (filterLength && filterLength < valueFilterListArray.length ? valueFilterListArray.slice(0, filterLength): valueFilterListArray);
        }),
      takeUntil(this.destroy$),
    );
  }
  public getItems(): Observable<IItem[]> {
     return this.listItems$;
  }

  public setFilterLength(value: number | null): void {
    this.filterLength$.next(value)
  }

  public setFilterListArray(value: number[]): void {
    this.filterListArray$.next(value)
  }

  ngOnDestroy(): void {
      this.destroy$.next();
  }
}
