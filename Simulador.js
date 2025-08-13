document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }
    function checkViewport() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        }
    }
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // --- LÓGICA DEL SIMULADOR ---
    const componentItems = document.querySelectorAll('.component-item');
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const summaryList = document.getElementById('summary-list');
    
    // Base de datos de ejemplo de componentes
    const componentData = {
        procesador: ["Intel Core i9-13900K", "AMD Ryzen 9 7950X", "Intel Core i5-13600K"],
        ram: ["Corsair Vengeance 32GB DDR5", "G.Skill Ripjaws 16GB DDR5", "Kingston Fury 64GB DDR4"],
        tarjeta_grafica: ["NVIDIA GeForce RTX 4090", "AMD Radeon RX 7900 XTX", "NVIDIA GeForce RTX 4070 Ti"],
        m_board: ["ASUS ROG Maximus Z790", "MSI MPG B650 Carbon", "Gigabyte Z790 Aorus Elite"],
        almacenamiento: ["Samsung 980 Pro 2TB NVMe", "Crucial P5 Plus 1TB NVMe", "Seagate Barracuda 4TB HDD"],
        gabinete: ["Lian Li O11 Dynamic", "Fractal Design Meshify C", "NZXT H5 Flow"],
        refrigeracion: ["Noctua NH-D15 aircooler", "Corsair H150i Elite Capellix AIO", "be quiet! Dark Rock Pro 4"],
        fuente: ["SeaSonic PRIME 1000W Gold", "Corsair RM850x 850W Gold", "EVGA SuperNOVA 750W G6"]
    };

    // Almacena la build actual
    let currentBuild = {};
    let currentComponentType = null;

    // Abrir la modal al hacer clic en un componente
    componentItems.forEach(item => {
        item.addEventListener('click', () => {
            currentComponentType = item.dataset.component;
            const componentName = currentComponentType.replace('_', ' ');
            modalTitle.textContent = `Seleccionar ${componentName}`;
            
            populateModal(currentComponentType);
            modalOverlay.classList.add('active');
        });
    });

    // Rellenar la modal con las opciones correctas
    function populateModal(type) {
        modalBody.innerHTML = ''; // Limpiar opciones anteriores
        const options = componentData[type];
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'component-option';
            button.textContent = option;
            button.addEventListener('click', () => selectComponent(type, option));
            modalBody.appendChild(button);
        });
    }

    // Seleccionar un componente y cerrar la modal
    function selectComponent(type, name) {
        currentBuild[type] = name;
        updateSummary();
        closeModal();
        
        // Marcar el ícono como seleccionado
        document.querySelector(`.component-item[data-component="${type}"]`).classList.add('selected');
    }

    // Actualizar la lista de resumen de la build
    function updateSummary() {
        summaryList.innerHTML = ''; // Limpiar lista
        if (Object.keys(currentBuild).length === 0) {
            summaryList.innerHTML = '<li class="placeholder">Selecciona un componente para empezar.</li>';
            return;
        }

        for (const type in currentBuild) {
            const li = document.createElement('li');
            const typeName = type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            li.innerHTML = `<strong>${typeName}:</strong> ${currentBuild[type]}`;
            summaryList.appendChild(li);
        }
    }

    // Cerrar la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

});