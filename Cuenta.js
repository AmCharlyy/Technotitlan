document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DE LA PÁGINA DE CUENTA ---

    // Selección de elementos del DOM para la modal de amigos
    const addFriendLink = document.getElementById('add-friend-link');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const generateCodeBtn = document.getElementById('generate-code-btn');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const friendCodeSpan = document.getElementById('my-friend-code');

    // Función para generar un código alfanumérico aleatorio
    function generateFriendCode(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Evento para abrir la modal
    if (addFriendLink) {
        addFriendLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            // Generar un código inicial si no hay uno
            if (friendCodeSpan.textContent === '------') {
                friendCodeSpan.textContent = generateFriendCode();
            }
        });
    }

    // Función para cerrar la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Evento para generar un nuevo código
    if (generateCodeBtn) {
        generateCodeBtn.addEventListener('click', () => {
            friendCodeSpan.textContent = generateFriendCode();
            // Restablecer el botón de copiar
            copyCodeBtn.innerHTML = '<i class="far fa-copy"></i>';
        });
    }

    // Evento para copiar el código al portapapeles
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeToCopy = friendCodeSpan.textContent;
            if (codeToCopy && codeToCopy !== '------') {
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    // Feedback visual al usuario
                    copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyCodeBtn.innerHTML = '<i class="far fa-copy"></i>';
                    }, 2000); // Restablecer el ícono después de 2 segundos
                }).catch(err => {
                    console.error('Error al copiar el código: ', err);
                    alert('No se pudo copiar el código.');
                });
            }
        });
    }
});