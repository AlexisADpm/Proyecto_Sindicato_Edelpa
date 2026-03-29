  import { inject, Injectable } from '@angular/core';
  import { rxResource } from '@angular/core/rxjs-interop';
  import {
    collection,
    collectionData,
    Firestore,
    query,
    where,
    getCountFromServer,
    limit,
    startAfter,
    getDocs,
    QueryDocumentSnapshot,
    DocumentData,
    queryEqual
  } from '@angular/fire/firestore';
  import { defer, forkJoin, from, map, Observable, of } from 'rxjs';
  import { GaleriaInterface, CategoriaConteo } from '../interfaces/galeria.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class GaleriaService {

    private firestore: Firestore = inject(Firestore);

    /**
     * Obtiene una página de imágenes usando Observables.
     */
    obtenerImagenesPaginadas(seccion: string, limite: number, ultimoDoc: QueryDocumentSnapshot<DocumentData> | null): Observable<{ data: GaleriaInterface[], lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
      const coleccionRef = collection(this.firestore, 'galeria');
      const reglas: any[] = [limit(limite)];

      if (seccion.toLowerCase() !== 'todos') {
        reglas.push(where('tipo', '==', seccion.toLowerCase()));
      }

      if (ultimoDoc) {
        reglas.push(startAfter(ultimoDoc));
      }

      const queryFirebase = query(coleccionRef, ...reglas);

      // Convertimos el Promise de getDocs a un Observable
      return from(getDocs(queryFirebase)).pipe(
        map(snapshot => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GaleriaInterface));
          const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
          return { data, lastVisible };
        })
      );
    }

    /**
     * Recurso reactivo para obtener los conteos de un set de categorías.
     */
    public recursoConteosCategorias(categorias: string[]) {
      return rxResource({
        loader: () => this.obtenerConteosPorCategoria(categorias)
      });
    }

    /**
     * Obtiene la cantidad de documentos por cada categoría enviada.
     */
    obtenerConteosPorCategoria(categorias: string[]): Observable<CategoriaConteo[]> {

      return defer (()=>{
        const conteos$ = categorias.map(cat => {
          const q = cat === 'Todos'
            ? collection(this.firestore, 'galeria')
            : query(collection(this.firestore, 'galeria'), where('tipo', '==', cat.toLowerCase()));

          return from(getCountFromServer(q)).pipe(
            map(snapshot => ({
              nombre: cat,
              cantidad: snapshot.data().count
            }))
          );
        });

        return forkJoin(conteos$);
      })
    }

    /**
     * Obtiene las imágenes de una sección específica (sin paginación).
     */
    obtenerImagenesPorSeccion(seccion: string): Observable<GaleriaInterface[]> {
      const q = seccion.toLowerCase() === 'todos'
        ? collection(this.firestore, 'galeria')
        : query(collection(this.firestore, 'galeria'), where('tipo', '==', seccion.toLowerCase()));

      return collectionData(q) as Observable<GaleriaInterface[]>;
    }

  }
