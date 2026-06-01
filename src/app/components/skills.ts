import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../services/portfolio.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="skills" class="section skills-section" *ngIf="skills.length > 0">
      <div class="container">
        <div class="section-header" appScrollReveal="reveal">
          <span class="section-tag">What I Know</span>
          <h2 class="section-title">My <span class="accent">Skills</span></h2>
          <p class="section-subtitle">Technologies and tools I work with every day</p>
        </div>
        
        <div class="skills-filter" appScrollReveal="reveal">
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'all'" 
            (click)="setFilter('all')">
            All Skills
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'frontend'" 
            (click)="setFilter('frontend')">
            Frontend
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'backend'" 
            (click)="setFilter('backend')">
            Backend
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'tools'" 
            (click)="setFilter('tools')">
            Tools
          </button>
        </div>

        <div class="skills-grid" id="skills-container">
          <div 
            *ngFor="let skill of filteredSkills; let i = index"
            class="skill-box"
            [style.animation-delay]="(i % 10) * 0.05 + 's'">
            <div class="skill-box-icon">
              <!-- Render font-awesome icon if faClass is defined -->
              <i *ngIf="skill.faClass" [class]="skill.faClass"></i>
              <!-- Fallback to custom SVG icon if faClass is not defined -->
              <img 
                *ngIf="!skill.faClass && skill.icon" 
                [src]="skill.icon" 
                [alt]="skill.name"
                (error)="handleImageError($event)" />
              <i *ngIf="!skill.faClass && !skill.icon" class="fas fa-code"></i>
            </div>
            <span class="skill-box-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  filteredSkills: Skill[] = [];
  activeFilter = 'all';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      // Filter out hidden skills
      this.skills = data.skills.filter(s => !s.hidden);
      this.applyFilter();
    });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  handleImageError(event: any): void {
    // If SVG fails to load, replace with fontawesome code icon
    event.target.outerHTML = '<i class="fas fa-code"></i>';
  }

  private applyFilter(): void {
    if (this.activeFilter === 'all') {
      this.filteredSkills = this.skills;
    } else {
      this.filteredSkills = this.skills.filter(s => s.category === this.activeFilter);
    }
  }
}
