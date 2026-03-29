import { Component, HostListener, inject, signal, effect, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaService } from '../../services/galeria.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GaleriaInterface } from '../../interfaces/galeria.interface';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { finalize } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-active-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './active-page.component.html',
})
export class ActivePage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private galeriaService = inject(GaleriaService);

  // Capturamos los parámetros de la ruta como una señal reactiva
  private routeParams = toSignal(this.route.params);

  // Señal computada para obtener el nombre de la sección desde la URL
  sectionName = computed(() => this.routeParams()?.['section'] || '');

  // Estados de carga e imágenes usando señales
  imagenes = signal<GaleriaInterface[]>([]);
  ultimoDoc = signal<QueryDocumentSnapshot<DocumentData> | null>(null);
  cargando = signal<boolean>(false);
  hayMas = signal<boolean>(true);

  private lightbox: PhotoSwipeLightbox | null = null;

  //TODO: Activar scroll infinito y añadir metodo del service de recarga al constructor
  constructor() {
    console.log(this.sectionName());
  }

  ngOnInit() {

    //Obtenemos las imagenes nuevamente al recargar la pagina
    this.galeriaService.obtenerImagenesPaginadas(this.sectionName(),10,null)
    .subscribe({
      next: (result) => {
        this.imagenes.update(prev => [...result.data]);
      },
      error: (error) =>{
        console.log(error);
      }
    });
    console.log();
    this.initLightbox();
  }

  ngOnDestroy() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  }

  initLightbox() {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery-active-page',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    this.lightbox.init();
  }

  resetGallery(section: string) {
    this.imagenes.set([]);
    this.ultimoDoc.set(null);
    this.hayMas.set(true);
    this.cargarMas(section);
  }

  /**
   * Carga de imágenes usando Observables (RxJS)
   */
  cargarMas(section: string) {
    if (this.cargando() || !this.hayMas()) return;

    this.cargando.set(true);

    this.galeriaService.obtenerImagenesPaginadas(section, 10, this.ultimoDoc())
      .pipe(
        finalize(() => this.cargando.set(false))
      )
      .subscribe({
        next: (result) => {
          this.imagenes.update(prev => [...prev, ...result.data]);
          this.ultimoDoc.set(result.lastVisible);

          if (result.data.length < 10) {
            this.hayMas.set(false);
          }
        },
        error: (err) => {
          console.error('Error cargando imágenes:', err);
        }
      });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const pos = (window.innerHeight + window.scrollY);
    const max = document.body.offsetHeight;

    if (pos >= max - 300) {
      this.cargarMas(this.sectionName());
    }
  }
}
