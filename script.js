// Cart functionality
let cart = [];

// Function to add an item to the cart
function addToCart(productName, price) {
    const product = { name: productName, price: price, quantity: 1 };

    // Check if the item is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if item already in cart
    } else {
        cart.push(product); // Add new item to cart
    }

    alert(`${productName} has been added to your cart!`);
    updateCartDisplay();
}

// Function to display cart contents
function updateCartDisplay() {
    const cartModal = document.querySelector("#cartModal");
    const cartItems = document.querySelector("#cartItems");

    // Clear existing items in the cart display
    cartItems.innerHTML = "";

    // Populate cart display with items
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(listItem);
    });

    // Show the cart total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector("#cartTotal").textContent = `Total: $${total.toFixed(2)}`;
}

// Function to show the cart modal
function toggleCart() {
    const cartModal = document.querySelector("#cartModal");
    cartModal.classList.toggle("show");
}

// Function to checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}.`);
    cart = []; // Clear the cart after checkout
    updateCartDisplay();
    toggleCart();
}

// Event listeners for cart buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.parentElement;
            const productName = productElement.querySelector("h3").textContent;
            const price = parseFloat(productElement.querySelector("p").textContent.replace("$", ""));
            addToCart(productName, price);
        });
    });

    document.querySelector("#viewCart").addEventListener("click", toggleCart);
    document.querySelector("#checkoutButton").addEventListener("click", checkout);
});
