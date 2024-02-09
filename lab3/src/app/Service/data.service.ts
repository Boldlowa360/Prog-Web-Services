import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  characters : string[] = ["bebe","butters","clyde","craig","eric","kenny","kyle","nichole","stan","tolkien","wendy"];
  
  constructor( public http:HttpClient) { }

  async getCharacter(nom:string): Promise<Character>{
    let c = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + nom));
    console.log(c);
    return new Character(c.data[0].Name,c.data[0].age,c.data[0].occupation,c.data[0].grade, c.data[0].episodes.length)
  }
}
