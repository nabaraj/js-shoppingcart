import _ from 'lodash';
import './css/style.scss';
import {renderProductPage} from './js/shopping-list';
import Router from "./js/router";
import {cartPage} from "./js/cart-page";
import $ from "jquery";

const gD = {}
var products = [];
const filterData={}
var bodyClass = "";
let cartPrice = 0;
let cartDiscount = 0;
// slider start
function getVals(){
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  var displayElement = parent.getElementsByClassName("rangeValues")[0];
      displayElement.innerHTML = "&#8377;" + slide1 + "k - &#8377;" + slide2 + "k";
}

window.onload = function(){
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
    
}
// slider end

function storeEvent(data){
  products = data;
}

document.addEventListener("click", function(e) {
  var target = e.target;
  console.log(target);
  if (target.classList.contains("addToCart")) {
    var productId = target.dataset.productid;
    var productIndex = target.dataset.index;
    if(!gD[productId]){
      gD[productId]={
        quantity:1,
        ...products[productIndex]
      };
    }else{
       gD[productId].quantity++;
      gD[productId] = {...gD[productId]};
    }
    console.log(Object.values(gD));
    cartPrice = 0;
    cartDiscount = 0;
    
    let totalProduct = Object.values(gD).reduce((a,i)=>{
      console.log("###",i);
      let discount = (i.discount === 0
        ? i.price
        : Math.floor((i.price / i.discount)));
        console.log(discount);
      cartPrice = cartPrice + i.price
      cartDiscount = cartDiscount+discount;
      return a+i.quantity;
    },0)
    $("#count").text(totalProduct)
  } else if (target.classList.contains("cartCount")) {
    
    
  }
});

const router = new Router();
  router.get('/', function(req){
      document.getElementById("app").innerHTML=renderProductPage(filterData ,storeEvent, products);
  })
  router.get('/cart', function(req){
    document.getElementById("app").innerHTML=cartPage(gD, cartPrice, cartDiscount);
})
router.init();
$(document).ready(function(){
  $(".cartCount, .homeIcon").click(function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    var title = $(this).attr("title");
    history.pushState({}, title, href);
    console.log(history);
    router.init();
  })
  
})
