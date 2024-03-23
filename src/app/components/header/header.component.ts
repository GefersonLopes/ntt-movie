import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HeaderProvider } from './header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSearchOpen: boolean = false;
  search: string = '';

  constructor(
    private headerProvider: HeaderProvider,
  ) { }

  toggleSearch(): void {
    this.isSearchOpen = true;
  }

  closeSearch(): void {
    this.isSearchOpen = false;
  }

  searchMovie(): void {
    this.headerProvider.setQuery(this.search);
    this.closeSearch();
    this.search = '';
  }

  navigate(): void {
    window.location.href = '/';
  }
}
