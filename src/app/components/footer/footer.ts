import { Component } from '@angular/core';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(public i18n: I18nService) {}
}
