import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../services/portfolio.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="experience" class="section experience-section" *ngIf="experienceList.length > 0">
      <div class="container">
        <div class="section-header" appScrollReveal="reveal">
          <span class="section-tag">My Journey</span>
          <h2 class="section-title">Work <span class="accent">Experience</span></h2>
          <p class="section-subtitle">Where I've worked and what I've done</p>
        </div>
        
        <div class="experience-timeline" id="experience-container">
          <div 
            *ngFor="let exp of experienceList" 
            class="exp-card"
            appScrollReveal="reveal">
            <div class="exp-header">
              <div>
                <h3 class="exp-title">{{ exp.position }}</h3>
                <div class="exp-company">{{ exp.company }} &bull; {{ exp.location }}</div>
              </div>
              <div class="exp-date">{{ exp.startDate }} &ndash; {{ exp.endDate || 'Present' }}</div>
            </div>
            
            <p class="exp-desc">{{ exp.description }}</p>
            
            <!-- Responsibilities Bullet Points -->
            <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: var(--text-secondary);" *ngIf="exp.responsibilities && exp.responsibilities.length > 0">
              <li *ngFor="let resp of exp.responsibilities" style="margin-bottom: 0.25rem; font-size: 0.9rem;">
                {{ resp }}
              </li>
            </ul>

            <div class="exp-tech">
              <span *ngFor="let tech of exp.technologies">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent implements OnInit {
  experienceList: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.experienceList = data.experience || [];
    });
  }
}
