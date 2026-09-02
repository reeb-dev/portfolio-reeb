import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-companies',
  imports: [CommonModule],
  templateUrl: './companies.html',
  styleUrl: './companies.css',
})
export class CompaniesComponent {
  constructor(public i18n: I18nService) {}
}
