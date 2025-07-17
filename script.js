document.addEventListener('DOMContentLoaded', function () {
  // --- Funcionalidad del menú Offcanvas ---
  const toggleButton = document.getElementById('menuToggle');
  const offcanvasMenu = document.getElementById('offcanvasNav');
  const closeButton = document.getElementById('closeOffcanvas');
  const navLinks = offcanvasMenu.querySelectorAll('.nav-link');

  // Alternar visibilidad del menú con el botón ☰
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      offcanvasMenu.classList.toggle('show');
    });
  }

  // Botón "X" cierra el menú
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      offcanvasMenu.classList.remove('show');
    });
  }

  // Al hacer clic en un enlace, cerrar el menú
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      offcanvasMenu.classList.remove('show');
    });
  });

  // --- Funcionalidad del formulario de contacto y Local Storage ---
  const form = document.querySelector('.needs-validation');
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const mensajeInput = document.getElementById('mensaje');
  const telefonoInput = document.getElementById('telefono');

  const nombreError = document.getElementById('nombreError');
  const correoError = document.getElementById('correoError');
  const mensajeError = document.getElementById('mensajeError');
  const telefonoError = document.getElementById('telefonoError');

  // Función para cargar datos desde localStorage
  function loadFormData() {
    if (nombreInput) nombreInput.value = localStorage.getItem('formName') || '';
    if (correoInput) correoInput.value = localStorage.getItem('formEmail') || '';
    if (telefonoInput) telefonoInput.value = localStorage.getItem('formPhone') || '';
    if (mensajeInput) mensajeInput.value = localStorage.getItem('formMessage') || '';
  }

  // Función para guardar datos en localStorage
  function saveFormData() {
    if (nombreInput) localStorage.setItem('formName', nombreInput.value.trim());
    if (correoInput) localStorage.setItem('formEmail', correoInput.value.trim());
    if (telefonoInput) localStorage.setItem('formPhone', telefonoInput.value.trim());
    if (mensajeInput) localStorage.setItem('formMessage', mensajeInput.value.trim());
  }

  // Cargar datos al iniciar la página si el formulario existe
  if (form) {
    loadFormData();

    // Event Listeners para guardar datos cada vez que se modifica un campo
    if (nombreInput) nombreInput.addEventListener('input', saveFormData);
    if (correoInput) correoInput.addEventListener('input', saveFormData);
    if (telefonoInput) telefonoInput.addEventListener('input', saveFormData);
    if (mensajeInput) mensajeInput.addEventListener('input', saveFormData);

    // Validación del formulario
    form.addEventListener('submit', function(event) {
      let isValid = true;

      // Reiniciar estados de validación
      [nombreInput, correoInput, mensajeInput, telefonoInput].forEach(input => {
        if (input) input.classList.remove('is-invalid', 'is-valid');
      });
      [nombreError, correoError, mensajeError, telefonoError].forEach(errorEl => {
        if (errorEl) errorEl.textContent = '';
      });

      // Validación del campo Nombre
      if (nombreInput && nombreInput.value.trim() === '') {
        nombreInput.classList.add('is-invalid');
        nombreError.textContent = 'Por favor, introduce tu nombre.';
        isValid = false;
      } else if (nombreInput) {
        nombreInput.classList.add('is-valid');
      }

      // Validación del campo Correo
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (correoInput && correoInput.value.trim() === '') {
        correoInput.classList.add('is-invalid');
        correoError.textContent = 'Por favor, introduce tu correo electrónico.';
        isValid = false;
      } else if (correoInput && !emailPattern.test(correoInput.value.trim())) {
        correoInput.classList.add('is-invalid');
        correoError.textContent = 'Por favor, introduce un correo electrónico válido.';
        isValid = false;
      } else if (correoInput) {
        correoInput.classList.add('is-valid');
      }

      // Validación del campo Mensaje
      if (mensajeInput && mensajeInput.value.trim() === '') {
        mensajeInput.classList.add('is-invalid');
        mensajeError.textContent = 'Por favor, escribe tu mensaje.';
        isValid = false;
      } else if (mensajeInput) {
        mensajeInput.classList.add('is-valid');
      }

      // Validación del campo Teléfono
      const phonePattern = /^[0-9]{9}$/; // Asumiendo un número de 9 dígitos
      if (telefonoInput && telefonoInput.value.trim() === '') {
        telefonoInput.classList.add('is-invalid');
        telefonoError.textContent = 'Por favor, introduce tu número de teléfono.';
        isValid = false;
      } else if (telefonoInput && !phonePattern.test(telefonoInput.value.trim())) {
        telefonoInput.classList.add('is-invalid');
        telefonoError.textContent = 'Por favor, introduce un número de teléfono válido (9 dígitos numéricos).';
        isValid = false;
      } else if (telefonoInput) {
        telefonoInput.classList.add('is-valid');
      }

      if (!isValid) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        alert('¡Formulario enviado con éxito!');
      }

      form.classList.add('was-validated');
    }, false);
  }

  // --- Adiciones de Manipulación del DOM (personalización de la página principal) ---
  const heroHeading = document.querySelector('.hero h1');
  if (heroHeading) {
    heroHeading.textContent = 'Tu Mejor Aliado en Tecnología';
  }

  const viewProductsBtn = document.querySelector('.hero .btn');
  if (viewProductsBtn) {
    viewProductsBtn.textContent = 'Explorar Productos';
    viewProductsBtn.href = 'catalog.html'; // Enlaza a la nueva página de catálogo
  }

  // --- Efectos de Hover para Tarjetas de Producto Destacado ---
  const featuredProductCards = document.querySelectorAll('#productos-destacados .product-card');
  featuredProductCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.border = '2px solid #00bfff';
          this.style.transform = 'scale(1.03)';
      });
      card.addEventListener('mouseleave', function() {
          this.style.border = 'none';
          this.style.transform = 'scale(1)';
      });
  });

  // === Funcionalidad del Carrito (para productos destacados en index.html) ===
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const buyButtons = document.querySelectorAll('#productos-destacados .add-to-cart'); // Selecciona solo los botones de "Comprar" de productos destacados

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
