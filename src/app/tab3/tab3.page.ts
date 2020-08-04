import { Character } from './../Models/character';
import { SharedService } from './../services/shared.service';
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { CartService } from './../services/activities.service';
import { ModalController } from '@ionic/angular';
import { ActionsPage } from '../pages/actions/actions.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
  displayCharacter: Character [];
  currentFunds = 0;
  private current_funds = this.currentFunds;
  opponentVoters = 500;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private data: DataService, private cartService: CartService, private modalCtrl: ModalController, private shared: SharedService, private render: Renderer2) {

    data.getAllCharacter().subscribe( list =>{
      console.log(this.displayCharacter);
      this.displayCharacter = list;
      });

  }

  actualFunds(){
    return this.currentFunds + this.current_funds;
  }
 

  public onShow(controlToShow) {
    this.render.setStyle(controlToShow, 'visibility', 'visible');
  }
  public onHide(controlToHide) {
    this.render.setStyle(controlToHide, 'visibility', 'hidden');
  }

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  addFunds(product){
    for (let p of this.products){
      if(p.id === product.id && p.cash > 0){
        this.cartService.addFunds(product);
        this.current_funds += 1000;
        this.opponentVoters += Math.floor(Math.random() * 10);
      }
      else if(p.cash <= 0){
      alert('You cant get blood from a stone, lose local support')
      this.cartService.addDisapproval(product);  
      this.opponentVoters += Math.floor(Math.random() * 30);
      }
    }

  }


  addPolls(product){
    for (let p of this.products){
      if(p.id === product.id && this.current_funds >= 0){
      this.cartService.addPolls(product);
      this.current_funds -= 100;
      this.opponentVoters += Math.floor(Math.random() * 5);
      }
      else if(this.current_funds <= 0){
      alert('Cant pay your ads, lose local support')
      this.cartService.addDisapproval(product);  
      this.opponentVoters += Math.floor(Math.random() * 40);
      }
    }
 
  }

  addSmear(){
    if(this.current_funds > 0){
    this.current_funds -= 1000;
    this.opponentVoters -= Math.floor(Math.random() * 80);
    }
    else if(this.current_funds <= 0){
    alert('You Broke!  Go Fundraise!')
    }
  }

  addPolling(product){
    for (let p of this.products){
      if(p.id === product.id && this.current_funds >= 0){
        this.cartService.addPolling(product);
        this.current_funds -= 1000;
        this.opponentVoters += Math.floor(Math.random() * 10);
      }
      else if(this.current_funds <= 0){
      alert('Cant pay your pollsters, lose local support')
      this.cartService.addDisapproval(product);  
      this.opponentVoters += Math.floor(Math.random() * 20);
      }
    }

  }

  totalVotes(product){
    return this.cartService.totalVotes(product);
  }

  opponentVotes(product){
    return this.cartService.totalVotes(product);
  }

  getTotal() {
    return this.products.reduce((i, j) => i + j.cash * j.voters, 0);
  }

  
  private currentApproval = 50;

  async openCart() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: ActionsPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
}