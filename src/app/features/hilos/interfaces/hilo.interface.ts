import { Media } from "../../application/interfaces/media.interface";

export interface Hilo {
  id:                     string;
  titulo:                 string;
  descripcion:            string;
  autor_id:               null;
  es_op:                  boolean;
  cantidad_comentarios:   number;
  recibir_notificaciones: null;
  subcategoria:           Subcategoria;
  created_at:             Date;
  media:                  Media;
  encuesta?:               Encuesta;
  autor_role:             string;
  autor:         string
}

export interface Encuesta {
  id:               string;
  respuestas:       Respuesta[];
  respuesta_votada: string;
}

export interface Respuesta {
  id:        string;
  respuesta: string;
  votos:     number;
} 

export interface Subcategoria {
  id:     string;
  nombre: string;
  imagen: string;
}

