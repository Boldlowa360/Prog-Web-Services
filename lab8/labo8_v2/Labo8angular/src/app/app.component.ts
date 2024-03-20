import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Animal } from 'src/models/animal';
import {last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Inputs
  id : number = 0;
  type : string = "";
  name : string = "";

  animals : Animal[] = [];
  animal ?: Animal;

  constructor(public http:HttpClient){}

  // Récupère tous les animaux dans la base de données
  async getAnimals() : Promise<void>{
    let x = await lastValueFrom(this.http.get<Animal[]>("http://localhost:7150/api/Animals/GetAnimal"));
    console.log(x)
    this.animals = x;
  }

  // Ajoute un animal dans la base de données
  async postAnimal(type:string,name:string) : Promise<void>{
    let newAnimal = new Animal(0,type,name);
    console.log(newAnimal);
    let x = await lastValueFrom(this.http.post<Animal>("http://localhost:7150/api/Animals/PostAnimal",newAnimal));
    console.log(x);
  }

  // Récupère un animal en particulier dans la base de données
  async getAnimal(id:number) : Promise<void>{
    let x = await lastValueFrom(this.http.get<Animal>("http://localhost:7150/api/Animals/GetAnimal/"+id));
    console.log(x)
    this.animal = x;
  }

  // Modifie (ou crée) un animal en particulier dans la base de données
  async putAnimal(id:number, type:string,name:string) : Promise<void>{
    let newAnimal = new Animal(id,type,name);
    let x = await lastValueFrom(this.http.put<Animal>("http://localhost:7150/api/Animals/PutAnimal/"+id,newAnimal));
    console.log(x)
  }

  // Supprime un animal en particulier dans la base de données
  async deleteAnimal(id: number) : Promise<void>{
    let x = await lastValueFrom(this.http.post<Animal>("http://localhost:7150/api/destroy/"+id, id))
    console.log(x);
  }

  // Sussy function
  async deleteAll() : Promise<void>{
    // L
  }

}
