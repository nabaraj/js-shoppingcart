import $ from "jquery";
export const cartPage=function(cartItem, cartPrice, cartDiscount, storeEvent){
  $("body").removeClass("home");
  $("body").addClass("cart");
  
      return `<div class="container">
      <div class="products list fullWidth">
      ${cartList(cartItem)}
      </div>
      <div class="sidebar">
        <h3>
          Price Details
        </h3>
        <table>
          <tr>
            <td>Price(1item) : </td>
            <td>${cartPrice}</td>
          </tr>
          <tr>
            <td>Discount :</td>
            <td>${cartDiscount}</td>
          </tr>
        </table>
      </div>
    </div>`.trim()
    
  }
function cartList(cartItem){
  console.log(cartItem);
  let row = [];
  if(Object.values(cartItem).length>0){
    Object.values(cartItem).map((item,index)=>{
    row.push(`<div class="grid inline-item">
    <div class="productImage"><img src="${item.img_url}" class="responsive-img" alt="${item.name}"></div>
    <div class="cart">${item.name}</div>
    <span>remove</span>
  </div>`.trim());

  })
  }else{
    row.push(`No item in cart`);
  }
  
  return row.join('');
}