export interface Notificacion {
    tipo:                      string;
    id:                        string;
    fecha:                     Date;
    contenido:                 string;
    hilo:                      Hilo;
    comentario_respuesta_tag:  string;
    comentario_respondido_tag?:string;
}

export interface Hilo {
    id:      string;
    titulo:  string;
    portada: string;
}
