import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';
import { techLogo } from '../../data/tech-logos';

@Component({
  selector: 'app-stack',
  imports: [CommonModule],
  templateUrl: './stack.html',
  styleUrl: './stack.css',
})
export class StackComponent {
  constructor(public i18n: I18nService) {}

  logoFor(tech: string): string | undefined {
    return techLogo(tech);
  }
}
