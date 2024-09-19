import { Component, inject } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  reCaptchaService: any = inject(ReCaptchaV3Service);
}
