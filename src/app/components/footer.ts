import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <a href="#hero" class="footer-logo" (click)="scrollToTop($event)">
            <span class="logo-bracket">&lt;</span>HP<span class="logo-bracket">/&gt;</span>
          </a>
          <p class="footer-text">
            Designed &amp; built with <i class="fas fa-heart" style="color:#e74c3c"></i> by
            <strong>Harish Pawar</strong>
          </p>
          <p class="footer-copy">&copy; {{ currentYear }} Harish Pawar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
