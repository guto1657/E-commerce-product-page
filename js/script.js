/**  Increment and Decrement input Number **/
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
const totalItems = document.getElementById('totalItems')

plus.addEventListener('click', () => {
  totalItems.value++
})

minus.addEventListener('click', () => {
  totalItems.value--
  if (totalItems.value == 0 || totalItems.value < 0) {
    totalItems.value = 1
  }
})

totalItems.addEventListener('change', () => {
  if (totalItems.value == 0 || totalItems.value < 0) {
    totalItems.value = 1
  }
})

/** change emphasis product Picture **/

const smallpictures = document.querySelectorAll('.smallpictures')
const emphasisPicture = document.getElementById('emphasisPicture')

smallpictures.forEach(picture => {
  picture.addEventListener('click', (e) => {
    const src = picture.src.replace('-thumbnail', '')
    const currentActivePicture = document.querySelector('.active')

    currentActivePicture.classList.remove('active')
    picture.classList.add('active')


    emphasisPicture.src = src
  })
})

/**  opens carousel if window innerWidth is greater then 600px **/

if (window.innerWidth >= 600) {
  emphasisPicture.addEventListener('click', () => {
    document.getElementById('wrapper').classList.remove('hide')
  })
}


/** add product to cart **/

document.querySelector('#btn').addEventListener('click', () => {
  let totalItems = document.getElementById('totalItems').value

  let Sneakers = {
    name: 'Fall Limited Edition Sneakers',
    value: 125.00,
    amount: totalItems,
    src: './images/image-product-1-thumbnail.jpg',
    id: 1
  }

  localStorage.setItem('cart', JSON.stringify(Sneakers))

  showItemOnCart()

})

function showItemOnCart() {

  let cart = localStorage.getItem("cart")

  if (cart !== null && cart !== "") {
    document.getElementById('cartDiv').classList.remove('empty')
    let cartBoxProducts = document.getElementById('products')
    cartBoxProducts.classList.remove('empty')
    cartBoxProducts.innerHTML = ''

    let checkout = document.getElementById('checkout')
    checkout.classList.remove('hide')
    let cartProduct = JSON.parse(localStorage.getItem("cart"))

    // product Div
    let productDiv = document.createElement('div')
    productDiv.className = 'product'

    // Description Div Start
    let descriptionDiv = document.createElement('div')
    descriptionDiv.className = 'description'

    let img = document.createElement('img')
    img.className = 'productImg'
    img.src = cartProduct.src

    // info Div Start

    let infoDiv = document.createElement('div')
    infoDiv.className = 'info'

    let productTitle = document.createElement('h3')
    productTitle.innerHTML = cartProduct.name

    let singleValue = document.createElement('span')
    singleValue.className = 'singleValue'
    singleValue.innerHTML = `$${cartProduct.value.toFixed(2)} `

    let amount = document.createElement('span')
    amount.className = 'amount'
    amount.innerHTML = `x ${cartProduct.amount} `

    let finalValue = document.createElement('span')
    finalValue.className = 'finalValue'
    finalValue.innerHTML = `$${(cartProduct.value * cartProduct.amount).toFixed(2)}`

    infoDiv.appendChild(productTitle)
    infoDiv.appendChild(singleValue)
    infoDiv.appendChild(amount)
    infoDiv.appendChild(finalValue)

    // info Div end

    // remove Div start

    let removeDiv = document.createElement('div')
    removeDiv.className = 'remove'
    removeDiv.innerHTML = '<img src="./images/icon-delete.svg">'

    removeDiv.addEventListener('click', () => {
      localStorage.setItem("cart", "")
      document.getElementById('products').innerHTML = ''
      showItemOnCart()
    })

    // remove Div end

    descriptionDiv.appendChild(img)
    descriptionDiv.appendChild(infoDiv)
    descriptionDiv.appendChild(removeDiv)


    // Description Div End

    productDiv.appendChild(descriptionDiv)

    cartBoxProducts.appendChild(productDiv)

    document.querySelector('#cartDiv').setAttribute('data-content', cartProduct.amount)


  } else {

    document.getElementById('cartDiv').classList.add('empty')

    let cartBoxProducts = document.getElementById('products')
    cartBoxProducts.classList.add('empty')
    cartBoxProducts.innerHTML = ''
    let checkout = document.getElementById('checkout')
    checkout.classList.add('hide')

    let span = document.createElement('span')
    span.className = 'emptyCart'

    span.innerHTML = 'Your cart is empty.'

    cartBoxProducts.appendChild(span)
  }

}

let cart = document.getElementById('cartIcon')

cart.addEventListener('click', () => {
  let cartBox = document.getElementById('cart-box')
  cartBox.classList.toggle('hide')
  cartBox.addEventListener('mouseleave', () => {
    cartBox.classList.add('hide')
  })
  showItemOnCart()
})

window.addEventListener('load', () => {
  showItemOnCart()
})

/** mobile menu **/

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navItems').classList.add('show')
})

document.getElementById('closeIcon').addEventListener('click', () => {
  document.getElementById('navItems').classList.remove('show')
})

/** carousel **/

// gets all the buttons of the carousel
const buttons = document.querySelectorAll('[data-carousel-button]')

//gets all the small pictures under the carousel
const smallCarouselPictures = document.querySelectorAll('.smallCarouselPicture')

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // check what dataset does the carousel button have
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1
    // gets the div carousel then it gets the ul list
    const slides = button.closest('[data-carousel]').querySelector('[data-slides]')
    // select the active slide
    const activeSlide = slides.querySelector("[data-active]")
    // it converts all the slides to an array then it gets the new index depending on the offset
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    // goes to the last img if the current newIndex is less then 0
    if (newIndex < 0) newIndex = slides.children.length - 1

    // if the newIndex is equal to the last img index then it return to the index 0
    if (newIndex >= slides.children.length) newIndex = 0

    // it adds the data-active atribute to the new current slide
    slides.children[newIndex].dataset.active = true

    // it deletes the data-active atribute of the previous slide
    delete activeSlide.dataset.active


    // it gets the current small picture that contains the class active
    const currentActivePicture = document.querySelector('.smallCarouselPicture.active')

    // removes the current small picture active class
    currentActivePicture.classList.remove('active')

    // it adds the class active to the small picture that contains the same newIndex as the carousel
    smallCarouselPictures[newIndex].classList.add('active')


  })
})

smallCarouselPictures.forEach(picture => {
  picture.addEventListener('click', (e) => {
    const src = picture.src.replace('-thumbnail', '')
    const currentActivePicture = document.querySelector('.smallCarouselPicture.active')

    currentActivePicture.classList.remove('active')
    picture.classList.add('active')

    // ul list
    const slides = document.querySelector('#wrapper [data-carousel]').querySelector('[data-slides]')
    // array of slides
    const slidesArray = [...slides.children];
    // current active slide on carousel
    const activeSlide = slides.querySelector("#wrapper [data-active]")


    slidesArray.forEach(slide => {
      if (slide.children[0].src == src) {
        slide.dataset.active = true
        delete activeSlide.dataset.active
      }
    })

  })
})

/** close carousel on icon click  **/
document.getElementById('carouselClose').addEventListener('click', () => {
  document.getElementById('wrapper').classList.add('hide')
})