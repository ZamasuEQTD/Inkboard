import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'autorRole',
})
export class AutorRolePipe implements PipeTransform  {
    static labels: { [key: string]: string } = {
        "Owner": "God",
        "Anonimo": "anon",
        "Moderador": "mod"
    }

    transform(value: keyof typeof AutorRolePipe.labels) :string {
        return AutorRolePipe.labels[value]
    }
}