
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl:'./search-box.component.html'
})

export class SearchBoxComponent  {
  constructor() { }

  // VIEW CHILD SIRVE PARA PODER TOMAR
  // UNA REFERENCIA LOCAL
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  /*
  searchTag(newTag: string) {
    console.log({newTag});
  }
  */

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag});
  }

}
