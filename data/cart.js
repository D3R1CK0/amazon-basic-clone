export let myCart = JSON.parse(localStorage.getItem('myCart')) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
]



export function updateCartQuantity() {
  let quantity = 0;

  myCart.forEach((item) => {
    quantity += Number(item.quantity) || 0;
  });

  document.querySelector(".js-cart-quantity-display").innerHTML = quantity;
}

export function addToCart(productId) {
  let matchingItem;

  myCart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    myCart.push({
      productId,
      quantity: 1,
    });
  }
  saveToLocalstorage()
}


export function removeProduct(productId){
    const newCartArray=[]
    myCart.forEach((item)=>{
      if(item.productId !== productId){
        newCartArray.push(item)
      }
    })
        myCart=newCartArray
        saveToLocalstorage()
    }


    export function saveToLocalstorage (){
        localStorage.setItem("myCart",JSON.stringify(myCart))
    }