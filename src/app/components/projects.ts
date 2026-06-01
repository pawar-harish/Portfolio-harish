import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Project } from '../services/portfolio.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="projects" class="section projects-section" *ngIf="projects.length > 0">
      <div class="container">
        <div class="section-header" appScrollReveal="reveal">
          <span class="section-tag">What I've Built</span>
          <h2 class="section-title">My <span class="accent">Projects</span></h2>
          <p class="section-subtitle">Some of my recent work and open-source contributions</p>
        </div>
        
        <div class="projects-grid" id="projects-container">
          <article 
            *ngFor="let proj of projects" 
            class="project-card"
            [class.project-card--featured]="proj.status === 'running'"
            appScrollReveal="reveal">
            
            <div *ngIf="proj.status === 'running'" class="project-featured-badge">Active</div>
            
            <div class="project-header">
              <div class="project-icon-wrap">
                <i [class]="proj.faClass || 'fas fa-code' + ' project-icon'"></i>
              </div>
              <div class="project-links">
                <a *ngIf="proj.playStoreUrl" [href]="proj.playStoreUrl" target="_blank" rel="noopener" class="project-link" aria-label="Play Store">
                  <i class="fab fa-google-play"></i>
                </a>
                <a *ngIf="proj.appStoreUrl" [href]="proj.appStoreUrl" target="_blank" rel="noopener" class="project-link" aria-label="App Store">
                  <i class="fab fa-apple"></i>
                </a>
                <a *ngIf="proj.adminUrl || proj.userUrl" [href]="proj.adminUrl || proj.userUrl" target="_blank" rel="noopener" class="project-link" aria-label="Website">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            
            <div class="project-body">
              <h3 class="project-title">{{ proj.title }}</h3>
              <p class="project-description">{{ proj.description }}</p>
              <div class="project-tech-tags">
                <!-- Slice to show max 4 tech tags at once, as in the original Javascript -->
                <span *ngFor="let tech of proj.technologies.slice(0, 4)" class="p-tag">{{ tech }}</span>
              </div>
            </div>
            
            <div class="project-footer">
              <span class="project-category">
                <i [class]="getCategoryIcon(proj.category)"></i> {{ getCategoryText(proj.category) }}
              </span>
              <a [href]="getMainUrl(proj)" target="_blank" rel="noopener" class="project-cta">
                View Work <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      // Filter out hidden projects
      this.projects = data.projects.filter(p => !p.hidden);
    });
  }

  getCategoryText(categories: string[]): string {
    const hasWeb = categories.includes('web');
    const hasMobile = categories.includes('mobile');
    if (hasWeb && hasMobile) return 'Cross-Platform';
    if (hasMobile) return 'Mobile App';
    return 'Web App';
  }

  getCategoryIcon(categories: string[]): string {
    const hasWeb = categories.includes('web');
    const hasMobile = categories.includes('mobile');
    if (hasWeb && hasMobile) return 'fas fa-laptop-code';
    if (hasMobile) return 'fas fa-mobile-alt';
    return 'fas fa-desktop';
  }

  getMainUrl(project: Project): string {
    return project.playStoreUrl || project.adminUrl || project.userUrl || '#';
  }
}
