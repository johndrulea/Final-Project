import { Injectable } from '@angular/core';

export interface Party {
  id: number;
  name: string;
  funds: number;
  initialVoters: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  info: Party[] = [
    { id: 0, name: 'Billionaire', funds: 10000, initialVoters: 100},
    { id: 1, name: 'Home Town Hero', funds: 100, initialVoters: 500},
  ];

  funds = 100;
  polls = 50;

  constructor() { }

  getParty(){
    return this.info;
  }

  getFunds(){
    return this.funds;
  }

}


