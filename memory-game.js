"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "tomato", "Lime", "lightpink", "olive", "gold", "Dodgerblue", "RebeccaPurple", "cyan", "FireBrick", "HotPink",
  "tomato", "Lime", "lightpink", "olive", "gold", "Dodgerblue", "RebeccaPurple", "cyan", "FireBrick", "HotPink",
];


const colors = shuffle(COLORS);
//Setting total count for matching pairs
let totalPairs=10;
//Setting default Booleans for use in functions
let flipped=false;
let playable=true;
//These represent first and second cards when selected
let card1, card2;


createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  //This is to ensure each row contains 4 cards
  let cards=0;

  const gameBoard = document.getElementById("game");

  let s1=document.createElement("div");
  let s2=document.createElement("div");
  let s3=document.createElement("div");
  let s4=document.createElement("div");
  let s5=document.createElement("div");

  s1.className=("section");
  s2.className=("section");
  s3.className=("section");
  s4.className=("section");
  s5.className=("section");

  gameBoard.appendChild(s1);
  gameBoard.appendChild(s2);
  gameBoard.appendChild(s3);
  gameBoard.appendChild(s4);
  gameBoard.appendChild(s5);
  
  for (let color of colors) {
    let square=document.createElement("div");
    square.className=("item");
    square.style.color=color;
    square.addEventListener("click", flipCard);
    if (cards<4){
      s1.appendChild(square);
    }
    if (cards>=4 && cards<8){
      s2.appendChild(square);
    }
    if (cards>=8 && cards<12){
      s3.appendChild(square);
    }
    if (cards>=12 && cards<16){
      s4.appendChild(square);
    }
    if (cards>=16 && cards<20){
      s5.appendChild(square);
    }
    cards++
  }
}

/** Flip a card face-up. */

function flipCard(){  
  if(playable===false){
    return
  };

  if(flipped===false){
    card1=this;
    card1.style.backgroundColor=card1.style.color;
    flipped=true;
  } 
  else{
    card2=this;
    card2.style.backgroundColor=card2.style.color;
    playable=false;

      if(isPair()){
        display("Correct! Great Job!");
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        totalPairs--;
        console.log(totalPairs);
        if (totalPairs==0){
          alert("WooHoo! Congrats You Won!")
        }
      } 
      else {
        display("Try Again!");
        unFlipCards(card1, card2);
      }
      reset();  
  }
}



/** Flip a card face-down. */

function unFlipCards(card1, card2) {
  setTimeout(function(){
    card1.style.backgroundColor="silver";
    card2.style.backgroundColor="silver";
  }, 1000);
}

// Did Not need this function

/* 
function handleCardClick() {

}
*/

/** Check if card1 and card2 form matching pair **/

function isPair(){
  return (card1.style.color===card2.style.color) && (card1!==card2);
}

function display(string) {
  let display=document.querySelector("h1");
  display.innerHTML=string;
  setTimeout(function() {
    display.innerHTML="Welcome to Memory Game!";
  }, 1000);
}

function reset() {
  setTimeout(function(){
    card1=undefined;
    card2=undefined;
    flipped=false;
    playable=true;
  }, 1000);
}

