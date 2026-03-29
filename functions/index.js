import {setGlobalOptions} from "firebase-functions";

import * as logger from "firebase-functions/logger";
import {onObjectFinalized} from "firebase-functions/v2/storage";
import {getFirestore} from "firebase-admin/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();
setGlobalOptions({maxInstances: 10, region: 'us-central1'});
const db = getFirestore();
export const procesarSubidaImagenesSindicatoV1 = onObjectFinalized(async (event)=>{
  const object = event.data;
  const rutaArchivo = object.name; // Obtencion de ruta del archivo
  const informacionRuta= rutaArchivo.split("/");

  // Estructura oficial de construccion de url para descarga o uso
  const bucket = object.bucket;
  const encodedPath = encodeURIComponent(rutaArchivo);
  const urlDescarga = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;


  // Bloque try catch para verificar subida en Firestore
  try {
    const referenciaDocumento = await db.collection("galeria").add({
      nombre: informacionRuta[2],
      tipo: informacionRuta[1],
      url: urlDescarga,
      subidoEn: new Date(),
    });

    logger.log(`Documento creado con ID: ${referenciaDocumento.id}`);
  } catch (error) {
    logger.error("Error en la subida del documento", error);
  }
});
