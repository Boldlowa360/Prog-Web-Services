import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/services/pokeapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public pokeApi : PokeapiService) { }


  ngOnInit() {
    this.pokeApi.getPkmnList();


  }

}
