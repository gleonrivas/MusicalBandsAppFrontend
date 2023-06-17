import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // @ts-ignore
  @ViewChild("footer", {static: true}) footer: ElementRef;
  ngAfterViewInit() {
    console.log("hello")
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;

    const heigth = Math.max(bodyHeight, windowHeight);
    this.footer.nativeElement.style.top = `${heigth}px`;
  }
  ngOnInit() {
    const resizeObserver = new ResizeObserver(entries => {
      // Se ejecuta cuando se detectan cambios en el tamaño del elemento observado
      const windowHeight = window.innerHeight;
      let bodyHeigth = 0;
      for (const entry of entries) {
        if (entry.target === document.body) {
          // El tamaño del body ha cambiado
          bodyHeigth = entry.contentRect.height;
        }
      }

      const height = Math.max(bodyHeigth, windowHeight) ;

      this.footer.nativeElement.style.top = `${height}px`;
    });

// Observa el elemento body
    resizeObserver.observe(document.body);
  }


}
