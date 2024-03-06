import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  // Liste de favoris temporaire
  pkmns : Pokemon[] =[];

  constructor() { }

  jsonData: string | null = null;
  monPokemon?: Pokemon;
  ngOnInit() {

    this.jsonData = localStorage.getItem("pokemon");
    if(this.jsonData != null){
      this.pkmns = JSON.parse(this.jsonData);
    }
  }

}
