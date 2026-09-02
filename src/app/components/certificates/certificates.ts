import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule],
  templateUrl: './certificates.html',
})
export class CertificatesComponent {
  constructor(public i18n: I18nService) {}
}
