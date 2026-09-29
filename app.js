const $ = (selector) => document.querySelector(selector);
const descriptions = [
  "Cream sneakers against an orange background",
  "Sneakers balanced on textured stones",
  "Side view of a sneaker on two stones",
  "Pair of sneakers arranged on stones",
];
let selectedImage = 0,
  quantity = 0,
  cartQuantity = 0;
const lightbox = $(".lightbox"),
  menu = $(".mobile-menu"),
  cart = $("#cart"),
  cartToggle = $(".cart-toggle");
document.querySelectorAll(".thumbnails").forEach((container) => {
  descriptions.forEach((description, index) => {
    const button = document.createElement("button");
    button.className = "thumbnail";
    button.setAttribute(
      "aria-label",
      `View image ${index + 1}: ${description}`,
    );
    button.innerHTML = `<img src="images/image-product-${index + 1}-thumbnail.jpg" alt="" width="176" height="176">`;
    button.addEventListener("click", () => showImage(index));
    container.append(button);
  });
});
function showImage(index) {
  selectedImage = (index + descriptions.length) % descriptions.length;
  for (const image of [$("#product-image"), $(".lightbox-image")]) {
    image.src = `images/image-product-${selectedImage + 1}.jpg`;
    image.alt = descriptions[selectedImage];
  }
  document
    .querySelectorAll(".thumbnails")
    .forEach((container) =>
      [...container.children].forEach((button, index) =>
        button.setAttribute("aria-pressed", String(index === selectedImage)),
      ),
    );
}
document
  .querySelectorAll(".previous")
  .forEach((button) =>
    button.addEventListener("click", () => showImage(selectedImage - 1)),
  );
document
  .querySelectorAll(".next")
  .forEach((button) =>
    button.addEventListener("click", () => showImage(selectedImage + 1)),
  );
$(".open-lightbox").addEventListener("click", () => {
  setCart(false);
  lightbox.showModal();
});
$(".close-lightbox").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showImage(selectedImage + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
$(".menu-toggle").addEventListener("click", () => {
  setCart(false);
  menu.showModal();
});
$(".close-menu").addEventListener("click", () => menu.close());
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => menu.close()));
for (const dialog of [lightbox, menu])
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
// Keep keyboard navigation within each modal, including reverse tabbing.
for (const dialog of [lightbox, menu]) {
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll("button:not(:disabled), a[href]")];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
function updateQuantity(next) {
  quantity = Math.max(0, Math.min(99, next));
  $("#quantity").value = quantity;
  $(".decrease").disabled = quantity === 0;
  $(".increase").disabled = quantity === 99;
}
$(".decrease").addEventListener("click", () => updateQuantity(quantity - 1));
$(".increase").addEventListener("click", () => updateQuantity(quantity + 1));
function renderCart() {
  $(".badge").textContent = cartQuantity;
  $(".badge").hidden = !cartQuantity;
  $(".empty-cart").hidden = Boolean(cartQuantity);
  $(".filled-cart").hidden = !cartQuantity;
  $(".cart-calculation").textContent = `$125.00 × ${cartQuantity}`;
  $(".cart-total").textContent = `$${(125 * cartQuantity).toFixed(2)}`;
  cartToggle.setAttribute("aria-label", `Shopping cart, ${cartQuantity} items`);
  $(".checkout-note").hidden = true;
}
function setCart(open) {
  cart.hidden = !open;
  cartToggle.setAttribute("aria-expanded", String(open));
}
cartToggle.addEventListener("click", () => setCart(cart.hidden));
$(".add-to-cart").addEventListener("click", () => {
  if (!quantity) {
    $("#status").textContent = "Choose a quantity first.";
    return;
  }
  if (cartQuantity + quantity > 99) {
    $("#status").textContent = "You can add up to 99 pairs to your cart.";
    return;
  }
  cartQuantity += quantity;
  renderCart();
  $("#status").textContent =
    `${quantity} ${quantity === 1 ? "pair" : "pairs"} added to your cart.`;
});
$(".remove-item").addEventListener("click", () => {
  cartQuantity = 0;
  renderCart();
  $("#status").textContent = "Sneakers removed from your cart.";
  cartToggle.focus();
});
$(".checkout").addEventListener("click", () => {
  $(".checkout-note").hidden = false;
});
document.addEventListener("click", (event) => {
  if (!cart.contains(event.target) && !cartToggle.contains(event.target))
    setCart(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cart.hidden) {
    setCart(false);
    cartToggle.focus();
  }
});
showImage(0);
updateQuantity(0);
renderCart();
