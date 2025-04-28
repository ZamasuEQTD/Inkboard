import { Media } from "../../application/interfaces/media.interface";

export interface ComentariosHilo {
  destacados : Comentario[]
  comentarios : Comentario[]
}

export interface Comentario {
  id:                     string;
  texto:                  string;
  created_at:             Date;
  autor_id?:              string;
  es_autor:               boolean;
  destacado:              boolean;
  respondido_por:             string[];
  responde_a:               string[];
  es_op:                  boolean;
  tag:                   string;
  tag_unico?:            string;
  recibir_notificaciones?:boolean;
  color:                  string;
  dados?:                  string;
  media?:                  Media;
  autor_role:             string;
  autor:                  string

} 