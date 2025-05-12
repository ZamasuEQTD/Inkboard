export interface Registro {
    id:             string;
    created_at:     Date;
    miniatura:      string;
    titulo:         string;
    contenido:      string;
    comentario_tag?:string;
}

export interface UsuarioRegistro {
    straff_name? :string;
    registrado_en:Date;
}