import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';
import { CompanyCopy } from '../../i18n/content';

@Component({
  selector: 'app-companies',
  imports: [CommonModule],
  templateUrl: './companies.html',
  styleUrl: './companies.css',
})
export class CompaniesComponent {
  constructor(public i18n: I18nService) {}

  logoWell(company: CompanyCopy): NonNullable<CompanyCopy['logoWell']> {
    return company.logoWell ?? 'neutral';
  }
}
