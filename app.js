const cartDOM = document.querySelector(".cart__items");
const cartCounter = document.querySelector(".cart__counter");
const addToCartBtn = document.querySelectorAll(".btn__add__to__cart");
const totalCount = document.querySelector("#total__counter");
const totalCost = document.querySelector(".total__cost");
let cartItems = [];

cartCounter.addEventListener('click', () => {
    cartDOM.classList.toggle('active')
});


addToCartBtn.forEach(btn => {
    // TODO: information about btn products
    btn.addEventListener('click', () => {
        let btnParentElement = btn.parentElement;
        let ProductBtnPrice = btnParentElement.querySelector('.product__price').textContent;
        let splitPrice = ProductBtnPrice.split('$')[1];
        let ProductBtnName = btnParentElement.querySelector('.product__name').textContent;
        let ProductBtnImg = btnParentElement.querySelector('#image').getAttribute('src');
        let ProductBtnId = btnParentElement.querySelector('#product__id').value;

        let Producties = {
            id: ProductBtnId,
            name: ProductBtnName,
            price: splitPrice,
            Img: ProductBtnImg,
            quantity : 1
        }
        let isIncart = cartItems.filter(item => item.id === Producties.id).length > 0;
        
        
        // check if alreday Exists
        if (!isIncart) {
            addItemToTheDOM(Producties);
        } else {
            alert("Product Already in the Cart");
            return;
        }
        const cartDOMItems = document.querySelectorAll(".cart_item");
        cartDOMItems.forEach( signalItem => {
            if(signalItem.querySelector('#product__id').value === Producties.id){
                IncreaseItem(signalItem,Producties)
                DecreaseItem(signalItem,Producties)
            }
        })
        cartItems.push(Producties);
        calculateTotal();
        
    })
});
function addItemToTheDOM(product){
    cartDOM.insertAdjacentHTML('afterbegin',`<div class="cart_item">
    <input type="hidden" id="product__id" value="${product.id}">
   <img id="product_image" src="${product.Img}" alt="" srcset="">
   <h4 class="product__name">${product.name}</h4>
   <a class="btn__small decrease-btn" action="decrease">&minus;</a> <h4 class="product__quantity">${product.quantity}</h4><a class="btn__small increase-btn" action="increase">&plus;</a>
  <span id="product__price">${product.price}</span>
   <a class="btn__small btn_remove" action="remove">&times;</a>
</div>`)
}
function calculateTotal(){
    let total = 0;

    cartItems.forEach( item =>{
        total += item.quantity * item.price;
        
    });
    totalCost.innerHTML = total;
    totalCount.innerText = cartItems.length;
}
function IncreaseItem(singalItem,Producties){
    singalItem.querySelector("[action='increase']").addEventListener('click',() => {
        cartItems.forEach( singal =>{
            if(singal.id === Producties.id){
                singalItem.querySelector('.product__quantity').innerText = ++singal.quantity;
                calculateTotal();
            }
        })
        console.log('t');
    });
    // console.log(singalItem)
}
function DecreaseItem(singalItem,Producties){
    singalItem.querySelector("[action='decrease']").addEventListener('click', () => {
        cartItems.forEach( singalCartItem =>{
            if(singalCartItem.id === Producties.id){
                if(singalCartItem.quantity > 1){
                    singalItem.querySelector('.product__quantity').innerText = --singalCartItem.quantity;
                    calculateTotal();
                }else{
                    cartItems = cartItems.filter( newElement =>{
                        newElement.id !== Producties.id
                        singalItem.remove();
                            calculateTotal();
                            IncreaseItem(singalItem,Producties)
                    })
                }
            }
        } )
    })
}
