import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {

  @Input('appHighlight') highlightColor: string = 'yellow';
  @Input() price: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    // If price exists and is above a certain threshold, apply highlighting
    if (this.price && this.price < 500) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor);
    } else {
      // Optional: Remove highlight for lower-priced books
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
    }
  }
}
