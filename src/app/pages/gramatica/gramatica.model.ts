export interface Gramatica{
    id: number;
    terminais: string[];
    naoTerminais: Producao[];
}

export interface Producao{
    naoTerminal: string;
    producoes: string[];
}