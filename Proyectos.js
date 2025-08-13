document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DE LA PÁGINA DE PROYECTOS ---
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const emptyState = document.getElementById('empty-state');
    
    // 1. Inicializar las barras de progreso
    projectCards.forEach(card => {
        const progress = card.dataset.progress;
        const progressBarFill = card.querySelector('.progress-bar-fill');
        if (progressBarFill) {
            progressBarFill.style.width = `${progress}%`;
        }
    });

    // 2. Lógica de filtrado
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar clase activa en botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            let visibleProjects = 0;

            // Filtrar tarjetas
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.status === filter) {
                    card.style.display = 'flex';
                    visibleProjects++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Mostrar estado vacío si no hay proyectos visibles
            if (visibleProjects === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        });
    });

    // 3. Lógica de la modal de certificado
    const modalOverlay = document.getElementById('modal-overlay');
    const certificateModal = document.getElementById('certificate-modal');
    const modalCloseBtn = certificateModal.querySelector('.modal-close');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const courseNameSpan = document.getElementById('course-name-modal');

    document.querySelectorAll('.certificate-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const courseTitle = card.querySelector('.project-title').textContent;
            
            courseNameSpan.textContent = courseTitle;
            modalOverlay.style.display = 'flex';
        });
    });

    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    downloadPdfBtn.addEventListener('click', () => {
        alert(`Simulando descarga del certificado para: ${courseNameSpan.textContent}`);
        closeModal();
    });
});