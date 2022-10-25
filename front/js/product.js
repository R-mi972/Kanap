
//recherche url de l'image apres le ?id=
const queryString = window.location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
if (id != null) {
    let productPrice = 0
    let imgUrl, altText, articleName
    
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => Data(res))

    // display le produit
function Data(kanap) {
    const { colors, imageUrl, altTxt, name, description, price } = kanap
    productPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null)
    //menu déroulant avec select et option
    {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

//ajout au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)


function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    // si la commande est invalide on arrete l'execution de la fonction
    if ( IsOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
    }


function redirectToCart() {
    window.location.href = "cart.html"
    }

function saveOrder(color, quantity) {
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
            price: productPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName,
        }
    //local storage ne peux pas stocker des objets il faut les convertir en string
    localStorage.setItem(id, JSON.stringify(data))
    }

    function IsOrderInvalid (color, quantity ) {
    if (color == null || color ===""|| quantity == null || quantity == 0) {
        alert("Veuillez choisir une couleur et une quantité")
        // arreter l'execution de la fonction
        return true
    }
}




   

        