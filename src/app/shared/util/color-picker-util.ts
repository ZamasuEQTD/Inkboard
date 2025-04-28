export class ColorPicker {
  static colors: string[] = [
    'bg-yellow-500',
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-gray-500',
    'bg-lime-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-cyan-500',
    'bg-fuchsia-500',
    'bg-rose-500'
  ];

  private constructor() {}

  static generar(text:string): string {
    return this.generarFromColors(text,this.colors);
  }

  static generarFromColors(text:string, colors : string[]): string {
    if (!text) throw new Error("[text] no puede estar vacía");
    if (!colors.length) throw new Error("[colors] no puede estar vacía");

    let n: number = 0;

    for (let i = 0; i < text.length; i++) {
        n += text.charCodeAt(i);
    }

    const index: number = n % colors.length;

    return colors[index];
  }
}
