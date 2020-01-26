import $ from "jquery";
export const cartPage=function(cartItem, storeEvent){
  $("body").removeClass("home");
  $("body").addClass("cart");
      return `<div class="container">
      <div class="sidebar">
        <h3>
          Price Details
        </h3>
      </div>
      <div class="products">
      ${cartList(cartItem)}
      </div>
    </div>`.trim()
    
  }
function cartList(cartItem){
  console.log(cartItem);
  let row = [];
  if(Object.values(cartItem).length>0){
    Object.values(cartItem).map((item,index)=>{
    row.push(`<div>
    <img src="" alt="">
    <div class="cart">${item.name}</div>
    <span>remove</span>
  </div>`);

  })
  }else{
    row.push(`No item in cart`);
  }
  
  return row;
}