document.addEventListener('DOMContentLoaded', function () {
  // --- Funcionalidad del menú Offcanvas ---
  const toggleButton = document.getElementById('menuToggle');
  const offcanvasMenu = document.getElementById('offcanvasNav');
  const closeButton = document.getElementById('closeOffcanvas');
  const navLinks = offcanvasMenu.querySelectorAll('.nav-link');

  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      offcanvasMenu.classList.toggle('show');
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      offcanvasMenu.classList.remove('show');
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      offcanvasMenu.classList.remove('show');
    });
  });

  // --- Funcionalidad de Búsqueda y Filtrado de Productos ---
  const productSearchInput = document.getElementById('productSearch');
  const productCategorySelect = document.getElementById('productCategory');
  const productCards = document.querySelectorAll('.products-grid .grid-item'); // Seleccionar los contenedores de las tarjetas

  function filterProducts() {
    const searchTerm = productSearchInput.value.toLowerCase();
    const selectedCategory = productCategorySelect.value;

    productCards.forEach(cardContainer => {
      const cardTitle = cardContainer.querySelector('.card-title').textContent.toLowerCase();
      const cardCategory = cardContainer.dataset.category;

      const matchesSearch = cardTitle.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

      if (matchesSearch && matchesCategory) {
        cardContainer.style.display = 'block'; // Mostrar el producto
      } else {
        cardContainer.style.display = 'none'; // Ocultar el producto
      }
    });
  }

  // Event Listeners para la búsqueda y el filtro
  if (productSearchInput) {
    productSearchInput.addEventListener('keyup', filterProducts);
  }
  if (productCategorySelect) {
    productCategorySelect.addEventListener('change', filterProducts);
  }

  // --- Efectos de Hover para Tarjetas de Producto ---
  const actualProductCards = document.querySelectorAll('.products-grid .product-card');
  actualProductCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.border = '2px solid #00bfff';
          this.style.transform = 'scale(1.03)';
      });
      card.addEventListener('mouseleave', function() {
          this.style.border = 'none';
          this.style.transform = 'scale(1)';
      });
  });

  // === Funcionalidad del Carrito (para todos los productos en catalog.html) ===
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const buyButtons = document.querySelectorAll('.product-card .add-to-cart'); // Selecciona todos los botones de "Comprar"

  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito desde localStorage

  // Mostrar/Ocultar carrito
  if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
      cartSidebar.classList.add('show');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('show');
    });
  }

  // Agregar al carrito
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const title = card.querySelector('.card-title').textContent;
      const priceText = card.querySelector('.fw-bold').textContent;
      const price = parseFloat(priceText.replace('S/', '').replace(',', ''));
      
      const existingItem = cart.find(item => item.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, price, quantity: 1 });
      }

      saveCart(); // Guardar carrito en localStorage
      renderCart();
    });
  });

  // Renderiza los ítems del carrito en la barra lateral
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">El carrito está vacío.</p>';
    }

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.innerHTML = `
        <h6>${item.title}</h6>
        <div class="quantity">
          <button onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
          <button onclick="removeItem(${index})" style="color: red;">🗑️</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    cartTotalEl.textContent = `S/ ${total.toFixed(2)}`;
  }

  // Guardar carrito en localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Hacer accesibles desde el DOM global para los botones onclick
  window.updateQuantity = (index, change) => {
    if (cart[index]) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      saveCart(); // Guardar carrito en localStorage
      renderCart();
    }
  };

  window.removeItem = (index) => {
    if (cart[index]) {
      cart.splice(index, 1);
      saveCart(); // Guardar carrito en localStorage
      renderCart();
    }
  };

  // Renderizar el carrito al cargar la página
  renderCart();

  // --- Cambios de Estilo mediante JS (Footer) ---
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.backgroundColor = '#1a1a2e';
  }
});

// Obtén el total del carrito al abrir el modal
  const btnFinalizar = document.querySelector('[data-bs-target="#modalPago"]');
  btnFinalizar.addEventListener('click', () => {
    const total = document.getElementById('cartTotal').innerText;
    document.getElementById('totalPago').innerText = total;
  });

  // Validar y procesar pago
  document.getElementById('formPago').addEventListener('submit', function(e) {
    e.preventDefault();

    // Aquí puedes conectar una API real si quieres (Stripe, Culqi, etc)
    alert('¡Pago procesado correctamente! Gracias por tu compra.');

    // Cierra el modal
    const modalPago = bootstrap.Modal.getInstance(document.getElementById('modalPago'));
    modalPago.hide();

    // Limpia carrito, si quieres
    // limpiarCarrito();
  });
