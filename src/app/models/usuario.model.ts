export interface Usuario {
    id_usuario: number;
    username: string;
    email: string;
    nombre: string;
    paterno: string;
    materno: string;
    fecha_nac: Date;
    direccion: string;
    roles: string; // Array de roles del usuario
  }
  