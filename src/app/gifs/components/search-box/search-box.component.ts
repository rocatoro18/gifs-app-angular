
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl:'./search-box.component.html'
})

export class SearchBoxComponent  {
  constructor(private gifsService: GifsService) { }

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
    //console.log({newTag});
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';;

  }

}
