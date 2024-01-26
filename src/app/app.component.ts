import { Component } from '@angular/core';
import { Nintendog } from './model/nintendog';
import { imaginaryFriend } from './model/imaginaryFriend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  phrase:string ="Hello there";
  n:number;
  hateList: String[] = ["people playing osu in class","le monde qui écoute de la musique dans écouteur en publique","le monde qui essai de donner le cours à la place du prof"]

  dog:Nintendog;
  constructor(){
    this.n=7;
    this.dog = new Nintendog("losty", "/assets/images/Nintendog.png" )
  }
  formName?:string;
  formOccupation?:string;
  friends:imaginaryFriend[] =[new imaginaryFriend("AkuAsmr", "Artiste Asmr"),new imaginaryFriend("john","fury"), new imaginaryFriend("Lucy", "Vtuber")];

    addFriend(){
      if(this.formName != undefined && this.formOccupation != undefined)
      this.friends.push( new imaginaryFriend(this.formName,this.formOccupation));
      this.formName = "";
      this.formOccupation ="";
    }
    removeLastFriend(){
      this.friends.pop();
    }
    darkMode:boolean = false;
    toggledarkMode(){
      this.darkMode = !this.darkMode;
    }
  }