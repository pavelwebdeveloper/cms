import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.show') isOpen = false;

    /*  */
    constructor(private elRef: ElementRef) {}

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;

        const menu = this.elRef.nativeElement.querySelector('.dropdown-menu');
        if (menu) {
          if (this.isOpen) {
            menu.classList.add('show');
          } else {
            menu.classList.remove('show');
          }
        }

    }


    // Close dropdown when clicking outside of it.
    @HostListener('document:click', ['$event'])
    closeWhenClickedOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;

      const menu = this.elRef.nativeElement.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('show');
      }
    }
  }

}