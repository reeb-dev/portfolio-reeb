import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';
import { techLogo } from '../../data/tech-logos';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  constructor(public i18n: I18nService) {}

  logoFor(tech: string): string | undefined {
    return techLogo(tech);
  }
}
