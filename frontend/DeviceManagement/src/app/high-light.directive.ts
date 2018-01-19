import { Directive, ElementRef, HostListener, HostBinding, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @Input() color: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    // this.highlight(this.color || 'blue');
    this.backgroundColor = this.color;
  }

  @HostListener('mouseleave') 'mouseleave'() {
    this.backgroundColor = 'transparent';
  }


}
