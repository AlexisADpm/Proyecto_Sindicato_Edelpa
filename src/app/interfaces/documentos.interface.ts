export interface documentosClasificados{
  tipo: string
  documentos: documentosInterface[]
}

export interface documentosInterface{
  nombre: string,
  tipo: string,
  url: string
}
