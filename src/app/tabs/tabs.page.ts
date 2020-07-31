import { SharedService } from './../services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  myFunds: number;
  myPolls: number;

  constructor(private shared: SharedService) {
  this.myFunds = this.shared.funds;
  this.myPolls = this.shared.polls;

  }

}
