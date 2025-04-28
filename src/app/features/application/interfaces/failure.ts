export interface Failure {
    type:     string;
    title:    string;
    status:   number;
    detail:   string;
    instance: string;
    baneo?:   Baneo;
}

export interface Baneo {
    mensaje: string;
    razon:   number;
}
