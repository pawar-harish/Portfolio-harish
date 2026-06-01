import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, PersonalInfo } from '../services/portfolio.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="contact" class="section contact-section">
      <div class="container">
        <div class="section-header" appScrollReveal="reveal">
          <span class="section-tag">Let's Talk</span>
          <h2 class="section-title">Get In <span class="accent">Touch</span></h2>
          <p class="section-subtitle">Looking for exciting opportunities or collaborations? I'd love to hear from you!</p>
        </div>
        
        <div class="contact-grid" *ngIf="personalInfo">
          <div class="contact-info" appScrollReveal="reveal-left">
            <h3>Let's work together</h3>
            <p>
              I'm currently <span class="open-badge">Open to Work</span> and looking for exciting
              opportunities. Whether it's a job offer, freelance project, or collaboration, drop me a
              message!
            </p>
            <div class="contact-details">
              <a [href]="'mailto:' + personalInfo.email" class="contact-detail-item">
                <div class="cd-icon"><i class="fas fa-envelope"></i></div>
                <div class="cd-text">
                  <strong>Email</strong>
                  <span>{{ personalInfo.email }}</span>
                </div>
              </a>
              <a [href]="'tel:' + personalInfo.phone" class="contact-detail-item">
                <div class="cd-icon"><i class="fas fa-phone-alt"></i></div>
                <div class="cd-text">
                  <strong>Phone</strong>
                  <span>{{ personalInfo.phone }}</span>
                </div>
              </a>
              <div class="contact-detail-item">
                <div class="cd-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="cd-text">
                  <strong>Location</strong>
                  <span>{{ personalInfo.location }}</span>
                </div>
              </div>
            </div>
            <div class="contact-socials">
              <a [href]="personalInfo.linkedin" target="_blank" rel="noopener" class="cs-link" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent implements OnInit {
  personalInfo?: PersonalInfo;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe(data => {
      this.personalInfo = data.personalInfo;
    });
  }
}
