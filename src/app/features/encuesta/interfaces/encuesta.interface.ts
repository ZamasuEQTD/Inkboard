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
