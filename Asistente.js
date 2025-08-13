document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos los elementos del DOM que necesitamos
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const mainContent = document.getElementById('main-content');

    // Función para conmutar el estado del panel lateral
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
    }

    // Añadimos el "escuchador" de evento al botón
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    // Función para comprobar el tamaño de la pantalla y colapsar el menú si es necesario
    function checkViewport() {
        if (window.innerWidth <= 768) {
            // En pantallas pequeñas, el menú siempre empieza colapsado
            sidebar.classList.add('collapsed');
        }
    }
    
    // Comprobar el tamaño de la pantalla al cargar la página
    checkViewport();

    // Opcional: Comprobar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkViewport);

});