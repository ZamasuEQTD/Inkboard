export class TagUtil {
    static tag_regex = />>[A-Z0-9]{8}/g
  
    static getTags(texto: string): string[] {
      return Array.from(texto.matchAll(this.tag_regex)).map((match) => match[0]);
    }
  
    static cantidadTags(texto: string): number {
      return this.getTags(texto).length;
    }
  
    static incluyeTag(texto: string, tag: string): boolean {
      return texto.includes( ">>" +tag);
    }
}
  