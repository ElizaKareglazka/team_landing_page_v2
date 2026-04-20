/* ═══════════════════════════════════════════
   app.js — Application Entry Point
   ═══════════════════════════════════════════ */

/**
 * Load data.json and initialize the site
 */
(async function init() {
  try {
    const response = await fetch('data.json?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();

    // Store globally for admin mode access
    window.siteData = data;

    // Render all sections
    renderSite(data);

    // Initialize utilities (after DOM is populated)
    requestAnimationFrame(() => {
      initScrollReveal();
      initNavHighlight();
      initThemeToggle();
      initAdmin();
    });

  } catch (error) {
    console.error('[App] Failed to load data.json:', error);
    document.body.innerHTML = `
      <div class="app-error">
        <div class="app-error-inner">
          <p class="app-error-title">Не удалось загрузить данные</p>
          <p class="app-error-desc">Проверьте соединение и перезагрузите страницу.</p>
          <button class="btn-primary" onclick="location.reload()">Обновить</button>
        </div>
      </div>
    `;
  }
})();
