import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content">
          <p class="hero-greeting">
            <span class="greeting-dot"></span>
            Hello, I'm
          </p>
          <h1 class="hero-name">Harish Pawar</h1>
          <h2 class="hero-role">
            <span class="role-prefix">I build</span>
            <span class="typed-text fade-text" [class.fade-out]="isFading">{{ currentPhrase }}</span>
          </h2>
          <p class="hero-intro">
            A passionate <strong>Angular Developer</strong> with <strong>3 years</strong> of experience crafting
            high-performance web applications. I love turning complex problems into elegant,
            responsive user interfaces.
          </p>
          <div class="hero-actions">
            <a href="#projects" class="btn btn-primary" (click)="scrollTo('#projects', $event)">
              <i class="fas fa-rocket"></i> View My Work
            </a>
            <a href="#contact" class="btn btn-secondary" (click)="scrollTo('#contact', $event)">
              <i class="fas fa-paper-plane"></i> Get In Touch
            </a>
          </div>
          <div class="hero-socials">
            <a href="https://linkedin.com/in/harish-pawar-65109a114" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <a href="#about" class="scroll-down" aria-label="Scroll down" (click)="scrollTo('#about', $event)">
        <i class="fas fa-chevron-down"></i>
      </a>
    </section>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  currentPhrase = '';
  isFading = false;
  private phrases = [
    'Angular Apps',
    'Web Interfaces',
    'SPA Solutions',
    'Clean UI/UX',
    'TypeScript Code',
  ];
  private phraseIdx = 0;
  private intervalId?: any;

  ngOnInit(): void {
    this.currentPhrase = this.phrases[0];
    this.intervalId = setInterval(() => this.nextPhrase(), 2500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextPhrase(): void {
    this.isFading = true;
    setTimeout(() => {
      this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      this.currentPhrase = this.phrases[this.phraseIdx];
      this.isFading = false;
    }, 400); // Matches CSS transition duration
  }

  scrollTo(selector: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      const navHeight = 70; // Matches navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
