import { ElementRef, HostListener, Directive, Input } from '@angular/core';

@Directive({
  selector: 'textarea[gaAutosize]',
  host: {
    '(input)': 'adjust()',
    '(clear)': 'adjust()',
  }
})
export class GaAutosizeDirective {

  constructor(public element: ElementRef){}

  ngAfterViewInit(): void {
    this.adjust();
  }

  ngOnChanges(): void {
    this.adjust();
  }

  adjust(): void {
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
  }
}
