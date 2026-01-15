import { myCart } from "../cart.js";
import { getProduct } from "../products.js";
import { getDeliveryOption } from "../deliveryOptions.js";
import { formatCurrency } from "../../utils/moneyDecimal.js";
export function paymentSummary() {
  let productPriceCents = 0;
  let ShippingPriceCents = 0;
  myCart.forEach((items) => {
    const product = getProduct(items.productId);
    productPriceCents += product.priceCents * items.quantity;

    const deliveryOption = getDeliveryOption(items.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCent;
  });

  const totalBeforeTax = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHtML = `
 <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              ShippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`;
document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtML;

}

