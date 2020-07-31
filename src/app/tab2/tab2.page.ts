import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { Character } from '../Models/character';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  displayCharacter: Character [];

  constructor(private data: DataService) {
    data.getAllCharacter().subscribe( list =>{

      var filtered = [];
      for(let i =0; i<list.length; i++){
        var m = list[i];
        if(m.name == "mySelect"){
          filtered.push(m);
        }
      }


    console.log(this.displayCharacter);
    this.displayCharacter = list;
    });
    
  }

  onChange(mySelect) {
    console.log(mySelect);
  }

}
