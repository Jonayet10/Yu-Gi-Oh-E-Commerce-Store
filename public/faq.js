(function() {
    "use strict";

    const BASE_URL = 'http://localhost:3000/api/faq';
    
    /**
     * Calls function to fetch and display FAQ data on the webpage.
     * @return {void}
     */
    async function init() {
        await fetchAndDisplayFAQ();
    }

    /**
     * Fetches FAQ data from the API and displays it on the webpage.
     * @return {Promise<void>}
     */
    async function fetchAndDisplayFAQ() {
        const response = await fetch(BASE_URL);
        const faqData = await response.json();
        displayFAQ(faqData);
    }

    /**
     * Displays the FAQ data on the webpage by creating and appending FAQ items on the FAQ sections.
     * @param {Array<Object>} faqData - FAQ data from the API
     * @return {void}
     */
    function displayFAQ(faqData) {
        const faqSection = document.getElementById('faq-section');
        faqData.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';

            const questionElement = document.createElement('h3');
            questionElement.textContent = faq.question;

            const answerElement = document.createElement('p');
            answerElement.textContent = faq.answer;

            faqItem.appendChild(questionElement);
            faqItem.appendChild(answerElement);
            faqSection.appendChild(faqItem);
        });
    }

    init();
})();
