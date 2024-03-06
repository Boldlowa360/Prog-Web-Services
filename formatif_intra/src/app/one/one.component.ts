import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';
import { PokeapiService } from 'src/services/pokeapi.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  nomPokemon: string="";
  monPokemon? :Pokemon;
  constructor(public pokeApi : PokeapiService) { }
  jsonData : string|null = null;


  ngOnInit() {   
  }

  async recherche() : Promise<void>{
    this.monPokemon = await this.pokeApi.getOnePkmn(this.nomPokemon);
  }

  pkmns : Pokemon[] =[];
  favorite():void{

    this.jsonData = localStorage.getItem("pokemon");
    if(this.jsonData == null){
      if(this.monPokemon != undefined){
        this.pkmns.push(this.monPokemon)
      }
    }else{
      this.pkmns = JSON.parse(this.jsonData);
      if(this.monPokemon != undefined){
        this.pkmns.push(this.monPokemon)
      }
    }
    localStorage.setItem("pokemon",JSON.stringify(this.monPokemon));
    console.log("transfert")

    // 1 - Essayer de récupérer l'ancienne liste dans le stockage local
    // 2 - S'il y en a une, PUSH le nouveau pokémon dedans
    // 3 - Sinon, préparer un tableau vide et PUSH le nouveua pokémon dedans
    // 4 - Remplacer le stockage local par le nouveau tableau


  }
}
