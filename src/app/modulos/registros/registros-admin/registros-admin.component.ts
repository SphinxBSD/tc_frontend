import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComunidadService } from '../../../services/comunidad/comunidad.service';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-registros-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './registros-admin.component.html',
  styleUrl: './registros-admin.component.css'
})
export class RegistrosAdminComponent {
  comunidadForm: FormGroup;
  formularioActual: string | null = null;
  hideButtons: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  isUpload: boolean = false;

  @ViewChild('documento', { static: false }) fileInput!: ElementRef;

  constructor(private fb: FormBuilder, private comunidadService: ComunidadService) {
    this.comunidadForm = this.fb.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required]
    });
  }

  empresa = {
    nombre: '',
    direccion: ''
  };


  // Función para mostrar el formulario correspondiente
  mostrarFormulario(tipo: string) {
    this.formularioActual = tipo;
    this.hideButtons = true;
  }

  // Funciones para manejar el envío de los formularios
  submitEmpresa() {
    console.log('Datos de Empresa:', this.empresa);
    // Aquí puedes manejar la lógica para registrar la empresa
  }

  submitComunidad() {

    if (this.comunidadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.comunidadForm.get('nombre')?.value);
      formData.append('departamento', this.comunidadForm.get('departamento')?.value);
      formData.append('provincia', this.comunidadForm.get('provincia')?.value);
      formData.append('municipio', this.comunidadForm.get('municipio')?.value);
      formData.append('documento', this.selectedFile);

          // Define un observer para manejar los resultados de la suscripción
    const comunidadObserver = {
      next: (response: any) => {
        console.log('Comunidad registrada exitosamente', response);
        this.comunidadForm.reset();
        this.selectedFile = null;
        this.selectedFileName = '';
        this.isUpload = false;
        // Aquí puedes añadir lógica adicional, como redirigir o mostrar un mensaje de éxito
      },
      error: (err: any) => {
        console.error('Error al registrar la comunidad', err);
        // Manejo del error, como mostrar un mensaje al usuario
      },
      complete: () => {
        console.log('Proceso de registro completado');
      }
    };

    // Suscríbete al servicio utilizando el observer
    this.comunidadService.registrarComunidad(formData).subscribe(comunidadObserver);
    }


    console.log('Datos de Comunidad:', this.comunidadForm.value);
    console.log('Archivo seleccionado:', this.selectedFileName);
  }

  showButtons(){
    this.hideButtons = false;
    this.formularioActual = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name; // Guarda el nombre del archivo para mostrarlo
      this.isUpload = true;
      console.log('Archivo seleccionado:', this.selectedFileName);
    }
    
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
