import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingProvider {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  setLoading(value: boolean): void {
    this.loadingSubject.next(value);
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
