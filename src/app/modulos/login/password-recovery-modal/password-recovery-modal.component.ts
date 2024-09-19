import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';  // Importa el servicio

@Component({
  selector: 'app-password-recovery-modal',
  templateUrl: './password-recovery-modal.component.html',
  styleUrls: ['./password-recovery-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PasswordRecoveryModalComponent implements AfterViewInit {
  passwordRecoveryForm!: FormGroup;
  messageType: 'success' | 'error' | '' = '';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userInput', { static: true }) userInput!: ElementRef<HTMLInputElement>;

  text: string = '';
  captcha: boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngAfterViewInit(): void {
    this.triggerFunction();
  }

  // Generate Text
  textGenerator(): string {
    let generatedText = '';
    for (let i = 0; i < 2; i++) {
      generatedText += String.fromCharCode(this.randomNumber(65, 90)); // Capital letters
      generatedText += String.fromCharCode(this.randomNumber(97, 122)); // Small letters
      generatedText += String.fromCharCode(this.randomNumber(48, 57)); // Numbers 0-9
    }
    return generatedText;
  }

  // Generate random numbers between a given range
  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Draw string on canvas
  drawStringOnCanvas(string: string) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
    const letterSpace = 150 / string.length;

    for (let i = 0; i < string.length; i++) {
      const xInitialSpace = 10;
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[this.randomNumber(0, 1)];
      ctx.fillText(string[i], xInitialSpace + i * letterSpace, this.randomNumber(25, 40), 100);
    }
  }

  // Trigger function
  triggerFunction() {
    // this.userInput.nativeElement.value = '';
    this.text = this.textGenerator();
    console.log(this.text);
    this.text = [...this.text].sort(() => Math.random() - 0.5).join('');
    this.drawStringOnCanvas(this.text);
    console.log(this.text);
  }

  verificar(){
    if (this.userInput.nativeElement.value === this.text) {
      this.messageType = 'success'; // Muestra el mensaje de éxito
      this.captcha = true;
    } else {
      this.messageType = 'error'; // Muestra el mensaje de error
      this.triggerFunction(); // Recarga el CAPTCHA
      this.captcha = false;
    }
  }


  onSubmit(username: string, email: string): void {
    console.log('Datos enviados', username, email);
    this.authService.recover(username, email).subscribe({
      next: (response) => {
        // Manejar respuesta exitosa
        alert('Recuperación de contraseña solicitada exitosamente');
      },
      error: (error) => {
        // Manejar error
        console.error('Error al solicitar la recuperación de contraseña:', error);
        alert('Hubo un error. Inténtalo de nuevo.');
      },
    });
  }
}
