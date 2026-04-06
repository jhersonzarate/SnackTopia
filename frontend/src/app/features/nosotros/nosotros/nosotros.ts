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
    { icon: '🥨', titulo: 'Calidad', desc: 'Seleccionamos los mejores snacks del mercado, garantizando frescura y sabor en cada producto.' },
    { icon: '💰', titulo: 'Precio Justo', desc: 'Ofrecemos los mejores precios para que disfrutes tus snacks favoritos sin gastar de más.' },
    { icon: '🚚', titulo: 'Envío Rápido', desc: 'Entregamos a toda Lima en tiempo récord. Tu pedido llega fresco y en perfectas condiciones.' },
    { icon: '💬', titulo: 'Atención Personalizada', desc: 'Nuestro equipo está siempre disponible para ayudarte por WhatsApp y correo electrónico.' }
  ];

  equipo = [
    { nombre: 'Jherson Silva', rol: 'Fundador & CEO', emoji: '👨‍💼' },
    { nombre: 'Jefferson Ramírez', rol: 'Jefe de Operaciones', emoji: '⚙️' },
    { nombre: 'Joel Zárate', rol: 'Diseñador & Marketing', emoji: '🎨' }
  ];
}