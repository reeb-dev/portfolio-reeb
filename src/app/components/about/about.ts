import { Component } from '@angular/core';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  constructor(public i18n: I18nService) {}
}
