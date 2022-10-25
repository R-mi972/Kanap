// recupérer les donnéeé du local storage

const cart = []
console.log(cart)
retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))


//altTxt: "Photo d'un canapé rose, une à deux place"
//color: "Pink"
//id: "a557292fe5814ea2b15c6ef4bd73ed83"
//mageUrl: "http://localhost:3000/images/kanap04.jpeg"
//name: "Kanap Autonoé"
//price: 1499
//quantity: 2

//const orderButton = document.querySelector("#order")
//orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i))
    // il faut convertir les données en objet avec parse
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
    
}

function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCardItemContent(item)
  article.appendChild(cardItemContent)
  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}

function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}

function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}


function makeCardItemContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}


function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}





function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}