import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  characterName : string = "";

  constructor(public data: DataService) { }

  ngOnInit() {
    
  }

}
