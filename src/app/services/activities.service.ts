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
    {id: 0, name: 'Factory District', cash: 4000, voters: 200, polls: 50, pic: 'assets/Pictures/Factory.png'},
    {id: 1, name: 'Docks', cash: 3000, voters: 200, polls: 50, pic: 'assets/Pictures/docks.jpg'},
    {id: 2, name: 'Deacon Projects', cash: 1000, voters: 500, polls: 50, pic: 'assets/Pictures/projects.jpg'},
    {id: 3, name: 'Golden Heights', cash: 8000, voters: 100, polls: 50, pic: 'assets/Pictures/luxury.jpg'}
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
        p.polls -= Math.floor(Math.random() * 2);
      }
    }
  }

  addDisapproval(product){
    for (let p of this.data) {
      if (p.id === product.id) {
        p.polls -= Math.floor(Math.random() * 8);
      }
    }
  }

  addPolls(product){
    for (let p of this.data) {
      if (p.id === product.id && p.cash >= 0) {
        p.polls += Math.floor(Math.random() * 3);
      }
    }
  }

  addPolling(product){
    for (let p of this.data) {
      if (p.id === product.id) {
        p.voters += Math.floor(Math.random() * 50);
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