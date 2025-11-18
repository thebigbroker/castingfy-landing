/* ═══════════════════════════════════════════════════════════════════════════
   CASTINGFY - JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════════════

   FUNCIONALIDADES:
   - Validación y envío de formularios waitlist (demo con localStorage)
   - Acordeón FAQ (accesible con teclado y ARIA)
   - Tabs para alternar audiencia (Productores/Talento)
   - Navegación suave con anclas
   - Sistema de notificaciones toast

   PARA WEBFLOW:
   - Los acordeones pueden ser Interactions nativas (acordeón collapse)
   - Los tabs pueden ser Tabs component nativo
   - Los formularios pueden conectarse a Webflow Forms o Zapier/Make
   - Conserva los data-attributes para tracking con Google Analytics
*/

/* ═══════════════════════════════════════════════════════════════════════════
   UTILIDADES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Muestra un toast de notificación
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en ms (por defecto 3000)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.hidden = false;

  setTimeout(() => {
    toast.hidden = true;
  }, duration);
}

/**
 * Valida un email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Guarda en localStorage
 * @param {string} key
 * @param {any} value
 */
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
}

/**
 * Lee de localStorage
 * @param {string} key
 * @returns {any}
 */
function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error leyendo de localStorage:', error);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   WAITLIST FORMS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Maneja el envío de formularios de waitlist
 */
function handleWaitlistForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const role = formData.get('role');
  const location = form.dataset.location || 'unknown';

  // Validación
  if (!email || !isValidEmail(email)) {
    showToast('Por favor, introduce un email válido.', 3000);
    return;
  }

  if (!role) {
    showToast('Por favor, selecciona tu rol.', 3000);
    return;
  }

  // Simulación de envío (en producción, esto haría una petición a tu backend)
  const waitlistEntry = {
    email,
    role,
    location,
    timestamp: new Date().toISOString()
  };

  // Guardar en localStorage (demo)
  const existingEntries = getFromLocalStorage('castingfy_waitlist') || [];
  existingEntries.push(waitlistEntry);
  saveToLocalStorage('castingfy_waitlist', existingEntries);

  // Feedback visual
  showToast('¡Genial! Ya estás en la lista de espera. Te avisaremos pronto.', 4000);

  // Limpiar formulario
  form.reset();

  // En producción, aquí harías:
  /*
  fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(waitlistEntry)
  })
    .then(response => response.json())
    .then(data => {
      showToast('¡Genial! Ya estás en la lista de espera. Te avisaremos pronto.', 4000);
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Hubo un error. Por favor, inténtalo de nuevo.', 3000);
    });
  */

  // Tracking (descomenta si usas Google Analytics)
  /*
  if (typeof gtag !== 'undefined') {
    gtag('event', 'waitlist_signup', {
      event_category: 'engagement',
      event_label: location,
      value: role
    });
  }
  */
}

/**
 * Inicializa todos los formularios de waitlist
 */
function initWaitlistForms() {
  const forms = document.querySelectorAll('.waitlist-form');

  forms.forEach(form => {
    form.addEventListener('submit', handleWaitlistForm);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACORDEÓN FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa el comportamiento del acordeón
 */
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      if (!content) return;

      // Toggle estado
      trigger.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
    });

    // Accesibilidad: permitir Enter y Space
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   TABS (PRODUCTORES / TALENTO)
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa el comportamiento de los tabs
 */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);

      if (!targetPanel) return;

      // Desactivar todos los tabs y paneles
      tabs.forEach(t => {
        t.classList.remove('tab-active');
        t.setAttribute('aria-selected', 'false');
      });

      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('tab-panel-active');
        panel.hidden = true;
      });

      // Activar el tab y panel seleccionados
      tab.classList.add('tab-active');
      tab.setAttribute('aria-selected', 'true');
      targetPanel.classList.add('tab-panel-active');
      targetPanel.hidden = false;
    });

    // Accesibilidad: navegación con flechas
    tab.addEventListener('keydown', (event) => {
      const tabList = Array.from(tabs);
      const currentIndex = tabList.indexOf(tab);

      let newIndex = currentIndex;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        newIndex = currentIndex === 0 ? tabList.length - 1 : currentIndex - 1;
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        newIndex = currentIndex === tabList.length - 1 ? 0 : currentIndex + 1;
      }

      if (newIndex !== currentIndex) {
        tabList[newIndex].focus();
        tabList[newIndex].click();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SWITCH
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa el switch entre vistas de Talento y Productora
 */
function initHeroSwitch() {
  const switchButtons = document.querySelectorAll('.hero__switch-btn');
  const views = document.querySelectorAll('.hero__view');

  switchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetView = button.getAttribute('data-view');

      // Actualizar botones
      switchButtons.forEach(btn => {
        btn.classList.remove('hero__switch-btn--active');
      });
      button.classList.add('hero__switch-btn--active');

      // Actualizar vistas
      views.forEach(view => {
        const viewType = view.getAttribute('data-view-content');
        if (viewType === targetView) {
          view.classList.add('hero__view--active');
          // Reiniciar animación de texto rotativo
          const rotatingText = view.querySelector('.hero__rotating-text');
          if (rotatingText) {
            initRotatingText(rotatingText);
          }
        } else {
          view.classList.remove('hero__view--active');
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEXTO ROTATIVO
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa el texto rotativo en el hero
 */
function initRotatingText(element) {
  if (!element) return;

  const words = JSON.parse(element.getAttribute('data-words') || '[]');
  if (words.length === 0) return;

  let currentIndex = 0;

  function rotateText() {
    element.style.opacity = '0';

    setTimeout(() => {
      element.textContent = words[currentIndex];
      element.style.opacity = '1';
      currentIndex = (currentIndex + 1) % words.length;
    }, 300);
  }

  // Mostrar primera palabra
  element.textContent = words[0];
  element.style.transition = 'opacity 300ms ease';

  // Rotar cada 3 segundos
  setInterval(rotateText, 3000);
}

/**
 * Inicializa todos los textos rotativos
 */
function initAllRotatingTexts() {
  // Solo inicializar el texto de la vista activa
  const activeView = document.querySelector('.hero__view--active');
  if (activeView) {
    const rotatingText = activeView.querySelector('.hero__rotating-text');
    if (rotatingText) {
      initRotatingText(rotatingText);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   DROPDOWNS DEL NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa los menús desplegables del navbar
 */
function initNavbarDropdowns() {
  const dropdownButtons = document.querySelectorAll('.navbar__link--dropdown');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Cerrar todos los dropdowns
      dropdownButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle el actual
      if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Cerrar dropdowns al hacer click fuera
  document.addEventListener('click', () => {
    dropdownButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Prevenir que se cierre al hacer click dentro del dropdown
  const dropdownMenus = document.querySelectorAll('.navbar__dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
}

/**
 * Inicializa el menú móvil
 */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.navbar__mobile-toggle');
  const navbarMenu = document.querySelector('.navbar__menu');

  if (!mobileToggle || !navbarMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);

    // Toggle clase para mostrar/ocultar menú móvil
    mobileToggle.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  });

  // Cerrar menú al hacer click en un link
  const navLinks = navbarMenu.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('is-active');
      navbarMenu.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVEGACIÓN SUAVE
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Mejora la navegación con anclas (smooth scroll)
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      // Ignorar # sin ID
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        // Offset para el navbar sticky
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Actualizar hash sin saltar
        history.pushState(null, '', targetId);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   INICIALIZACIÓN
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Inicializa todos los componentes cuando el DOM esté listo
 */
function init() {
  console.log('🎬 Castingfy - Landing page cargada');

  // Inicializar componentes
  initNavbarDropdowns();
  initMobileMenu();
  initHeroSwitch();
  initAllRotatingTexts();
  initWaitlistForms();
  initAccordion();
  initTabs();
  initSmoothScroll();

  // Debug: mostrar entradas guardadas en localStorage
  const savedEntries = getFromLocalStorage('castingfy_waitlist');
  if (savedEntries && savedEntries.length > 0) {
    console.log(`📋 ${savedEntries.length} entradas en la waitlist (localStorage):`, savedEntries);
  }

  // Detectar preferencia de rol guardada (opcional: pre-seleccionar en formularios)
  const lastEntry = savedEntries?.[savedEntries.length - 1];
  if (lastEntry?.role) {
    console.log(`👤 Último rol registrado: ${lastEntry.role}`);
    // Opcional: pre-seleccionar en los formularios
    // document.querySelectorAll('select[name="role"]').forEach(select => {
    //   select.value = lastEntry.role;
    // });
  }

  // Animación de entrada suave (fade-in del body)
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 400ms ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORTS (si usas módulos ES6 en el futuro)
   ═══════════════════════════════════════════════════════════════════════════ */

// Si necesitas exportar funciones para testing o migración:
// export { showToast, isValidEmail, handleWaitlistForm };
