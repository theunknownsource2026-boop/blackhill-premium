// ========================================
// BLACK HILL - PREMIUM JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADING SCREEN ----
  const loader = document.querySelector('.loader');
  if (loader) {
    const letters = loader.querySelectorAll('.loader-text span, .loader-brand span');
    letters.forEach((letter, i) => {
      letter.style.animationDelay = `${i * 0.08}s`;
    });
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
    document.body.style.overflow = 'hidden';
  }

  // ---- SCROLL PROGRESS BAR ----
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  // ---- MAGNETIC CURSOR ----
  const cursorOuter = document.querySelector('.cursor-outer');
  const cursorInner = document.querySelector('.cursor-inner');
  if (cursorOuter && cursorInner && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.body.classList.add('cursor-visible');
    });

    function animateCursor() {
      // Inner follows tightly
      innerX += (mouseX - innerX) * 0.2;
      innerY += (mouseY - innerY) * 0.2;
      cursorInner.style.left = innerX + 'px';
      cursorInner.style.top = innerY + 'px';

      // Outer follows with elastic lag
      outerX += (mouseX - outerX) * 0.08;
      outerY += (mouseY - outerY) * 0.08;
      cursorOuter.style.left = outerX + 'px';
      cursorOuter.style.top = outerY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .category-card, .filter-pill, .nav-link');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---- NAVBAR ----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      // Glass morphism on scroll
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      // Hide/show on scroll direction
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger') || document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- CART DRAWER ----
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartBtns = document.querySelectorAll('.cart-btn, .cart-toggle, .add-to-cart, .product-add');
  const cartClose = document.querySelector('.cart-close');
  const cartContinue = document.querySelector('.cart-continue');

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add('open');
    if (cartDrawer) cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('open');
    if (cartDrawer) cartDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCart();
      // Update cart count
      const countEl = document.querySelector('.cart-count');
      if (countEl) {
        let count = parseInt(countEl.textContent) || 0;
        countEl.textContent = count + 1;
      }
    });
  });
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartContinue) cartContinue.addEventListener('click', (e) => { e.preventDefault(); closeCart(); });
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Cart quantity buttons
  document.querySelectorAll('.cart-quantity button').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = btn.parentElement.querySelector('span');
      let val = parseInt(span.textContent);
      if (btn.classList.contains('qty-minus')) val = Math.max(1, val - 1);
      else val++;
      span.textContent = val;
    });
  });

  // ---- RIPPLE EFFECT ON BUTTONS ----
  document.querySelectorAll('.btn, .add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---- BACK TO TOP ----
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- GSAP SCROLL ANIMATIONS ----
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements with .animate class
    gsap.utils.toArray('.animate').forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // Slide left elements
    gsap.utils.toArray('.slide-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });

    // Slide right elements
    gsap.utils.toArray('.slide-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });

    // Hero title letter animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const letters = heroTitle.querySelectorAll('span');
      if (letters.length) {
        gsap.fromTo(letters,
          { opacity: 0, y: 80, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.04, ease: 'power4.out', delay: 1.9 }
        );
      }
    }

    // Hero subtitle and buttons
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.5 }
    );
    gsap.fromTo('.hero-buttons .btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 2.8 }
    );

    // Parallax effects
    gsap.utils.toArray('.parallax').forEach(el => {
      gsap.to(el, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Stagger product cards
    gsap.utils.toArray('.product-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 80%' }
        }
      );
    });

    // Stagger category cards
    gsap.utils.toArray('.category-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.category-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 80%' }
        }
      );
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach(item => {
      gsap.fromTo(item.querySelector('.timeline-content'),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' }
        }
      );
    });
  }

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  // ---- SWIPER INITIALIZATION ----
  if (typeof Swiper !== 'undefined') {
    // Featured products carousel
    const featuredSwiper = document.querySelector('.featured-swiper');
    if (featuredSwiper) {
      new Swiper(featuredSwiper, {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        breakpoints: {
          480: { slidesPerView: 2.2, spaceBetween: 20 },
          768: { slidesPerView: 3.2, spaceBetween: 24 },
          1024: { slidesPerView: 4.2, spaceBetween: 28 },
          1400: { slidesPerView: 4.5, spaceBetween: 30 }
        },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }

    // Related products carousel
    const relatedSwiper = document.querySelector('.related-swiper');
    if (relatedSwiper) {
      new Swiper(relatedSwiper, {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        breakpoints: {
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4, spaceBetween: 24 }
        }
      });
    }
  }

  // ---- PRODUCT PAGE TABS ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ---- COLOR SWATCHES ----
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.parentElement.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // ---- SIZE BUTTONS ----
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- QUANTITY SELECTOR ----
  document.querySelectorAll('.quantity-selector').forEach(selector => {
    const minus = selector.querySelector('.qty-minus');
    const plus = selector.querySelector('.qty-plus');
    const input = selector.querySelector('input');
    if (minus && plus && input) {
      minus.addEventListener('click', () => { input.value = Math.max(1, parseInt(input.value) - 1); });
      plus.addEventListener('click', () => { input.value = parseInt(input.value) + 1; });
    }
  });

  // ---- GALLERY THUMBNAILS ----
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumb.parentElement.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainImg = document.querySelector('.gallery-main img');
      const thumbImg = thumb.querySelector('img');
      if (mainImg && thumbImg) {
        const thumbSrc = thumbImg.src.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=1000');
        mainImg.src = thumbSrc;
        mainImg.alt = thumbImg.alt;
      }
    });
  });

  // ---- STICKY ADD TO CART BAR ----
  const stickyCart = document.querySelector('.sticky-cart');
  const productActions = document.querySelector('.product-actions');
  if (stickyCart && productActions) {
    window.addEventListener('scroll', () => {
      const rect = productActions.getBoundingClientRect();
      if (rect.bottom < 0) {
        stickyCart.classList.add('visible');
      } else {
        stickyCart.classList.remove('visible');
      }
    });
  }

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });

  // ---- FILTER PILLS ----
  // Filter pills - actually filter products
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter || pill.textContent.trim().toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = '';
          gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- VIEW TOGGLE ----
  // View toggle - grid vs list
  document.querySelectorAll('.view-toggle button, .view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.view-toggle') || btn.parentElement;
      parent.querySelectorAll('button, .view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.querySelector('.product-grid');
      if (grid) {
        const isListView = btn.classList.contains('view-list') || btn.dataset.view === 'list';
        if (isListView) {
          grid.style.gridTemplateColumns = '1fr';
          grid.querySelectorAll('.product-card').forEach(c => c.style.display = 'flex');
        } else {
          grid.style.gridTemplateColumns = '';
          grid.querySelectorAll('.product-card').forEach(c => c.style.display = '');
        }
      }
    });
  });

  // ---- SIZE GUIDE MODAL ----
  const sizeGuideLink = document.querySelector('.size-guide-link');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  if (sizeGuideLink && modalOverlay) {
    sizeGuideLink.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- SEARCH OVERLAY ----
  const searchBtns = document.querySelectorAll('.nav-search');
  searchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = document.querySelector('.search-overlay');
      if (overlay) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        const input = overlay.querySelector('.search-overlay-input');
        if (input) setTimeout(() => input.focus(), 300);
      }
    });
  });
  const searchClose = document.querySelector('.search-overlay-close');
  const searchOverlay = document.querySelector('.search-overlay');
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- FORM FLOATING LABELS (fallback for browsers without :placeholder-shown) ----
  document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => {
      if (!input.value) input.parentElement.classList.remove('focused');
    });
  });

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- PAGE TRANSITION (for multi-page nav) ----
  // Subtle fade when navigating between pages
  document.querySelectorAll('a:not([href^="#"]):not([href^="javascript"])').forEach(link => {
    if (link.hostname === window.location.hostname && !link.classList.contains('no-transition')) {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          e.preventDefault();
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.3s ease';
          setTimeout(() => { window.location.href = href; }, 300);
        }
      });
    }
  });

  // ---- CONTACT FORM VALIDATION ----
  const contactForm = document.querySelector('.contact-form form, form.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ff4444';
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
        }
      });
      const email = contactForm.querySelector('input[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        email.style.borderColor = '#ff4444';
      }
      if (valid) {
        const btn = contactForm.querySelector('button[type="submit"], .btn-submit');
        if (btn) {
          btn.textContent = 'Message Sent!';
          btn.style.background = '#2ecc71';
          contactForm.reset();
          setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
        }
      }
    });
  }

  // Fade in on page load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });

});
