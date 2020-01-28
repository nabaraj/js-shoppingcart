import $ from "jquery";

export const renderProductPage = function(filterData, storeEvent, products) {
  //   $.get('https://api.myjson.com/bins/qzuzi')
  $("body").removeClass("cart");
  $("body").addClass("home");
  if (products.length>0) {
    setTimeout(()=>{generateGridfunction(products)},0);
  } else {
    $.get("https://api.myjson.com/bins/qzuzi", function(products) {
      storeEvent(products);
      generateGridfunction(products);
    });
  }

  return `<div class="container">
            <div class="sidebar">
                <div class="topFilter">
                  <div class="topFilterWrapper">
                    <h3>Sort By</h3>
                    <span>Price -- High-Low</span>
                    <span>Price -- Low-High</span>
                    <span>Discount</span>
                    </div>
                </div>
                <form>
                    <h3>Filters</h3>
                    <div class="form-group">
                        <section class="range-slider">
                            <span class="rangeValues"></span>
                            <input value="100" min="100" max="10000" step="100" type="range">
                            <input value="10000" min="100" max="10000" step="100" type="range">
                        </section>
                        <div class="text-center">
                        <button>Apply</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="products shoppingList">
                <div class="list">Loading products..</div>
            </div>
    </div>`.trim();
};
export const renderButton = function() {
  return `<button>submit</button>`.trim();
};

function generateGridfunction(products) {
  console.log(products);
  var row = [];
  var maxPrice = 0;
  var minPrice = 0;
  products.map((data, index) => {
    var priceOrigin =
      data.discount === 0
        ? data.price
        : Math.floor((data.price / data.discount));
    row.push(`<div class="productGrid grid" key="${data.id}">         
                        <div class="imageBox">
                        <img
                            class="responsive-img"
                            src=${data.img_url}
                            alt="${data.name}"
                        />
                        </div>
                        <h3>${data.name}</h3>
                        <div class="tool">
                        <span class="price">&#8377;${data.price}</span>
                        <span class="originalPrice">${priceOrigin}</span>
                        <span class="discount">${data.discount}% off</span>
                        <div class="text-center">
                            <button class="addToCart" data-productid=${data.id} data-index=${index}>Add to cart</button>
                        </div>
                        </div>
                </div>`);
  });

  //return row.join("");
  $(".list").html(row);
}
window.clickFunction = e => {
  console.log(e);
};
