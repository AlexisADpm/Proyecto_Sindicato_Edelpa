import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { DocumentosService } from '../services/documentos.service';
import { documentosClasificados, documentosInterface } from '../interfaces/documentos.interface';

@Component({
  selector: 'app-documentos',
  imports: [],
  templateUrl: './documentos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Documentos {

  //Atributos

  tipoDocumentos = ["Documentacion legal","Comunicaciones internas","Protocolos de seguridad"];


  documentosService = inject(DocumentosService);

  documentosDataComputed = computed(()=>{
    const data: documentosInterface[] | undefined= this.documentosService.recursoDocumentos.value();
    return (!data)? []: this.organizarDocumentos(data);
  })


  //Metodos

  /**
   * Metodo que se encarga de organizar documentos de manera automatica inclusive si hay nuevos tipos.
   * Se usa reduce para crear un objeto y luego se almacena en un array para recorrer
   *
   * @param { documentosInterface[] } data - Data de documentos de firebase.
   * @returns {documentosClasificados[]} - Devuelve un array de documentos organizados
   */
  organizarDocumentos(data: documentosInterface[]): documentosClasificados[]{
    const dataDocumentos:documentosClasificados[] = [];
    const documentos = data.reduce((acum, actual)=>{
      if(!acum[actual.tipo]){
        acum[actual.tipo] = [];
      }
      acum[actual.tipo].push(actual);
      return acum;

    }, {} as Record<string, documentosInterface[]>)

    for (let clave in documentos){
      dataDocumentos.push({tipo: clave, documentos: documentos[clave]})
    }
    return dataDocumentos
  };

}



