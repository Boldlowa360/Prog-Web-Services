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
  constructor(public http: HttpClient, public route: ActivatedRoute) { }

  async ngOnInit() : Promise<void>{

    this.characterName = this.route.snapshot.paramMap.get("characterName")
    if(this.characterName == undefined){
      this.characterName="kenny"
    }
   
   let c = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + this.characterName));
   console.log(c);
   this.characterDetails = new Character(c.data[0].Name,c.data[0].age,c.data[0].occupation,c.data[0].grade, c.data[0].episodes.length)
  }

}
