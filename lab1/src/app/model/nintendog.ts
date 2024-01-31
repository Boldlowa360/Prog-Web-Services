export class Nintendog{
    age:number =1;
  
    constructor(public name:string, public imgUrl:string){
  
    }
    dogInfo(){
      return this.name+ " est un Nintendog de "+this.age+" an(s)."
    }
  }