(function() {
    "use strict";

    const BASE_URL = 'http://localhost:3000/api/cards';

    /**
     * Initializes the form by setting up a submission event listener. Prevents default submission
     * behavior, retrieves the card name from input, and fetches card details if form input is
     * nonempty.
     * @return {void}
     */
    async function init() {
        const form = document.getElementById('search-form');
        if (form) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const cardName = form.elements['card-name'].value.trim();
                if (cardName) {
                    await fetchCardDetails(cardName);
                }
            });
        }
    }

    /**
     * Fetches the card details from the API given the card name.
     * @param {string} cardName - name of the cart to fetch details for
     */
    async function fetchCardDetails(cardName) {
        const url = `${BASE_URL}?name=${encodeURIComponent(cardName)}`;
        try {
            const response = await fetch(url, { method: "GET" });
            const data = await checkStatus(response).json();
            if (data.length > 0) {
                displayCardDetails(data[0]);
            } else {
                handleError('No card found with the given name.');
            }
        } catch (error) {
            handleError(error.message || 'An error occurred while fetching card details.');
        }
    }

    /**
     * Displays the details of a fetched card on the webpage.
     * @param {Object} card - the card object comprising details to display
     */
    function displayCardDetails(card) {
        const cardDetailsSection = document.getElementById('card-details-section');
        const errorMessage = document.getElementById('error-message');
        cardDetailsSection.innerHTML = '';
        errorMessage.innerHTML = '';
        errorMessage.classList.add('hidden');

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container2';

        const imageElement = document.createElement('img');
        imageElement.src = card.image_url;
        imageElement.alt = card.name;

        const nameElement = document.createElement('h2');
        nameElement.textContent = card.name;

        const genElement = document.createElement('p');
        genElement.textContent = `Gen: ${card.gen}`;

        const typeElement = document.createElement('p');
        typeElement.textContent = `Type: ${card.type || 'N/A'}`;

        const archetypeElement = document.createElement('p');
        archetypeElement.textContent = `Archetype: ${card.archetype || 'N/A'}`;

        const rarityElement = document.createElement('p');
        rarityElement.textContent = `Rarity: ${card.rarity || 'N/A'}`;

        cardContainer.appendChild(imageElement);
        cardContainer.appendChild(nameElement);
        cardContainer.appendChild(genElement);
        cardContainer.appendChild(typeElement);
        cardContainer.appendChild(archetypeElement);
        cardContainer.appendChild(rarityElement);


        cardDetailsSection.appendChild(cardContainer);
        cardDetailsSection.classList.remove('hidden');
    }

    /**
     * Handles and displays error messages in the card-details-section.
     * @param {string} errMsg - the error message to display
     */
    function handleError(errMsg) {
        const cardDetailsSection = document.getElementById('card-details-section');
        const errorMessage = document.getElementById('error-message');
        cardDetailsSection.innerHTML = '';
        errorMessage.textContent = errMsg;
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('visible');
    }

    /**
     * Checks the response status and throws an error if it is not ok.
     * @param {Response} response - the response object from the fetch request
     * @return {Response} - the response object if request was successful
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw Error(`Error in request: ${response.statusText}`);
        }
        return response;
    }

    init();
})();
