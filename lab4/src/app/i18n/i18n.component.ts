import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.css']
})
export class I18nComponent implements OnInit {

  money : number = 30;
  number ?: number;
  language : string = "fr";

  constructor(public translator: TranslateService, ) {
    this.translator.defaultLang = this.language;
    this.translator.use(this.language);
  }

  ngOnInit() {}

  jouer(mise : number) : void{
    if(mise != undefined && mise >= 0 && mise <= 36){
      this.bet = mise;
      this.startGame();
    }
    else{
      alert("Hey arrête de niaiser 😠")
    }
  }

  jouerCouleur(color : string):void{
    this.bet = color;
    this.startGame();
  }

  // █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
  // █ Pas besoin de consulter le code à partir d'ici █
  // █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█

  ballSpeed : number = 0;
  ballTheta : number = 0;
  ballMover : any;
  gameActive : boolean = false;
  bet : any;

  startGame(){

    if(this.money < 5){
      alert("🐖 Tirelire vide ! 🐖");
      return;
    }
    if(this.gameActive){
      return;
    }
    this.money -= 5;
    this.gameActive = true;
    this.ballMover = setInterval(this.moveBall.bind(this), 25);
    this.ballSpeed = Math.round(Math.random() * 37) + 74; 

  }

  moveBall(){

    if(this.ballSpeed <= 0){
      clearInterval(this.ballMover);
      this.gameActive = false;
      this.ballTheta = this.ballTheta % (Math.PI * 2);
      let betTheta = 0;
      if(this.bet == "red"){
        betTheta = (Math.round(this.ballTheta * 37 / (Math.PI * 2)) + 9) % 37;
        console.log(betTheta);
        if(betTheta % 2 == 1){
          this.money += 10;
          document.getElementById("messageRoulette")!.textContent = "+10 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
      else if(this.bet == "black"){
        betTheta = (Math.round(this.ballTheta * 37 / (Math.PI * 2)) + 9) % 37;
        if(betTheta > 0 && Math.round(betTheta) % 2 == 0){
          this.money += 10;
          document.getElementById("messageRoulette")!.textContent = "+10 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
      else if(this.bet != undefined){
        betTheta = (Math.round(this.ballTheta * 37 / (Math.PI * 2)) + 9) % 37;
        console.log("Pari : " + this.bet);
        console.log("Position : " + betTheta);
        if(betTheta == this.bet){
          this.money += 150;
          document.getElementById("messageRoulette")!.textContent = "+150 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
    }
    else{
      this.ballTheta += Math.PI / 740 * this.ballSpeed;
      this.ballSpeed -= 0.5;
      let left = 473 + Math.cos(this.ballTheta) * 130;
      let top = 197 + Math.sin(this.ballTheta) * 130;
      document.getElementById("ball")!.style.left = left + "px";
      document.getElementById("ball")!.style.top = top + "px";
    }

  }

  changeLanguage(lang: string):void{
    this.language = lang;
    this.translator.use(this.language);
  }
}
