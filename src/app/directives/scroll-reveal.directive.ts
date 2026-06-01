import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('appScrollReveal') animationType: 'reveal' | 'reveal-left' | 'reveal-right' = 'reveal';
  @Input() delay: number = 0; // Delay in milliseconds

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Add the initial animation class
    const nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.classList.add(this.animationType);

    // Create the IntersectionObserver
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (this.delay > 0) {
              setTimeout(() => {
                nativeEl.classList.add('visible');
              }, this.delay);
            } else {
              nativeEl.classList.add('visible');
            }
            
            // Stop observing once the animation triggers
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
