import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY = 'gtE1roSn42iS6gP4WoXPHnKJx2OKo59l'
//api.giphy.com/v1/gifs/search?api_key=gtE1roSn42iS6gP4WoXPHnKJx2OKo59l&q=halo&limit=10
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'gtE1roSn42iS6gP4WoXPHnKJx2OKo59l';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

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

    this.saveLocalStorage();

  }

  private saveLocalStorage() : void {
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() : void {
    if(!localStorage.getItem('history')) return;
    const temporal = localStorage.getItem('history');
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag:string): void{
    //async searchTag(tag:string): Promise<void>{

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    // ESTO NO ES UNA PROMESA, ES UN OBSERVABLE
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp =>{
        //console.log(resp.data);
        this.gifList = resp.data;
        //console.log({gifs:this.gifList});
      });

    // MANERA DE HACERLO FACIL CON JS
    //const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=gtE1roSn42iS6gP4WoXPHnKJx2OKo59l&q=halo&limit=10');
    //.then(resp => resp.json())
    //.then(data => console.log(data));
    //const data = await resp.json();
    //console.log(data);

    // UNSHIFT PARA AGREGAR AL INICIO
    //this._tagsHistory.unshift(tag);
    //console.log(this.tagsHistory);
  }

}
