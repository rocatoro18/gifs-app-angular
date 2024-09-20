import { Injectable } from '@angular/core';

//const GIPHY_API_KEY = 'gtE1roSn42iS6gP4WoXPHnKJx2OKo59l'
//api.giphy.com/v1/gifs/search?api_key=gtE1roSn42iS6gP4WoXPHnKJx2OKo59l&q=halo&limit=10
@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'gtE1roSn42iS6gP4WoXPHnKJx2OKo59l';

  constructor() { }

  // SE USA PARA EVITAR HACER UNA MUTACION DIRECTA FUERA
  // DEL SERVICIO
  get tagsHistory(){
    // SE USA EL OPERADOR SPREAD PORQUE LOS ARREGLOS PASAN POR REFERENCIA
    // CON EL OPERADOR SPREAD SE CREA UNA COPIA DE LOS VALORES DEL TAG HISTORY
    // ES OPCIONAL, PERO SE USA PARA ROMPER LA REFERENCIA...
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0,10);

  }

  searchTag(tag:string): void{

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    // UNSHIFT PARA AGREGAR AL INICIO
    //this._tagsHistory.unshift(tag);
    //console.log(this.tagsHistory);
  }

}
