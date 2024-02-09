import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
