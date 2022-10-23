fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
 .then((data) => addProducts(data))


  function addProducts (product) {
  console.log(product)
  const imageUrl = product[0].imageUrl
  console.log("url image", imageUrl)

  const anchor = document.createElement("a")
  anchor.href = imageUrl
  anchor.text = "kanap 0"

  const items = document.querySelector("#items")
  if (items !=null) {
    items.appendChild(anchor)
    console.log("lien  ajouté")
  }
 }

 
 
 
 


