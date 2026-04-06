import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss'
})
export class NosotrosComponent {
  valores = [
    { iconClass: 'fa-solid fa-shield-halved', titulo: 'Calidad', desc: 'Seleccionamos los mejores snacks del mercado, garantizando frescura y sabor en cada producto.' },
    { iconClass: 'fa-solid fa-tags', titulo: 'Precio Justo', desc: 'Ofrecemos los mejores precios para que disfrutes tus snacks favoritos sin gastar de más.' },
    { iconClass: 'fa-solid fa-truck-fast', titulo: 'Envío Rápido', desc: 'Entregamos a toda Lima en tiempo récord. Tu pedido llega fresco y en perfectas condiciones.' },
    { iconClass: 'fa-solid fa-headset', titulo: 'Atención Personalizada', desc: 'Nuestro equipo está siempre disponible para ayudarte por WhatsApp y correo electrónico.' }
  ];

  equipo = [
    { nombre: 'Jherson Silva', rol: 'Fundador & CEO', iconClass: 'fa-solid fa-user-tie' },
    { nombre: 'Jefferson Ramírez', rol: 'Jefe de Operaciones', iconClass: 'fa-solid fa-gears' },
    { nombre: 'Joel Zárate', rol: 'Diseñador & Marketing', iconClass: 'fa-solid fa-pen-ruler' }
  ];
}