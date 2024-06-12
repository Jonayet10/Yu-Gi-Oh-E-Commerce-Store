(function() {
    "use strict";

    const BASE_URL = 'http://localhost:3000/api/feedback';
    
    /**
     * Sets up the event listeners for the contact form, to set up form submissions.
     * @return {void}
     */
    async function init() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleSubmit);
        }
    }

    /**
     * Handles the contact form submission. Prevents default form submission behavior, collects
     * form data, sends a POST request to the server, and updates the form message based on the
     * response.
     * @param {Event} event - form submission event
     * @return {Promise<void>}
     */
    async function handleSubmit(event) {
        event.preventDefault();
    
        const formMessage = document.getElementById('form-message');
        const contactForm = document.getElementById('contact-form');
        
        const formData = new FormData(contactForm);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
        
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                formMessage.textContent = 'Thank you for your message!';
                contactForm.reset();
            } else {
                formMessage.textContent = 'An error occurred. Please try again.';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again.';
        }
    }

    init();
})();
