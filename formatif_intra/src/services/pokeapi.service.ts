import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from 'src/models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  pkmnList : string[] = [];
  pkmns: Pokemon[] = [];

constructor(public http : HttpClient) { }

  // Cette requête est déjà utilisée par le composant list. Il ne faut pas la retirer.
  getPkmnList() : void {
    this.http.get<any>("https://pokeapi.co/api/v2/pokemon/?limit=20").subscribe(x => {
      console.log(x);
      this.pkmnList = [];
      x.results.forEach((p: any) => {
        this.pkmnList.push(p.name);
      });
      console.log(this.pkmnList);
    });
  }

  // Ajoutez votre nouvelle requête ci-dessous :

  async getOnePkmn(nom: string): Promise<any>{
    let x = await lastValueFrom(this.http.get<any>("https://pokeapi.co/api/v2/pokemon/"+nom))
    console.log(x);
    return new Pokemon(x.id,x.name,x.sprites.front_default)
  }

  listPokemon(pokemon : Pokemon){
    this.pkmns.push(pokemon);
    localStorage.setItem("pokemon",JSON.stringify(this.pkmns));
  }
}
