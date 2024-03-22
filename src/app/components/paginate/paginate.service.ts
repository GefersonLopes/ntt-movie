import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginateProvider {
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  loading: Observable<number> = this.pageSubject.asObservable();

  constructor() { }

  setPage(value: number): void {
    if (value !== this.pageSubject.value) {
      this.pageSubject.next(value);
    }
  }

  getPage(): Observable<number> {
    return this.pageSubject.asObservable();
  }
}
