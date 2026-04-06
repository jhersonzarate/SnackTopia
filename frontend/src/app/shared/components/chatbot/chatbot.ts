import { Component, signal, ElementRef, ViewChild, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mensaje { rol: 'bot' | 'user'; texto: string; }

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('mensajesRef') mensajesRef!: ElementRef;
  @Output() cerrar = new EventEmitter<void>();

  mensajes = signal<Mensaje[]>([]);
  inputTexto = '';

  readonly menu = `Hola, soy el asistente de Snacktopia. ¿En qué puedo ayudarte?\n\n1. Productos más vendidos\n2. ¿Dónde comprar?\n3. Promociones vigentes\n4. Contacto o ayuda\n5. Salir`;

  constructor() {
    this.mensajes.set([{ rol: 'bot', texto: this.menu }]);
  }

  ngAfterViewChecked(): void {
    if (this.mensajesRef?.nativeElement) {
      this.mensajesRef.nativeElement.scrollTop = this.mensajesRef.nativeElement.scrollHeight;
    }
  }

  enviar(): void {
    const texto = this.inputTexto.trim();
    if (!texto) return;
    this.mensajes.update(m => [...m, { rol: 'user', texto }]);
    this.inputTexto = '';
    setTimeout(() => {
      this.mensajes.update(m => [...m, { rol: 'bot', texto: this.responder(texto) }]);
    }, 400);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.enviar();
  }

  private responder(input: string): string {
    switch (input.trim()) {
      case '1': return 'Nuestros más vendidos:\n1) Papas Inka Chips BBQ\n2) Cheetos Queso Picante\n3) Galletas Casino Fresa';
      case '2': return 'Nos encuentras aquí mismo. También en WhatsApp: +51 999 888 777.';
      case '3': return 'Oferta vigente: Packs de Cheetos con 10% de descuento hasta agotar stock.';
      case '4': return 'Correo: info@snacktopia.pe\nTeléfono: +51 999 888 777\nHorario: Lun-Sáb 9am-6pm';
      case '5': return 'Hasta pronto. Gracias por visitar Snacktopia.';
      default:  return 'Escribe un número del 1 al 5 para recibir información.';
    }
  }
}