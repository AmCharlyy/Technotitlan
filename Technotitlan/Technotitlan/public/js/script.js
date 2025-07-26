document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DE LA BARRA LATERAL ---
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleBtn = document.getElementById('toggle-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const toggleIcon = toggleBtn.querySelector('i');

    function isMobile() { return window.innerWidth <= 992; }

    function toggleSidebar() {
        if (isMobile()) {
            sidebar.classList.remove('opened');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
            const isCollapsed = sidebar.classList.contains('collapsed');
            toggleIcon.className = isCollapsed ? 'fas fa-bars' : 'fas fa-times';
            toggleBtn.setAttribute('title', isCollapsed ? 'Desplegar Menú' : 'Plegar Menú');
        }
    }

    toggleBtn.addEventListener('click', toggleSidebar);
    mobileMenuBtn.addEventListener('click', () => sidebar.classList.add('opened'));
    
    // --- LÓGICA DEL CARRUSEL DE CURSOS ---
    const coursesContainer = document.getElementById('courses-container');
    const coursesGrid = document.getElementById('courses-grid');
    const paginationDotsContainer = document.getElementById('pagination-dots');
    const cards = Array.from(coursesGrid.children);

    if (cards.length > 0) {
        // 1. Crear los puntos de paginación
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`);
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth;
                const gap = parseInt(window.getComputedStyle(coursesGrid).gap);
                coursesContainer.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth'
                });
            });
            paginationDotsContainer.appendChild(dot);
        });

        const dots = Array.from(paginationDotsContainer.children);

        // 2. Actualizar el punto activo al deslizar
        function updateActiveDot() {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(coursesGrid).gap);
            const scrollLeft = coursesContainer.scrollLeft;
            const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
        
        // Usar IntersectionObserver para una mejor performance que 'onscroll'
        const observer = new IntersectionObserver(() => {
            requestAnimationFrame(updateActiveDot);
        }, { root: coursesContainer, threshold: 0.5 });

        observer.observe(coursesContainer);
        coursesContainer.addEventListener('scroll', () => {
             requestAnimationFrame(updateActiveDot);
        });

        // Activar el primer punto al cargar
        updateActiveDot();
    }

    // --- AJUSTES EN RESIZE ---
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            sidebar.classList.remove('opened');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
            toggleIcon.className = 'fas fa-times';
        }
    });
});