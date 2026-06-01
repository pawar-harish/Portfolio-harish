import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, observeOn, asyncScheduler } from 'rxjs';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
  profileImage: string;
  resumeUrl: string;
  yearsOfExperience: any;
  statistics: {
    projectsCompleted: number;
    happyClients: number;
    technologiesMastered: number;
  };
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  description: string;
  icon: string;
  faClass: string;
  hidden?: boolean;
}

export interface Experience {
  id: string;
  icon: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  location: string;
  companyUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  imageUrl: string;
  faClass: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  adminUrl?: string;
  userUrl?: string;
  status: string;
  category: string[];
  hidden?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  grade: string;
  location: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private dataUrl = 'assets/data/portfolio.json';
  private portfolioData$?: Observable<PortfolioData>;

  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<PortfolioData> {
    if (!this.portfolioData$) {
      this.portfolioData$ = this.http.get<PortfolioData>(this.dataUrl).pipe(
        shareReplay(1)
      );
    }
    return this.portfolioData$.pipe(observeOn(asyncScheduler));
  }
}
