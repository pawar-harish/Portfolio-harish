import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="nav-container">
        <a href="#hero" class="nav-logo" (click)="scrollTo('#hero', $event)">
          <span class="logo-bracket">&lt;</span>HP<span class="logo-bracket">/&gt;</span>
        </a>
        <ul class="nav-links" [class.open]="isMenuOpen">
          <li><a href="#about" class="nav-link" [class.active]="activeSection === 'about'" (click)="scrollTo('#about', $event)">About</a></li>
          <li><a href="#skills" class="nav-link" [class.active]="activeSection === 'skills'" (click)="scrollTo('#skills', $event)">Skills</a></li>
          <li><a href="#experience" class="nav-link" [class.active]="activeSection === 'experience'" (click)="scrollTo('#experience', $event)">Experience</a></li>
          <li><a href="#projects" class="nav-link" [class.active]="activeSection === 'projects'" (click)="scrollTo('#projects', $event)">Projects</a></li>
          <li><a href="#contact" class="nav-link" [class.active]="activeSection === 'contact'" (click)="scrollTo('#contact', $event)">Contact</a></li>
        </ul>
        <button class="hamburger" [class.open]="isMenuOpen" (click)="toggleMenu($event)" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  activeSection = 'hero';

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
    this.determineActiveSection();
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  scrollTo(selector: string, event: Event): void {
    event.preventDefault();
    this.isMenuOpen = false;

    const element = document.querySelector(selector);
    if (element) {
      const navHeight = 70; // Matches --nav-h in CSS
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private checkScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  private determineActiveSection(): void {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 120; // Offset for navbar height

    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
