import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Character } from '../Models/character';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class DataService {

    allCharacter: Observable<Character[]>;
    characterCollection: AngularFirestoreCollection<Character>; // connection to the database

  constructor(private fb: AngularFirestore) {
    this.characterCollection = fb.collection<Character>('canidates');
   }

  public saveCharacter(character) {
    var plain = Object.assign({},character)
    this.characterCollection.add(plain);
  }

  retrieveCharacterFromDB(){
    this.allCharacter = this.characterCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              let data = a.payload.doc.data();
              var d: any = data.createdOn; // <- firebase data format
              if(d){
                data.createdOn = new firestore.Timestamp(d.seconds, d.nanoseconds).toDate();
              }
              return {... data }
          })
      })
    );
  }

/*  retrieveCharacterFromDB(){
    this.allCharacter = this.characterCollection.valueChanges();
  }
*/
  public getAllCharacter() {
    this.retrieveCharacterFromDB();
    return this.allCharacter;
  }

}

/*
constructor(private fb: AngularFirestore) { 
  this.gameArticleCollection = fb.collection<GameArticle>('Game Articles');
}
Edit it to yours
export class DataService {

allGameArticles: Observable<GameArticle[]>;
gameArticleCollection: AngularFirestoreCollection<GameArticle>;

constructor(private fb: AngularFirestore) { 
  this.gameArticleCollection = fb.collection<GameArticle>('Game Articles');
}

retrieveGameArticlesFromDB(){
  this.allGameArticles = this.gameArticleCollection.valueChanges();
}

public saveGameArticle(saveGameArticle) {
  var plain = Object.assign({}, saveGameArticle);
  this.gameArticleCollection.add(plain);
}

public getAllGameArticles() {
  this.retrieveGameArticlesFromDB();
  return this.allGameArticles;
}
*/

