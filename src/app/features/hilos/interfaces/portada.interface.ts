export interface Portada {
    id:                     string;
    autor_id?:              string;
    recibir_notificaciones?:boolean;
    es_op:                  boolean;
    es_nuevo:               boolean;
    titulo:                 string;
    subcategoria:           string;
    miniatura:              Miniatura;
    banderas:               Banderas;
  }
  
  export interface Banderas {
    es_sticky:         boolean;
    tiene_encuesta:    boolean;
    dados_activado:    boolean;
    id_unico_activado: boolean;
  }
  
  export interface Miniatura {
    spoiler: boolean;
    url:     string;
  }