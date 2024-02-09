import { DataService } from './../Service/data.service';
import { lastValueFrom } from 'rxjs';
import { Character } from './../models/character';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  characterName: string|null= null;
  characterDetails: Character|null= null;
  constructor(public http: HttpClient, public route: ActivatedRoute, public data:DataService) { }

  async ngOnInit() : Promise<void>{

    this.characterName = this.route.snapshot.paramMap.get("characterName")
    if(this.characterName == undefined){
      this.characterName="kenny"
    }
   
  
   this.characterDetails = await this.data.getCharacter(this.characterName)
  }

}
