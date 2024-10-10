import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadService } from '../../../services/comunidad/comunidad.service';
import { Comunidad } from '../../../models/comunidad.model';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductosService } from '../../../services/productos/productos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registros-artesano',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './registros-artesano.component.html',
  styleUrl: './registros-artesano.component.css'
})
export class RegistrosArtesanoComponent implements OnInit {

  comunidades: Comunidad[] = [];
  loading: boolean = false;
  error: string = '';

  nombre_com: string = '';
  departamento: string = '';
  municipio: string = '';
  provincia: string = '';
  id_comunidad: number = 0;

  // Variables para el modal
  selectedComunidad: Comunidad | null = null;
  solicitudMensaje: string = '';
  sending: boolean = false;
  sendError: string = '';
  sendSuccess: string = '';
  hideButtons: boolean = false;
  formularioActual: string | null = null;
  opciones:boolean = false;

  hasComunidad: boolean = false;

  productoForm: FormGroup;
  fotos: File[] = [];
  categorias: any[] = [];
  elaboraciones: any[] = [];
  promos: any[] = [];
  productos: any[] = [];
  //comunidades: any[] = []; // Para el registro de artesano

  constructor(
    private comunidadService: ComunidadService,
    private router: Router,
    private fb: FormBuilder,
     private productosService: ProductosService
  ) { 
    this.buscarComunidad();
    this.productoForm = this.fb.group({
      id_categoria: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      id_elaboracion: ['', Validators.required],
      id_promo: [''],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fotos: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productosService.getCategorias().subscribe(data => this.categorias = data);
    this.productosService.getElaboraciones().subscribe(data => this.elaboraciones = data);
    console.log('Categorías:', this.categorias);
    console.log('Elaboraciones:', this.elaboraciones);
    this.getProducts();
  }

    // Obtener productos
    getProducts(): void {
      this.productosService.getProductosByUser().subscribe(
        {
          next: (data) => {
            this.productos = data;
            console.log('Productos:', data);
          },
          error: (error) => {
            console.error('Error al obtener productos:', error);
          }
        }
      );
    }

  mostrarFormulario(tipo: string) {
    //Buscar si el usuario tiene ya una comunidad registrada
    if (tipo === 'comunidad') {
      if (!this.hasComunidad){
        this.fetchComunidades();
      }
      
    }
    this.formularioActual = tipo;
    this.hideButtons = true;
    this.opciones = false;
  }

  showOpciones(){
    this.opciones = true;
    this.hideButtons = true;
  }

  showButtons(){
    this.hideButtons = false;
    this.formularioActual = null;
    this.opciones = false;
  }

  buscarComunidad(){
    this.comunidadService.getComunidadesByUsuario().subscribe({
      next: (data) => {
        if (data){
          this.hasComunidad = true;
          const aux = data[0]
          this.nombre_com = aux.nombre;
          this.departamento = aux.departamento;
          this.municipio = aux.municipio;
          this.provincia = aux.provincia;
          this.id_comunidad = aux.id_comunidad;
        }
      },
      error: (err) => {
        console.error('Error al obtener la comunidad:', err);
      }
    });
  }

  fetchComunidades(): void {
    this.loading = true;
    this.comunidadService.getAllComunidades().subscribe({
      next: (data) => {
        this.comunidades = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener las comunidades:', err);
        this.error = 'Ocurrió un error al obtener las comunidades.';
        this.loading = false;
      }
    });
  }

  handleButtonClick(comunidad: Comunidad): void {
    console.log('ID Comunidad:', comunidad.id_comunidad);
    this.selectedComunidad = comunidad;
    this.solicitudMensaje = '';
    this.sendError = '';
    this.sendSuccess = '';
    // this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  sendSolicitud(comunidad:Comunidad | null): void {
    console.log('Enviando solicitud:', comunidad?.id_usuario);
    if (!this.selectedComunidad) return;

    this.sending = true;
    this.sendError = '';
    this.sendSuccess = '';
    if (comunidad){
      this.comunidadService.sendSolicitud(
        comunidad.id_comunidad,
        comunidad.id_usuario,
        this.solicitudMensaje
      )
      .subscribe({
        next: (response) => {
          this.sending = false;
          this.sendSuccess = 'Solicitud enviada exitosamente.';
          // console.log('Solicitud enviada:', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Solicitud enviada con éxito",
            showConfirmButton: false,
            timer: 2000
          });
          this.solicitudMensaje = '';
          this.selectedComunidad = null;
          // this.router.reload(); // Cerrar el modal al enviar la solicitud exitosamente
          // Cerrar el modal al enviar la solicitud exitosamente
        },
        error: (err) => {
          // console.error('Error al enviar la solicitud:', err);
          this.sendError = 'Ocurrió un error al enviar la solicitud.';
          this.sending = false;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al enviar la solicitud",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }

    
  }

    // Cancelar y limpiar datos
    cancelarSolicitud() {
      this.limpiarDatos();
    }
  
    limpiarDatos() {
      this.solicitudMensaje = '';
      this.selectedComunidad = null;
    }

    onFileChange(event: any) {
      if (event.target.files && event.target.files.length) {
        this.fotos = Array.from(event.target.files);
        if (this.fotos.length < 4) {
          this.productoForm.get('fotos')?.setErrors({ min: true });
        } else {
          this.productoForm.get('fotos')?.setErrors(null);
        }
      }
    }
    

    onSubmit(): void {
      if (this.productoForm.invalid || this.fotos.length < 4) {
        return;
      }
  
      const formData = new FormData();
      formData.append('id_categoria', this.productoForm.get('id_categoria')?.value);
      formData.append('nombre_producto', this.productoForm.get('nombre_producto')?.value);
      formData.append('descripcion', this.productoForm.get('descripcion')?.value);
      formData.append('precio', this.productoForm.get('precio')?.value);
      formData.append('id_elaboracion', this.productoForm.get('id_elaboracion')?.value);
      formData.append('cantidad', this.productoForm.get('cantidad')?.value);
      formData.append('id_comunidad', this.id_comunidad.toString());
  
      this.fotos.forEach((file, index) => {
        formData.append('fotos', file, file.name);
      });

      console.log('Datos del producto:')
      console.log('ID Categoria:', formData.get('id_categoria'));
      console.log('Nombre:', formData.get('nombre_producto'));
      console.log('Descripción:', formData.get('descripcion'));
      console.log('Precio:', formData.get('precio'));
      console.log('ID Elaboración:', formData.get('id_elaboracion'));
      console.log('Cantidad:', formData.get('cantidad'));
      console.log('Fotos:', this.fotos);

      const productosObserver = {
        next: (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto registrado con éxito",
            showConfirmButton: false,
            timer: 2000
          });
          this.productoForm.reset();
          this.fotos = [];
        },
        error: (err: any) => {
          console.error('Error al registrar producto:', err);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al registrar el producto",
            showConfirmButton: false,
            timer: 2000
          });
        },
        complete: () => {
          console.log('Proceso de registro completado');
        }
      };
  
      // Suscríbete al servicio utilizando el observer
      this.productosService.registrarProducto(formData).subscribe(productosObserver);

    }

      // Método para las opciones de edición o eliminación
  editProduct(id_producto: number): void {
    console.log('Editar producto:', id_producto);
    // Implementar lógica de edición
  }

  deleteProduct(id_producto: number): void {
    console.log('Eliminar producto:', id_producto);
    // Implementar lógica de eliminación
  }
  
}
