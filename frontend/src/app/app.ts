import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { CarritoLateralComponent } from './shared/components/carrito-lateral/carrito-lateral';
import { OverlayComponent } from './shared/components/overlay/overlay';
import { ChatbotComponent } from './shared/components/chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    CarritoLateralComponent,
    OverlayComponent,
    ChatbotComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);

  carritoAbierto = signal(false);
  chatbotAbierto = signal(false);

  abrirCarrito(): void  { this.carritoAbierto.set(true); }
  cerrarCarrito(): void { this.carritoAbierto.set(false); }

  abrirChatbot(): void  { this.chatbotAbierto.set(true); }
  cerrarChatbot(): void { this.chatbotAbierto.set(false); }

  cerrarOverlay(): void {
    this.carritoAbierto.set(false);
    this.chatbotAbierto.set(false);
  }

  navegarDetalle(id: string): void {
    this.router.navigate(['/productos', id]);
  }
}