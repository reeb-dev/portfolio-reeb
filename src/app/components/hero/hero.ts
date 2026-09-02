import { Component } from '@angular/core';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  constructor(public i18n: I18nService) {}
}
