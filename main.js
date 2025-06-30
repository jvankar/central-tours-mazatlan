// Menú móvil
function setupMenu() {
  const menuBtn = document.getElementById("menu-button");
  const navLinks = document.getElementById("nav-links");
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });
  
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("active");
    }
  });
}

// Unified Search Functionality
function setupSearch() {
  const searchContainer = document.getElementById('search-container');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchForm = document.getElementById('search-form');
  const searchResults = document.getElementById('search-results');
  const html = document.documentElement;
  const isMobile = window.innerWidth <= 1024;

  // Website content for search (to be replaced with PHP index in future)
  const websiteContent = [
    { title: "Inicio", url: "index.php", content: "Bienvenido a nuestro sitio web principal", category: "Página Principal" },
    { title: "Productos", url: "catalogo.php", content: "Nuestra colección de productos destacados", category: "Catálogo" },
    { title: "Producto Premium", url: "catalogo.php#premium", content: "Nuestro producto más avanzado con todas las características", category: "Catálogo" },
    { title: "Servicios", url: "index.php#servicios", content: "Ofrecemos diversos servicios profesionales", category: "Ofertas" },
    { title: "Blog", url: "blog.php", content: "Artículos y noticias sobre nuestra industria", category: "Contenido" },
    { title: "Últimas Noticias", url: "blog.php#noticias", content: "Mantente actualizado con nuestras últimas noticias", category: "Contenido" },
    { title: "Contacto", url: "index.php#contacto", content: "Cómo ponerte en contacto con nuestro equipo", category: "Información" },
    { title: "Sobre Nosotros", url: "index.php#quienes-somos", content: "Conoce nuestra historia y equipo", category: "Información" }
  ];

  // Toggle mobile search visibility
  const toggleMobileSearch = () => {
    searchInput.classList.toggle('active');
    html.style.overflowY = searchInput.classList.contains('active') ? 'hidden' : '';
    
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchResults.classList.remove('active');
    }
  };

  // Close mobile search
  const closeMobileSearch = () => {
    if (isMobile && searchInput.classList.contains('active')) {
      searchInput.classList.remove('active');
      html.style.overflowY = '';
      searchResults.classList.remove('active');
    }
  };

  // Show search results
  const showResults = (results) => {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No se encontraron resultados';
      searchResults.appendChild(noResults);
      return;
    }
    
    results.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      resultItem.innerHTML = `
        <img src="material/svg/search-line.svg" alt="" width="16" height="16">
        <div>
          <div>${item.title}</div>
          <small style="color:#777;font-size:0.8em">${item.category}</small>
        </div>
      `;
      
      resultItem.addEventListener('click', () => {
        window.location.href = item.url;
      });
      
      searchResults.appendChild(resultItem);
    });
    
    if (isMobile) {
      searchResults.classList.add('active');
    } else {
      searchContainer.classList.add('active');
    }
  };

  // Search through content
  const searchContent = (query) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return websiteContent.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery)) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery))
    );
  };

  // Event listeners
  if (isMobile) {
    // Mobile-specific behavior
    searchButton.addEventListener('click', toggleMobileSearch);
    
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target) && !searchInput.contains(e.target)) {
        closeMobileSearch();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.classList.contains('active')) {
        closeMobileSearch();
      }
    });
  } else {
    // Desktop-specific behavior
    searchButton.addEventListener('click', () => {
      if (searchInput.value.trim()) {
        searchForm.submit();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchContainer.classList.remove('active');
      }
    });
  }

  // Shared behavior
  searchInput.addEventListener('input', function() {
    const query = this.value;
    const results = searchContent(query);
    showResults(results);
    
    if (!query.trim()) {
      if (isMobile) {
        searchResults.classList.remove('active');
      } else {
        searchContainer.classList.remove('active');
      }
    }
  });

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // Submit form normally (will go to busqueda.php)
      this.submit();
    }
  });

  searchInput.addEventListener('focus', function() {
    if (this.value.trim()) {
      const results = searchContent(this.value);
      showResults(results);
    }
  });
}

// Landing page carousel
function setupCarousel(carouselRoot) {
  // Check if desktop carousel
  const isDesktop = carouselRoot.classList.contains('desktop-carousel');
  
  // Select elements based on carousel type
  const track = carouselRoot.querySelector(isDesktop ? '.carousel-track-desktop' : '.carousel-track');
  const slides = carouselRoot.querySelectorAll(isDesktop ? '.carousel-slide-desktop' : '.carousel-slide');
  const nextButton = carouselRoot.querySelector(isDesktop ? '.carousel-button-right-desktop' : '.carousel-button-right');
  const prevButton = carouselRoot.querySelector(isDesktop ? '.carousel-button-left-desktop' : '.carousel-button-left');
  const dots = carouselRoot.querySelectorAll(isDesktop ? '.carousel-indicator-desktop' : '.carousel-indicator');
  const container = carouselRoot.querySelector(isDesktop ? '.carousel-container-desktop' : '.carousel-container');
  
  if (!track || slides.length === 0) return;
  
  let currentSlide = 0;
  const autoPlayDelay = 8000;
  let intervalId, timeoutId;
  let isPaused = false;
  
  const calculateSlideWidth = () => slides[0]?.getBoundingClientRect().width || 0;
  let slideWidth = calculateSlideWidth();
  
  track.style.transition = 'transform 0.7s cubic-bezier(0.33, 0, 0.2, 1)';
  slides.forEach(slide => slide.style.transition = 'opacity 0.5s ease');
  
  const updateCarousel = () => {
    slideWidth = calculateSlideWidth();
    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    
    // Update slides and indicators with appropriate classes
    slides.forEach((slide, i) => {
      slide.style.opacity = i === currentSlide ? '1' : '0';
      slide.classList.toggle(isDesktop ? 'current-slide-desktop' : 'current-slide', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle(isDesktop ? 'current-slide-desktop' : 'current-slide', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  };
  
  const startAutoPlay = () => {
    stopAutoPlay();
    if (!isPaused) {
      timeoutId = setTimeout(() => {
        nextSlide();
        intervalId = setInterval(nextSlide, autoPlayDelay);
      }, autoPlayDelay);
    }
  };
  
  const stopAutoPlay = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
  
  const handleInteraction = () => {
    stopAutoPlay();
    startAutoPlay();
  };
  
  // Event listeners
  nextButton?.addEventListener('click', () => {
    nextSlide();
    handleInteraction();
  });
  
  prevButton?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    handleInteraction();
  });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateCarousel();
      handleInteraction();
    });
  });
  
  // Pause on hover/touch
  if (container) {
    ['mouseenter', 'touchstart'].forEach(evt => {
      container.addEventListener(evt, () => {
        isPaused = true;
        stopAutoPlay();
      }, { passive: true });
    });
    
    ['mouseleave', 'touchend'].forEach(evt => {
      container.addEventListener(evt, () => {
        isPaused = false;
        startAutoPlay();
      }, { passive: true });
    });
  }
  
  // Initialize carousel
  const init = () => {
    slideWidth = calculateSlideWidth();
    updateCarousel();
    startAutoPlay();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        slideWidth = calculateSlideWidth();
        updateCarousel();
      }, 250);
    });
  };
  
  init();
}

// Initialize both carousels
document.querySelectorAll('.mobile-carousel, .desktop-carousel').forEach(setupCarousel);

// Carrusel de paseos 
function setupCarouselPaseos(carouselRoot) {
  const trackContainer = carouselRoot.querySelector('.paseos-carousel-track-container');
  const track = carouselRoot.querySelector('.paseos-carousel-track');
  const slides = Array.from(carouselRoot.querySelectorAll('.paseos-carousel-slide'));
  const nextBtn = carouselRoot.querySelector('.paseos-carousel-button-right');
  const prevBtn = carouselRoot.querySelector('.paseos-carousel-button-left');
  const dots = Array.from(carouselRoot.querySelectorAll('.paseos-carousel-indicator'));
  const container = carouselRoot.querySelector('.paseos-carousel-container');
  if (!track || slides.length === 0) return;

  // Layout inicial
  track.style.display = 'flex';
  slides.forEach(slide => {
    slide.style.minWidth = '100%';
    slide.style.opacity = '0';
    slide.style.transition = 'opacity 0.5s ease';
  });

  let current = 0;
  const delay = 8000;
  let autoId, resumeId;
  let paused = false;

  const goTo = idx => {
    current = (idx + slides.length) % slides.length;
    
    // FIXED: Use slide width instead of container width
    const slideWidth = slides[0].getBoundingClientRect().width;
    const offset = -current * slideWidth;
    
    track.style.transition = 'transform 0.7s cubic-bezier(0.33,0,0.2,1)';
    track.style.transform = `translateX(${offset}px)`;
    
    slides.forEach((s, i) => {
      s.style.opacity = i === current ? '1' : '0';
      s.classList.toggle('paseos-current-slide', i === current);
    });
    
    dots.forEach((d, i) => {
      d.classList.toggle('paseos-current-slide', i === current);
      d.setAttribute('aria-selected', i === current);
    });
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  const start = () => {
    clearTimeout(resumeId);
    resumeId = setTimeout(() => {
      next();
      autoId = setInterval(next, delay);
    }, delay);
  };
  const stop = () => {
    clearTimeout(resumeId);
    clearInterval(autoId);
  };

  nextBtn.addEventListener('click', () => {
    next();
    start();
  });
  prevBtn.addEventListener('click', () => {
    prev();
    start();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      start();
    });
  });

  ['mouseenter', 'touchstart'].forEach(evt => {
    container.addEventListener(
      evt,
      () => {
        paused = true;
        stop();
      },
      { passive: true }
    );
  });

  ['mouseleave', 'touchend'].forEach(evt => {
    container.addEventListener(
      evt,
      () => {
        paused = false;
        start();
      },
      { passive: true }
    );
  });

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => goTo(current), 250);
  });

  // Inicialización
  goTo(0);
  if (!paused) start();
}

// Reveal scroll genérico
function setupReveal(selector, options, onVisible) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onVisible(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  elements.forEach(el => observer.observe(el));
}

// ===== INICIALIZACIÓN EN CARGA =====

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupSearch();  // Actualizado a setupSearch

  // Carruseles principales
  document.querySelectorAll('.carousel-wrapper').forEach(setupCarousel);

  // Carruseles de paseos (actualizado)
  document.querySelectorAll('.paseos-carousel-wrapper').forEach(setupCarouselPaseos);

  // Reveal scroll main
  setupReveal('.about-card',              { threshold: 0.2 }, el => el.classList.add('visible'));
  setupReveal('.catalog-article-content', { threshold: 0.2 }, el => el.classList.add('visible'));

  // Reveal scroll paseos
  setupReveal('.paseos-description-container', { threshold: 0.2 }, el => el.classList.add('visible'));
  setupReveal('.paseos-price-card',            { threshold: 0.1 }, el => {
    el.style.opacity   = '1';
    el.style.transform = 'scale(1)';
  });

  // Para tarjetas de texto en desktop
  setupReveal('.about-card-desktop', { 
    threshold: 0.2 
  }, el => {
    el.classList.add('visible');
  });
  
  // Para imágenes en desktop (con retardo alternado)
  setupReveal('.grid-item', { 
    threshold: 0.1 
  }, el => {
    const delay = el.classList.contains('grid-pos-1') || el.classList.contains('grid-pos-3') ? 0 : 200;
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
  
  // Para el título principal en desktop
  setupReveal('.section-title-desktop', { 
    threshold: 0.1 
  }, el => {
    el.classList.add('visible');
  });
});