import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PersonalInfo } from '../services/portfolio.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="about" class="section about-section" *ngIf="personalInfo">
      <div class="container">
        <div class="section-header" appScrollReveal="reveal">
          <span class="section-tag">Who I Am</span>
          <h2 class="section-title">About <span class="accent">Me</span></h2>
          <p class="section-subtitle">A little bit about my journey and what drives me</p>
        </div>
        
        <div class="about-grid">
          <div class="about-text" appScrollReveal="reveal-left">
            <p>
              I'm <strong>{{ personalInfo.name }}</strong>, a dedicated Web &amp; Mobile App Developer based in {{ personalInfo.location.split(' - ')[0] }}.
              With <strong>{{ personalInfo.yearsOfExperience }} years of professional experience</strong>, I specialize in building
              scalable, high-performance web applications using Angular, Ionic, and TypeScript.
            </p>
            <p>
              I have worked on authentication systems, responsive UI components, performance
              optimizations, and cross-functional team collaboration. I'm passionate about clean
              code, intuitive UX, and staying up-to-date with the latest in web development.
            </p>
            <p>
              When I'm not coding, you'll find me listening to music, traveling, or exploring new
              technologies. I believe great software starts with a great developer experience.
            </p>
            
            <div class="about-highlights">
              <div class="highlight-item">
                <i class="fas fa-calendar-check"></i>
                <div>
                  <strong>{{ personalInfo.yearsOfExperience }} Years</strong>
                  <span>Experience</span>
                </div>
              </div>
              <div class="highlight-item">
                <i class="fas fa-project-diagram"></i>
                <div>
                  <strong>{{ personalInfo.statistics.projectsCompleted }}+ Projects</strong>
                  <span>Delivered</span>
                </div>
              </div>
              <div class="highlight-item">
                <i class="fas fa-graduation-cap"></i>
                <div>
                  <strong>B.E. Civil</strong>
                  <span>Engineering</span>
                </div>
              </div>
            </div>
            
            <a href="assets/HarishPResume.pdf" download="HarishPResume.pdf" class="btn btn-primary" style="margin-top: 1.5rem; display: inline-flex;">
              <i class="fas fa-download"></i> Download CV
            </a>
          </div>
          
          <div class="about-info-cards" appScrollReveal="reveal-right">
            <div class="info-card">
              <i class="fas fa-map-marker-alt info-icon"></i>
              <div>
                <strong>Location</strong>
                <span>{{ personalInfo.location }}</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-briefcase info-icon"></i>
              <div>
                <strong>Experience</strong>
                <span>{{ personalInfo.yearsOfExperience }} Years Professional</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-code info-icon"></i>
              <div>
                <strong>Specialization</strong>
                <span>Frontend Development</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-language info-icon"></i>
              <div>
                <strong>Languages</strong>
                <span>English, Hindi</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-heart info-icon"></i>
              <div>
                <strong>Interests</strong>
                <span>Music, Travel, Coding</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-check-circle info-icon"></i>
              <div>
                <strong>Status</strong>
                <span>Open to Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent implements OnInit {
  personalInfo?: PersonalInfo;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.personalInfo = data.personalInfo;
    });
  }
}
