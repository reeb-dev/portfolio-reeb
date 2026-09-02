import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';
import { I18nService } from '../../services/i18n';
import { Lang } from '../../i18n/content';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  constructor(
    public themeService: ThemeService,
    public i18n: I18nService
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }
}
