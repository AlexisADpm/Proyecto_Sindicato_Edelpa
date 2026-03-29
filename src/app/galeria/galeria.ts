import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaService } from '../services/galeria.service';
import { GaleriaInterface, CategoriaConteo } from '../interfaces/galeria.interface';
import { Router, RouterLink } from '@angular/router';

interface Album {
  id: number;
  titulo: string;
  categoria: string;
  cantidadFotos: number;
  imagenUrl: string;
}

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galeria.html'
})
export class Galeria {

  //Servicios
  galeriaService = inject(GaleriaService);
  router = inject(Router);

  //Atributos
  categorias: string[] = ['todos', 'paseos', 'cumpleaños', 'fiestas patrias', 'navidad', 'deportes'];

  // Recurso de conteos
  recursoConteos = this.galeriaService.recursoConteosCategorias(this.categorias);


  // Señal computada para obtener los conteos de categorías
  conteosData = computed(() => {
    const data: CategoriaConteo[] | undefined = this.recursoConteos.value();
    return data ?? [];
  });

  categoriaActiva = signal<string>("todos");
  albumsFiltrados = computed(()=>{

    if (this.categoriaActiva() === 'todos') return this.conteosData();
    return this.conteosData().filter(a => a.nombre === this.categoriaActiva())
  });

  constructor() {
    // Efecto para verificar la integridad de los datos en consola
    effect(() => {
      console.log('Conteos por Categoría:', this.conteosData());
    });
  }


  cambiarCategoria(cat: string) {
    console.log(cat);
    this.categoriaActiva.set(cat);
    }
}
