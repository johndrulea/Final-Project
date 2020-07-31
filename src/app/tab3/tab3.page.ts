import { SharedService } from './../services/shared.service';
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { CartService } from './../services/activities.service';
import { ModalController } from '@ionic/angular';
import { ActionsPage } from '../pages/actions/actions.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController, private shared: SharedService, private render: Renderer2) {}
 
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
    this.cartService.addFunds(product);
    this.currentFunds += 100;
  }


  addPolls(product){
    this.cartService.addPolls(product);
    this.currentFunds -= 100;
  }

  addPolling(product){
    this.cartService.addPolling(product);
    this.currentFunds -= 100;
  }

  totalVotes(product){
    return this.cartService.totalVotes(product);
  }

  getTotal() {
    return this.products.reduce((i, j) => i + j.cash * j.voters, 0);
  }



  private currentFunds = 1000;
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