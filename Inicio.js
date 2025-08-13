document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DEL DASHBOARD DE INICIO ---

    // 1. Renderizar los círculos de progreso
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const progress = circle.dataset.progress;
        circle.style.setProperty('--progress', progress);
        // El texto ya está en el HTML, pero si quisieras generarlo:
        // circle.querySelector('.percentage').textContent = `${progress}%`;
    });


    // 2. Lógica para los botones de scroll horizontal
    const scroller = document.getElementById('course-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (scroller) {
        const cardWidth = 340; // Ancho de la tarjeta (300px) + gap (40px)

        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollLeft -= cardWidth;
        });

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollLeft += cardWidth;
        });

        // Función para mostrar/ocultar los botones de scroll
        function checkScroll() {
            // Mostrar u ocultar el botón izquierdo
            if (scroller.scrollLeft > 0) {
                scrollLeftBtn.classList.add('visible');
            } else {
                scrollLeftBtn.classList.remove('visible');
            }

            // Mostrar u ocultar el botón derecho
            const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
            if (scroller.scrollLeft < maxScrollLeft - 1) { // -1 para un pequeño margen de error
                scrollRightBtn.classList.add('visible');
            } else {
                scrollRightBtn.classList.remove('visible');
            }
        }

        // Comprobar el estado del scroll al cargar y al desplazarse
        scroller.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll); // Para la carga inicial
        window.addEventListener('resize', checkScroll); // Por si cambia el tamaño de la ventana
    }
});