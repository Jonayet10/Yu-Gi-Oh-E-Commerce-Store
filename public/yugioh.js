(function() {
    "use strict";

    const BASE_URL = 'http://localhost:3000/api/cards';
    const MAX_CARDS_TO_DISPLAY = 10;
    let cart = [];
    let allCards = [];
    let shuffledCards = [];

    /**
     * Sets up event listeners and loads the cart data from local storage. Differentiates inital
     * loading behavior depending on the current page.
     * @return {void}
     */
    async function init() {
        if (window.location.pathname.endsWith('cart.html')) {
            loadCart();
        } else {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                cart = JSON.parse(storedCart);
            }

            const form = document.getElementById('filter-form');
            if (form) {
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const params = {
                        name: form.elements['name'].value,
                        type: form.elements['type'].value,
                        level: form.elements['level'].value,
                        attribute: form.elements['attribute'].value,
                        archetype: form.elements['archetype'].value
                    };
                    await fetchCards(params);
                });
            }
        }
    }

    /**
     * Fetches cards from the server based on the given filtering parameters and updates the
     * webpage with the fetched cards.
     * @param {Object} params - object containing filtering parameters for the card search
     */
    async function fetchCards(params) {
        let query = Object.keys(params)
            .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');

        const url = query ? `${BASE_URL}?${query}` : BASE_URL;

        try {
            const response = await fetch(url, { method: "GET" });
            const data = await checkStatus(response).json();

            allCards = data;
            shuffledCards = shuffleArray(allCards);
            displayFilteredCards();
        } catch (error) {
            handleError(error);
        }
    }

    /**
     * Filters and displays cards that are not already in the cart.
     * @return {void}
     */
    function displayFilteredCards() {
        const cardElement = document.getElementById('card-details');
        const noCardsMessage = document.getElementById('no-cards-message');

        const filteredData = allCards.filter(card => !cart.some(c => c.id === card.id));
        if (filteredData.length > 0) {
            const cards = filteredData.slice(0, MAX_CARDS_TO_DISPLAY);
            displayCardDetails(cards);
            noCardsMessage.classList.add('hidden');
            noCardsMessage.classList.remove('visible');
        } else {
            handleError('No cards available for the given search.');
        }
    }

    /**
     * Creates and displays card elements in the cart-details section. Also sets up the click
     * event listener on the cards to send them to the cart.
     * @param {Array} cards - array of card objects to display
     */
    function displayCardDetails(cards) {
        const cardElement = document.getElementById('card-details');
        cardElement.innerHTML = '';

        cards.forEach(card => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            const imageElement = document.createElement('img');
            imageElement.src = card.image_url;
            imageElement.alt = card.name;

            const nameElement = document.createElement('h2');
            nameElement.textContent = card.name;

            const priceElement = document.createElement('p');
            if (card.sale_price !== null) {
                const originalPrice = document.createElement('span');
                originalPrice.className = 'original-price';
                originalPrice.textContent = `Price: $${card.price.toFixed(2)}`;
                priceElement.appendChild(originalPrice);
            
                const salePrice = document.createTextNode(` Sale Price: 
                    $${card.sale_price.toFixed(2)}`);
                priceElement.appendChild(salePrice);
            } else {
                priceElement.textContent = `Price: $${card.price.toFixed(2)}`;
            }            

            cardContainer.appendChild(imageElement);
            cardContainer.appendChild(nameElement);
            cardContainer.appendChild(priceElement);

            cardContainer.addEventListener('click', () => {
                addToCart(card);
                cardContainer.remove();
            });

            cardElement.appendChild(cardContainer);
        });
    }

    /**
     * Adds a selected card to the cart and updates the local storage and webpage accordingly.
     * @param {Object} card - the card object to add to the cart
     */
    function addToCart(card) {
        cart.push(card);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayFilteredCards();
    }

    /**
     * Loads cart data frmo local storage and updates the webpage with the cart items.
     * @ return {void}
     */
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        cart.forEach(card => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            const imageElement = document.createElement('img');
            imageElement.src = card.image_url;
            imageElement.alt = card.name;

            const nameElement = document.createElement('h2');
            nameElement.textContent = card.name;

            const priceElement = document.createElement('p');
            if (card.sale_price !== null) {
                const originalPrice = document.createElement('span');
                originalPrice.className = 'original-price';
                originalPrice.textContent = `Price: $${card.price.toFixed(2)}`;
                priceElement.appendChild(originalPrice);
            
                const salePrice = 
                document.createTextNode(` Sale Price: $${card.sale_price.toFixed(2)}`);
                priceElement.appendChild(salePrice);
            } else {
                priceElement.textContent = `Price: $${card.price.toFixed(2)}`;
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove from Cart';
            removeButton.addEventListener('click', () => {
                removeFromCart(card);
            });

            cartItem.appendChild(imageElement);
            cartItem.appendChild(nameElement);
            cartItem.appendChild(priceElement);
            cartItem.appendChild(removeButton);

            cartItems.appendChild(cartItem);
        });

        updateCartTotal();
    }

    /**
     * Removes a card from the cart, updates local storage accordingly, and refreshes the cart and 
     * card details to display.
     * @param {Object} card - the cart to remove from the cart 
     */
    function removeFromCart(card) {
        cart = cart.filter(c => c.id !== card.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        loadCart();
        displayFilteredCards();
    }

    /**
     * Calcualtes and updates the total price of all the items in the cart.
     * @return {void}
     */
    function updateCartTotal() {
        const totalPriceElement = document.getElementById('total-price');
        const totalPrice = cart.reduce((total, card) => total + (card.sale_price || card.price), 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    /**
     * Checks the response status and throws an error if it is not ok.
     * @param {Response} response - the fetch response to checl
     * @return {Response} - the response if request was successful
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw Error(`Error in request: ${response.statusText}`);
        }
        return response;
    }

    /**
     * Handles and displays errors in the no-cards-message section. Hides the cart details when
     * error occurs.
     * @param {string} errMsg - the error message to display
     */
    function handleError(errMsg) {
        const cardElement = document.getElementById('card-details');
        const noCardsMessage = document.getElementById('no-cards-message');
        
        if (cardElement) {
            cardElement.innerHTML = '';
        }
        
        if (noCardsMessage) {
            noCardsMessage.classList.add('visible');
            noCardsMessage.classList.remove('hidden');
        }
    }
    
    /**
     * Helper function to shuffle elements of an array in place.
     * @param {Array} array - an array to shuffle
     * @returns {Array} - the shuffled array
     */
    function shuffleArray(array) {
        if (array.length <= 1) return array;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    init();
})();
