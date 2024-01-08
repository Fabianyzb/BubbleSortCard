/* eslint-disable */

let generatedCards = [];

window.onload = () => {
  document
    .getElementById("generate-btn")
    .addEventListener("click", generateRandomCards);

  document
    .getElementById("sort-btn")
    .addEventListener("click", sortAndShowChanges);
};

let generateRandomNumber = () => {
  let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let indexNumbers = Math.floor(Math.random() * numbers.length);
  return numbers[indexNumbers];
};

let generateRandomSuit = () => {
  let suit = ["diamond", "spade", "heart", "club"];
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
};

function convertCardValue(value) {
  switch (value) {
    case "1":
      return "A";
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    default:
      return value;
  }
}

function getValue(cardValue) {
  switch (cardValue) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(cardValue, 10);
  }
}

let generateRandomCards = () => {
  const numCards = parseInt(document.getElementById("num-cards").value, 10);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  generatedCards = [];
  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const randomSuit = generateRandomSuit();
    card.classList.add(randomSuit);
    const randomNumber = generateRandomNumber();
    card.innerHTML = convertCardValue(randomNumber);
    cardContainer.appendChild(card);
    generatedCards.push({ value: randomNumber, suit: randomSuit });
  }

  cardContainer.innerHTML = "";
  generatedCards.forEach((card) => {
    const clonedCard = document.createElement("div");
    clonedCard.classList.add("card");
    clonedCard.classList.add(card.suit);
    clonedCard.innerHTML = convertCardValue(card.value);
    cardContainer.appendChild(clonedCard);
  });
};

function sortAndShowChanges() {
  const cardsContainer = document.getElementById("card-container");
  const cards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cambiosDificilesContainer = document.getElementById(
    "cambios-dificiles-container"
  );

  cambiosDificilesContainer.innerHTML = "";

  const cardsCopy = generatedCards.map((card) => ({
    value: card.value,
    suit: card.suit,
  }));
  bubbleSortWithChanges(cardsCopy, cambiosDificilesContainer);
}

function bubbleSortWithChanges(cards, cambiosDificilesContainer) {
  const n = cards.length;
  let step = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const valueJ = getValue(cards[j].value);
      const valueJ1 = getValue(cards[j + 1].value);

      if (valueJ > valueJ1) {
        // Swap the cards
        const tempValue = cards[j].value;
        const tempSuit = cards[j].suit;
        cards[j].value = cards[j + 1].value;
        cards[j].suit = cards[j + 1].suit;
        cards[j + 1].value = tempValue;
        cards[j + 1].suit = tempSuit;

        const clonedCards = cards.map((card) => ({
          value: card.value,
          suit: card.suit,
        }));

        step++;
        const stepLabel = document.createElement("span");
        stepLabel.innerText = `PASO ${step}: `;
        cambiosDificilesContainer.appendChild(stepLabel);
        clonedCards.forEach((clonedCard) => {
          const cardElement = document.createElement("div");
          cardElement.classList.add("card");
          cardElement.classList.add(clonedCard.suit);
          cardElement.innerHTML = convertCardValue(clonedCard.value);
          cambiosDificilesContainer.appendChild(cardElement);
        });

        const separator = document.createElement("span");
        separator.innerText = " | ";
        cambiosDificilesContainer.appendChild(separator);
      }
    }
  }
}
