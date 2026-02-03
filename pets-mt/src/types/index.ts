export interface Pet {
    id: number;
    nome: string;
    raca: string;
    idade: number;
    foto: {
        id: number;
        nome: string;
        contentType: string;
        url: string;
    };
    tutorIds?: number[];
}

export interface Tutor {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cpf?: number;
    foto?: {
        id?: number;
        nome?: string;
        contentType?: string;
        url?: string;
    }
}


export interface PetDetalhes extends Pet {
    tutores?: Tutor[];
}
