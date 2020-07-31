import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Character } from '../Models/character';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  character: Character = new Character();
  party = [];

  constructor(private data: DataService, private info: SharedService) {}

  onCreate() {
    this.data.saveCharacter(this.character);
    console.log('created', this.character);
  }

  onChange(selectedValue){
    console.info("Selected:",selectedValue);
  }

  ngOnInit() {
    this.party = this.info.getParty();
  }

}
