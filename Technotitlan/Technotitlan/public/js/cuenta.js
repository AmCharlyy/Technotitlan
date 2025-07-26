document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mainContent = document.getElementById('main-content');

    // Función para abrir la barra lateral en móvil
    function openSidebar() {
        sidebar.classList.add('open');
    }

    // Función para cerrar la barra lateral en móvil
    function closeSidebar() {
        sidebar.classList.remove('open');
    }

    // Añadir eventos a los botones
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    // Opcional: Cerrar la barra lateral al hacer clic fuera de ella
    if (mainContent) {
        mainContent.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }
});