import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoadingProvider } from './loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private loadingProvider: LoadingProvider,
  ) { }

  ngOnInit(): void {
    this.loadingProvider.loading.subscribe((value) => {
      this.loading = value;
    });
  }

}
