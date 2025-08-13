document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DEL CATÁLOGO DE CURSOS ---

    // 1. Lógica para los botones de scroll de cada carrusel
    const categoryWrappers = document.querySelectorAll('.category-wrapper');
    categoryWrappers.forEach(wrapper => {
        const carousel = wrapper.querySelector('.course-carousel');
        const leftBtn = wrapper.querySelector('.scroll-btn.left');
        const rightBtn = wrapper.querySelector('.scroll-btn.right');
        
        const cardWidth = 280 + 25; // Ancho de la tarjeta + gap

        leftBtn.addEventListener('click', () => carousel.scrollLeft -= cardWidth);
        rightBtn.addEventListener('click', () => carousel.scrollLeft += cardWidth);

        function checkScroll() {
            leftBtn.classList.toggle('visible', carousel.scrollLeft > 0);
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            rightBtn.classList.toggle('visible', carousel.scrollLeft < maxScroll - 1);
        }
        carousel.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll(); // Comprobar al cargar
    });

    // 2. Lógica de la modal de temario
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('syllabus-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');

    // Base de datos de temarios de ejemplo
    const syllabuses = {
        'html-css': ["Intro a HTML5", "Estructura semántica", "Fundamentos de CSS3", "Flexbox y Grid", "Diseño Responsivo", "Proyecto Final"],
        'react-js': ["Intro a JSX", "Componentes y Props", "Estado y Ciclo de Vida", "Hooks (useState, useEffect)", "React Router", "Gestión de Estado con Redux"],
        'arduino': ["¿Qué es Arduino?", "Electrónica Básica", "Programación en C++ para Arduino", "Sensores y Actuadores", "Comunicación Serial", "Proyecto: Estación Meteorológica"],
        'circuits': ["Ley de Ohm y Kirchhoff", "Análisis de Nodos y Mallas", "Circuitos RL, RC y RLC", "Teoremas de Thevenin y Norton", "Análisis en Corriente Alterna"],
        'figma-ui': ["Introducción a Figma", "Diseño Atómico y Componentes", "Auto Layout y Constraints", "Prototipado Interactivo", "Design Systems", "Proyecto: App Móvil"]
    };

    document.querySelectorAll('.syllabus-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.course-item-card');
            const courseTitle = courseCard.querySelector('h3').textContent;
            const syllabusId = e.target.dataset.syllabus;
            
            modalTitle.textContent = `Temario: ${courseTitle}`;
            
            const syllabusItems = syllabuses[syllabusId] || ["Temario no disponible."];
            const list = document.createElement('ul');
            syllabusItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item;
                li.style.animationDelay = `${Cursos * 0.05}s`; // Animación escalonada
                list.appendChild(li);
            });
            modalBody.innerHTML = '';
            modalBody.appendChild(list);

            modalOverlay.classList.add('active');
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});