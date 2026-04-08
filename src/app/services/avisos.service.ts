import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Definimos cómo es un Aviso
export interface Aviso {
  titulo: string;
  fecha: string;
  descripcion: string;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvisosService {
  constructor(private firestore: Firestore) {}

  // Función para obtener la lista de avisos
  getAvisos(): Observable<Aviso[]> {
    const avisosRef = collection(this.firestore, 'avisos');
    return collectionData(avisosRef) as Observable<Aviso[]>;
  }
}
