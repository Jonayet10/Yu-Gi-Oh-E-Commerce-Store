(function() {
    "use strict";

    const BASE_URL = 'http://localhost:3000/api/promos';
    let promoSection;

    /**
     * Initializes the promotional cards section by references promo cards DOM element and calling
     * function to fetch promo cards data.
     * @return {void}
     */
    async function init() {
        promoSection = document.getElementById('promo-cards');
        fetchPromoCards();
    }

    /**
     * Fetches promotional cards from the server and displays them.
     * @return {void}
     */
    async function fetchPromoCards() {
        try {
            const response = await fetch(BASE_URL);
            const promoCards = await response.json();
            displayPromoCards(promoCards);
        } catch {
            displayErrorMessage('Failed to load promotional cards.');
        }
    }

    /**
     * Displays the details for the promotional cards on the webpage.
     * @param {Array} cards - array of objects representing the promotional cards
     */
    function displayPromoCards(cards) {
        promoSection.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card-container2';

            const imageElement = document.createElement('img');
            imageElement.src = card.image_url;
            imageElement.alt = card.name;

            const nameElement = document.createElement('h2');
            nameElement.textContent = card.name;

            const originalPriceElement = document.createElement('p');
            originalPriceElement.textContent = `Original Price: $${card.price.toFixed(2)}`;

            const salePriceElement = document.createElement('p');
            salePriceElement.textContent = `Sale Price: $${card.sale_price.toFixed(2)}`;

            cardElement.appendChild(imageElement);
            cardElement.appendChild(nameElement);
            cardElement.appendChild(originalPriceElement);
            cardElement.appendChild(salePriceElement);

            promoSection.appendChild(cardElement);
        });
    }

    /**
     * Displays an error message in the promo-cards section when an error occurs during the 
     * fetching of promotional cards.
     * @param {string} message - the error message to displat
     */
    function displayErrorMessage(message) {
        promoSection.innerHTML = '';
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        promoSection.appendChild(errorMessage);
    }

    init();
})();
