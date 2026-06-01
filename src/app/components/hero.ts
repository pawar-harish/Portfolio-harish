import { Component, OnInit, OnDestroy, signal, ChangeDetectorRef } from '@angular/core';
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
            <span class="typed-text">
              {{ displayText() }}<span class="typing-cursor">|</span>
            </span>
          </h2>
          <p class="hero-intro">
            A passionate <strong>MEAN Stack Developer</strong> with <strong>3+ years</strong> of experience crafting
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
  displayText = signal('');
  private phrases = [
    'Angular Apps',
    'Web Interfaces',
    'SPA Solutions',
    'Clean UI/UX',
    'TypeScript Code',
  ];
  private phraseIdx = 0;
  private timerId?: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
  }

  private startTypewriter(): void {
    let charIdx = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = this.phrases[this.phraseIdx];
      
      if (isDeleting) {
        this.displayText.set(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        this.displayText.set(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      // Explicitly mark for checking in Zoneless/OnPush setups
      this.cdr.markForCheck();

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
        typeSpeed = 400; // Pause when empty
      }

      this.timerId = setTimeout(type, typeSpeed);
    };

    type();
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
