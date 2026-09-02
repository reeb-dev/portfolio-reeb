import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  checked: Record<string, boolean> = {
    android: false,
    webapi: false,
    prod: false,
  };

  constructor(public i18n: I18nService) {}

  getMailtoLink(): string {
    const copy = this.i18n.t().contact;
    const selectedInterests = copy.interests
      .filter((i) => this.checked[i.id])
      .map((i) => i.label)
      .join(', ');

    const subject = encodeURIComponent(copy.mailSubject);
    const body = encodeURIComponent(
      `${copy.mailName}: ${this.name}\n` +
        `Email: ${this.email}\n` +
        `${copy.mailInterest}: ${selectedInterests || copy.mailUnspecified}\n\n` +
        `${copy.mailMessage}:\n${this.message}`
    );

    return `mailto:manuelreeb@icloud.com?subject=${subject}&body=${body}`;
  }
}
