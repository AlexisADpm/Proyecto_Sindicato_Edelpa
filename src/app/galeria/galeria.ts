import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './galeria.html'
})
export class Galeria {
  categoriaActiva: string = 'Todos';

  categorias: string[] = ['Todos', 'Paseos', 'Cumpleaños', 'Fiestas patrias', 'Navidad', 'Deportes'];

  albums: Album[] = [
    { id: 1, titulo: 'Fiesta de Navidad 2024', categoria: 'Navidad', cantidadFotos: 24, imagenUrl: 'https://www.sindicatoedelpa.cl/datSindicato/nv1.JPG' },
    { id: 2, titulo: 'Paseo Anual', categoria: 'Paseos', cantidadFotos: 15, imagenUrl: 'https://www.sindicatoedelpa.cl/datSindicato/paseo1.jpg' },
    { id: 3, titulo: 'Celebración 18 Septiembre', categoria: 'Fiestas patrias', cantidadFotos: 30, imagenUrl: 'https://www.sindicatoedelpa.cl/datSindicato/paseo2024/pasDat2/IMG_3834.JPG' },
    { id: 4, titulo: 'Torneo de Fútbol', categoria: 'Deportes', cantidadFotos: 12, imagenUrl: 'https://www.sindicatoedelpa.cl/datSindicato/paseo2024/pasDat1/IMG_3428.JPG' },
    { id: 5, titulo: 'Día del Trabajador', categoria: 'Paseos', cantidadFotos: 20, imagenUrl: 'https://www.sindicatoedelpa.cl/datSindicato/paseo2024/pasDat2/IMG_3549.JPG' },
    { id: 6, titulo: 'Paseo de pesca', categoria: 'Deportes', cantidadFotos: 8, imagenUrl: 'https://www.sindicatoedelpa.cl/datDeporte/05Pesca/c1975a93-214b-4c44-9c7f-8e22597913ea.jpg' }
  ];

  get albumsFiltrados() {
    if (this.categoriaActiva === 'Todos') return this.albums;
    return this.albums.filter(a => a.categoria === this.categoriaActiva);
  }

  cambiarCategoria(cat: string) {
    this.categoriaActiva = cat;
  }
}