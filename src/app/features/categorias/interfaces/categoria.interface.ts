export interface Categoria {
    nombre:string
    subcategorias : Subcategoria []
}
  
export interface Subcategoria {
    id: string
    imagen : string
    nombre: string
}
  