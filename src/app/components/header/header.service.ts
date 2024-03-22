import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderProvider {
  private formSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  query: Observable<string> = this.formSubject.asObservable();

  constructor() { }

  setQuery(value: string): void {
    this.formSubject.next(value);
  }

  getQuery(): Observable<string> {
    return this.formSubject.asObservable();
  }
}
