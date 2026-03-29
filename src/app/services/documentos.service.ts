import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { documentosInterface } from '../interfaces/documentos.interface';


@Injectable({providedIn: 'root'})
export class DocumentosService {

  //Atributo
  private firestore: Firestore = inject(Firestore);

  private queryDocumentos = collection(this.firestore, 'documentos');

  public recursoDocumentos = rxResource({
    loader:()=> collectionData(this.queryDocumentos) as Observable<documentosInterface[]>
  })

}
