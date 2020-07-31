import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Product {
  id: number;
  name: string;
  cash: number;
  voters: number;
  polls: number;
  pic: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    {id: 0, name: 'Factory District', cash: 200, voters: 100, polls: 50, pic: 'assets/Pictures/Factory.png'},
    {id: 1, name: 'Docks', cash: 300, voters: 200, polls: 50, pic: 'assets/Pictures/docks.jpg'},
    {id: 2, name: 'Deacon Projects', cash: 100, voters: 500, polls: 50, pic: 'assets/Pictures/projects.jpg'},
    {id: 3, name: 'Golden Heights', cash: 800, voters: 200, polls: 50, pic: 'assets/Pictures/luxury.jpg'}
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 

  constructor() {}
 
  getProducts() {
    return this.data;
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.polls * j.voters, 0);
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addFunds(product){
    for (let p of this.data) {
      if (p.id === product.id) {
        p.cash -= 100;
        p.polls -= 2;
      }
    }
  }

  addPolls(product){
    for (let p of this.data) {
      if (p.id === product.id) {
        p.polls += 1;
      }
    }
  }

  addPolling(product){
    for (let p of this.data) {
      if (p.id === product.id) {
        var totalVotes = p.polls * p.voters;
        return totalVotes;
      }
    }
  }

  totalVotes(product){
    return this.data.reduce((i, j) => i + j.polls * j.voters *.01, 0)
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}