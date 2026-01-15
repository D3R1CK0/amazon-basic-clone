import { myCart, removeProduct, updateCartDeliveryDate } from "../cart.js";
import { products } from "../products.js";
import { formatCurrency } from "../../utils/moneyDecimal.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../deliveryOptions.js";
import { paymentSummary } from "./paymentSummary.js";

export function renderCart() {
  let cartDisplayHTML = "";
  myCart.forEach((items) => {
    const productId = items.productId;
    let matchingProduct;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
      if (!matchingProduct) return;

      console.log(matchingProduct);
    });

    const deliveryOptionDate = items.deliveryOptionId;

    let deliveryDates;
    deliveryOption.forEach((options) => {
      if (options.id == deliveryOptionDate) {
        deliveryDates = options;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryDates.deliveryDate, "days");
    const dateFormated = deliveryDate.format("dddd, MMMM D");

    cartDisplayHTML += ` <div class="cart-item-container js-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateFormated}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      items.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-cart" data-delete-id=${
                    matchingProduct.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionSelection(matchingProduct, items)}
              </div>
            </div>
          </div>`;
  });

  function deliveryOptionSelection(matchingProduct, items) {
    let html = "";
    deliveryOption.forEach((options) => {
      const today = dayjs();
      const deliveryDate = today.add(options.deliveryDate, "days");
      const dateFormated = deliveryDate.format("dddd,MMMM D");
      const price =
        options.priceCent == 0
          ? "Free"
          : `$${formatCurrency(options.priceCent)}`;

      const isChecked = items.deliveryOptionId == options.id;

      html += `
     <div class="delivery-option  ">
                  <input type="radio"
                   value="${options.id}"
                   data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${options.id}"
                  ${isChecked ? "checked" : ""}
                    class="delivery-option-input js-delvery-option "
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateFormated}
                    </div>
                    <div class="delivery-option-price">
                       ${price} Shipping
                    </div>
                  </div>
                </div>
    `;
    });
    return html;
  }

  document.querySelector(".js-cart-item-display").innerHTML = cartDisplayHTML;

  document.querySelectorAll(".js-delete-cart").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.deleteId;
      removeProduct(productId);
      
      const deleteContainer = document.querySelector(
        `.js-container-${productId}`
      );
      deleteContainer.remove();
      paymentSummary()
    });
  });
  document.querySelectorAll(".js-delvery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateCartDeliveryDate(productId, deliveryOptionId);
      renderCart();
      paymentSummary()
    });
  });
}


