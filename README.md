# Lavin's Yu-Gi-Oh Haven (E-Commerce Store) API Documentation
*Lavin's Yu-Gi-Oh Haven API provides the functionality to retrieve, add, update, and delete Yu-Gi-Oh card information, as well as submit feedback, get FAQs, and get promotional card details. The API is designed to serve a web-based e-commerce platform for buying and selling individual cards.*

## *GET /api/cards*
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON collection of all cards available in the store, with optional filtering based on query parameters.

**Supported Parameters**
* `name` (optional) - The name of the card.
* `type` (optional) - The type of the card.
* `level` (optional) - The level of the card.
* `attribute` (optional) - The attribute of the card.
* `archetype` (optional) - The archetype of the card.

**Example Request:** '/api/cards?name=dragon&type=Synchro%20Monster'

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Stardust Dragon",
    "type": "Synchro Monster",
    "level": 8,
    "attribute": "WIND",
    "archetype": "Stardust",
    "price": 30,
    "sale_price": 20,
    "image_url": "https://images.ygoprodeck.com/images/cards/44508094.jpg",
    "gen": "5ds",
    "rarity": "Common"
  },
  {
    "id": 2,
    "name": "Black Rose Dragon",
    "type": "Synchro Monster",
    "level": 7,
    "attribute": "FIRE",
    "archetype": "Rose Dragon",
    "price": 20,
    "sale_price": 15,
    "image_url": "https://images.ygoprodeck.com/images/cards/73580471.jpg",
    "gen": "5ds",
    "rarity": "Rare"
  }
]

```

**Error Handling:**
* 500: Server error, generic error message returned.

**Example Request:** `/api/cards`

**Example Response:**
```
Server error. Please try again later.
```






## *GET /api/cards/:id*
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** 
Returns JSON data with details of a single card by its ID.

**Supported Parameters**
* `:id` (required) - The ID of the card to retrieve.

**Example Request:** `/api/cards/1`

**Example Response:**
```json
{
  "id": 1,
  "name": "Stardust Dragon",
  "type": "Synchro Monster",
  "level": 8,
  "attribute": "WIND",
  "archetype": "Stardust",
  "price": 30,
  "sale_price": 20,
  "image_url": "https://images.ygoprodeck.com/images/cards/44508094.jpg",
  "gen": "5ds",
  "rarity": "Common"
}
```
**Error Handling:**
* 500: Server error, generic error message returned. 
* 404: Card ID not found.

**Example Request:** `/api/cards/999`

**Example Response:**
```
Card ID not found.
```







## *POST /api/cards*
**Request Type:** POST

**Returned Data Format:** JSON

**Description:** Creates a new card with the specified properties.

**Supported Parameters**

* POST body parameters:
    * `name` - (required) - The name of the card.
    * `type` - (required) - The type of the card.
    * `level` - (required) - The level of the card.
    * `attribute` - (required) - The attribute of the card.
    * `archetype` - (required) - The archetype of the card.
    * `price` - (required) - The price of the card.
    * `sale_price` - (optional) - The sale price of the card.
    * `image_url` - (required) - The image URL of the card.
    * `gen` - (required) - The Yu-Gi-Oh generation the card was introduced.
    * `rarity` (required) - The rarity of the card.
 
**Example Request:** `/api/cards`

```json
{
  "name": "Junk Synchron",
  "type": "Effect Monster",
  "level": 3,
  "attribute": "DARK",
  "archetype": "Junk",
  "price": 12,
  "sale_price": null,
  "image_url": "https://images.ygoprodeck.com/images/cards/63977008.jpg",
  "gen": "5ds",
  "rarity": "Ultra Rare"
}

```

**Example Response:**

```
Successfully created the card Junk Synchron!

```

**Error Handling:**
* 500: Server error, generic error message returned. 
* 400: Missing required parameter: [paramater name]

**Example Request:** `/api/cards`

```json
{
  "type": "Effect Monster",
  "level": 3,
  "attribute": "DARK",
  "archetype": "Junk",
  "price": 12,
  "sale_price": null,
  "image_url": "https://images.ygoprodeck.com/images/cards/63977008.jpg",
  "gen": "5Ds",
  "rarity": "Ultra Rare"
}

```

**Example Response:**
```
Missing required parameter: name.
```






## *PUT /api/cards*
**Request Type:** PUT

**Returned Data Format:** JSON

**Description:** Updates properties of an existing card. All updates are optional; only specified fields will be updated.

**Supported Parameters**
* `:id` (required) - The ID of the card to update.

* PUT body parameters:
    * `name` - (optional) - The name of the card.
    * `type` - (optional) - The type of the card.
    * `level` - (optional) - The level of the card.
    * `attribute` - (optional) - The attribute of the card.
    * `archetype` - (optional) - The archetype of the card.
    * `price` - (optional) - The price of the card.
    * `sale_price` - (optional) - The sale price of the card.
    * `image_url` - (optional) - The image URL of the card.
    * `gen` - (optional) - The Yu-Gi-Oh generation the card was introduced.
    * `rarity` (optional) - The rarity of the card.
 
**Example Request:** `/api/cards/1`

```json
{
  "price": 35
}
```

**Example Response:**
```
Successfully updated the card Stardust Dragon!

```

**Error Handling:**
* 500: Server error, generic error message returned. 
* 404: Card ID not found.

**Example Request:** `/api/cards/999`

**Example Response:**
```
Card ID not found.
```






## *DELETE /api/cards*
**Request Type:** DELETE

**Returned Data Format**: JSON

**Description:** Deletes a card by its ID.

**Supported Parameters**
* `:id` (required) - The ID of the card to delete

**Example Request:** `/api/cards/1`

**Example Response:**

```
Successfully deleted the card Stardust Dragon!
```

**Error Handling:**
* 500: Server error, generic error message returned. 
* 404: Card ID not found.

**Example Request:** `/api/cards/999`

**Example Response:**
```
Card ID not found.
```







## *POST /api/feedback*
**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Submits feedback for the store.

**POST body parameters**
* `name` (required) - The name of the person submitting the feedback.
* `email` (required) - The email address of the person submitting the feedback.
* `message` (required) - The feedback message.

**Example Request:** `/api/feedback`

```json
{
  "name": "Jonayet Lavin",
  "email": "jlavin@caltech.edu",
  "message": "I have been desperately searching for a ghost rare Dark Magician, and I was able to easily find it here, amazing store!"
}
```

**Example Response:**

```
Successfully submitted feedback by Jonayet Lavin!
```

**Error Handling:**
* 500: Server error, generic error message returned. 
* 400: Missing required parameter.

**Example Request:** `/api/feedback`

```json
{
  "name": "Joey Wheeler",
  "message": "Great store!"
}

```

**Example Response:**
```
Please provide a valid email.

```







## *GET /api/faq*
**Request Type:** POST

**Returned Data Format**: JSON

**Description:**  Returns a JSON collection of  frequently asked questions and their corresponding answers.

**Example Request:** `/api/faq`

**Example Response:**

```json
[
    { "question": "How do I buy a card?", "answer": "Simply browse our shop and click on the card you want, which sends it to your cart." },
    { "question": "What type of Yu-Gi-Oh cards do you sell?", "answer": "We specialize in selling individual Yu-Gi-Oh cards, all PSA10." }
]
```

**Error Handling:**
* 500: Server error, generic error message returned. 

**Example Request:** `/api/faq`

**Example Response:**
```
Server error. Please try again later.

```







## *GET /api/promos*
**Request Type:** GET

**Returned Data Format**: JSON

**Description:**  Returns a JSON collection of promotional cards.

**Example Request:** `/api/promos`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Stardust Dragon",
    "type": "Synchro Monster",
    "level": 8,
    "attribute": "WIND",
    "archetype": "Stardust",
    "price": 30,
    "sale_price": 20,
    "image_url": "https://images.ygoprodeck.com/images/cards/44508094.jpg",
    "gen": "5ds",
    "rarity": "Common"
  },
  {
    "id": 2,
    "name": "Black Rose Dragon",
    "type": "Synchro Monster",
    "level": 7,
    "attribute": "FIRE",
    "archetype": "Rose Dragon",
    "price": 20,
    "sale_price": 15,
    "image_url": "https://images.ygoprodeck.com/images/cards/73580471.jpg",
    "gen": "5ds",
    "rarity": "Rare"
  },
  {
    "id": 3,
    "name": "Ancient Fairy Dragon",
    "type": "Synchro Monster",
    "level": 7,
    "attribute": "LIGHT",
    "archetype": "Fairy Dragon",
    "price": 25,
    "sale_price": 18,
    "image_url": "https://images.ygoprodeck.com/images/cards/25862681.jpg",
    "gen": "5Ds",
    "rarity": "Super Rare"
  }
]
```

**Error Handling:**
* 500: Server error, generic error message returned. 

**Example Request:** `/api/promos`

**Example Response:**
```
Server error. Please try again later.

```
