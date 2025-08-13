document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DE LA PÁGINA DE CONFIGURACIÓN ---

    // Selección de elementos del DOM para las modales
    const modalOverlay = document.getElementById('modal-overlay');
    const allModals = document.querySelectorAll('.modal');
    const allCloseButtons = document.querySelectorAll('.modal-close, .modal-action-btn');

    // Selección de los enlaces que abren las modales
    const cookiesLink = document.getElementById('control-cookies-link');
    const planLink = document.getElementById('cambiar-plan-link');
    const paymentLink = document.getElementById('actualizar-pago-link');

    // Función genérica para abrir una modal específica
    function openModal(modalId) {
        // Primero, ocultar todas las modales
        allModals.forEach(modal => modal.classList.remove('active'));
        // Luego, mostrar la modal correcta y el overlay
        const modalToShow = document.getElementById(modalId);
        if (modalToShow) {
            modalOverlay.classList.add('active');
            modalToShow.classList.add('active');
        }
    }

    // Función para cerrar todas las modales
    function closeModal() {
        modalOverlay.classList.remove('active');
        allModals.forEach(modal => modal.classList.remove('active'));
    }

    // Asignar eventos a los enlaces
    cookiesLink.addEventListener('click', (e) => { e.preventDefault(); openModal('modal-cookies'); });
    planLink.addEventListener('click', (e) => { e.preventDefault(); openModal('modal-plan'); });
    paymentLink.addEventListener('click', (e) => { e.preventDefault(); openModal('modal-payment'); });

    // Asignar evento de cierre a todos los botones de cerrar y de acción
    allCloseButtons.forEach(button => button.addEventListener('click', closeModal));
    
    // Cerrar al hacer clic fuera de la modal
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });


    // --- Lógica específica para la selección de planes ---
    const planOptions = document.querySelectorAll('.plan-option');
    
    planOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Quitar la clase 'selected' de todos los planes
            planOptions.forEach(p => p.classList.remove('selected'));
            // Añadir la clase 'selected' solo al plan clickeado
            option.classList.add('selected');
        });
    });
});