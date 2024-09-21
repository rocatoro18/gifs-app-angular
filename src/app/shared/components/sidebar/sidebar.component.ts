import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // private gifsService
  constructor(private gifsService: GifsService){}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string) {
    //console.log({newTag});
    this.gifsService.searchTag(tag);
  }

}
