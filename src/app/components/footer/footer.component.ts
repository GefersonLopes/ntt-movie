import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private store = inject(Store)
  loading: boolean = false;
  ngOnInit(): void {
    this.store.select('loading').subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}
