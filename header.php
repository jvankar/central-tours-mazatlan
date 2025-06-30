<?php ?><!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="description" content="Vive las mejores aventuras en Mazatlán con Central Tours. Disfruta de tours por la ciudad, paseos en yate, actividades extremas, y mucho más con atención personalizada y experiencias inolvidables.">
  <meta name="keywords" content="Mazatlán, Tours, Paseos en yate, Banda sinaloense, Actividades turísticas, Transportación, Rentas vacacionales, Paquetes turísticos, Pesca deportiva, Yates, Helicópteros">
  <meta name="author" content="Central Tours Mazatlán">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="Central Tours Mazatlán - Todos los tours en Mazatlán en un solo lugar">
  <meta property="og:description" content="Explora Mazatlán con Central Tours: city tours, paseos en yate, actividades extremas, paquetes turísticos y mucho más. ¡Haz de tu visita una experiencia única!">
  <meta property="og:image" content="https://www.centraltoursmazatlan.com/material/logo_faro.svg">
  <meta property="og:url" content="https://www.centraltoursmazatlan.com">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Central Tours Mazatlán">
  <meta property="og:locale" content="es_MX">
  <meta property="og:image:alt" content="Logo de Central Tours Mazatlán">
  <meta property="og:image:type" content="image/svg+xml">
  <link rel="preload" href="material/fonts/Manjari-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="material/fonts/Poppins-Medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="material/whatsapp-icon.json" as="fetch" crossorigin="anonymous">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link rel="stylesheet" href="styles.css">
  <script src="main.js" defer></script>
  <title>Central Tours Mazatlán</title>
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Main menu">
      <div class="nav__header">
        <div class="nav_inner_group">
          <button class="nav_menu_button" id="menu-button" aria-expanded="false" aria-controls="nav-links">
            <img src="material/svg/menu-button.svg" alt="Abrir menú" class="menu-icon" loading="lazy">
          </button>
          <div class="logo">
            <a href="index.php" title="Ir a la página principal">
              <img src="material/svg/logo-completo-header.svg" alt="Logo de Central Tours Mazatlán" class="logo-image" width="160" loading="lazy">
            </a>
          </div>
          
          <!-- Unified Search Container -->
          <div id="search-container">
            <form id="search-form" role="search" action="busqueda.php" method="GET" aria-label="Website search">
              <input type="text" id="search-input" name="q" placeholder="Buscar..." autocomplete="off">
              <button type="button" id="search-button" aria-label="Enviar búsqueda">
                <img src="material/svg/search-line.svg" alt="" class="search-icon" width="20" height="20" aria-hidden="true">
              </button>
            </form>
            <div id="search-results" class="search-results" aria-live="polite"></div>
          </div>
          
          <ul class="nav_links" id="nav-links">
            <li><a id="link-inicio" href="index.php" title="Ir al inicio"><img src="material/svg/inicio.svg" alt=""><span>INICIO</span></a></li>
            <li><a href="index.php#quienes-somos" title="Quiénes somos"><img src="material/svg/acerca-de-nosotros.svg" alt=""><span>NOSOTROS</span></a></li>
            <li><a href="catalogo.php" title="Catálogo de tours"><img src="material/svg/catalogo.svg" alt=""><span>CATÁLOGO</span></a></li>
            <li><a href="blog.php" title="Nuestro blog"><img src="material/svg/article-line.svg" alt=""><span>MAZABLOG</span></a></li>
            <li><a href="index.php#contacto" title="Contacto"><img src="material/svg/contacto.svg" alt=""><span>CONTACTO</span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>