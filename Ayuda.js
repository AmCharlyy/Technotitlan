document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DEL ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        questionButton.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');

            // Si hay un elemento activo y no es el que acabamos de clickear, lo cerramos.
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }

            // Abrimos o cerramos el elemento clickeado.
            item.classList.toggle('active');
        });
    });

});