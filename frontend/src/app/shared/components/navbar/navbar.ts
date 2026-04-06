import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SubItem { label: string; marca: string; }
interface Categoria { titulo: string; items: SubItem[]; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  @Output() filtrarMarca = new EventEmitter<string>();
  @Output() navegarSeccion = new EventEmitter<string>();

  menuAbierto = false;

  categorias: Categoria[] = [
    {
      titulo: 'Snacks Salados',
      items: [
        { label: 'Inka Chips',  marca: 'inkachips' },
        { label: 'Cheetos',     marca: 'cheetos'   },
        { label: 'Papas Lays',  marca: 'papas'     },
        { label: 'Doritos',     marca: 'doritos'   },
      ]
    },
    {
      titulo: 'Galletas',
      items: [
        { label: 'Galletas Casino',   marca: 'casinos'   },
        { label: 'Galleta Tentación', marca: 'tentacion' },
      ]
    },
    {
      titulo: 'Dulces',
      items: [
        { label: 'Halls',      marca: 'halls'      },
        { label: 'Chupetines', marca: 'chupetines' },
        { label: 'Tridents',   marca: 'tridents'   },
        { label: 'Caramelos',  marca: 'caramelos'  },
      ]
    }
  ];

  toggleMenu(): void { this.menuAbierto = !this.menuAbierto; }
  cerrarMenu(): void { this.menuAbierto = false; }
}