document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DEL CENTRO DE HERRAMIENTAS ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const launchButtons = document.querySelectorAll('.launch-tool-btn');

    // Función para cerrar la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });

    // Event listener para todos los botones de "Lanzar"
    launchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolId = button.dataset.tool;
            launchTool(toolId);
        });
    });

    // Función principal para lanzar la herramienta en la modal
    function launchTool(toolId) {
        modalBody.innerHTML = ''; // Limpiar contenido anterior
        
        switch (toolId) {
            case 'ohm-calculator':
                modalTitle.textContent = 'Calculadora Ley de Ohm';
                modalBody.innerHTML = getOhmCalculatorHTML();
                addOhmCalculatorListeners();
                break;
            case 'password-generator':
                modalTitle.textContent = 'Generador de Contraseñas';
                modalBody.innerHTML = getPasswordGeneratorHTML();
                addPasswordGeneratorListeners();
                break;
            // Añadir más casos para otras herramientas aquí
            default:
                modalTitle.textContent = 'Herramienta no disponible';
                modalBody.innerHTML = '<p>Esta herramienta se encuentra en desarrollo.</p>';
        }

        modalOverlay.classList.add('active');
    }

    // --- IMPLEMENTACIÓN DE HERRAMIENTAS ESPECÍFICAS ---

    // 1. Calculadora Ley de Ohm
    function getOhmCalculatorHTML() {
        return `
            <form class="ohm-calculator-form" id="ohm-form">
                <div class="input-group">
                    <label for="voltage">Voltaje (V):</label>
                    <input type="number" id="voltage" placeholder="Ej: 12">
                </div>
                <div class="input-group">
                    <label for="current">Corriente (A):</label>
                    <input type="number" id="current" placeholder="Ej: 0.5">
                </div>
                <div class="input-group">
                    <label for="resistance">Resistencia (Ω):</label>
                    <input type="number" id="resistance" placeholder="Ej: 24">
                </div>
                <p id="ohm-result">Introduce dos valores para calcular el tercero.</p>
            </form>
        `;
    }

    function addOhmCalculatorListeners() {
        const form = document.getElementById('ohm-form');
        form.addEventListener('input', () => {
            const V = parseFloat(document.getElementById('voltage').value);
            const I = parseFloat(document.getElementById('current').value);
            const R = parseFloat(document.getElementById('resistance').value);
            const resultEl = document.getElementById('ohm-result');

            if (!isNaN(V) && !isNaN(I)) {
                resultEl.textContent = `Resistencia calculada: ${(V / I).toFixed(2)} Ω`;
            } else if (!isNaN(V) && !isNaN(R)) {
                resultEl.textContent = `Corriente calculada: ${(V / R).toFixed(2)} A`;
            } else if (!isNaN(I) && !isNaN(R)) {
                resultEl.textContent = `Voltaje calculado: ${(I * R).toFixed(2)} V`;
            } else {
                 resultEl.textContent = 'Introduce dos valores para calcular el tercero.';
            }
        });
    }

    // 2. Generador de Contraseñas
    function getPasswordGeneratorHTML() {
        return `
            <div class="password-generator">
                <div class="result-container">
                    <span id="password-output">P4S$w0rd!</span>
                    <button id="copy-password-btn" title="Copiar"><i class="far fa-copy"></i></button>
                </div>
                <div class="options-container">
                    <div class="option">
                        <label>Longitud:</label>
                        <input type="range" id="length" min="8" max="32" value="16">
                        <span id="length-val">16</span>
                    </div>
                    <div class="option"><label>Mayúsculas (A-Z)</label><input type="checkbox" id="uppercase" checked></div>
                    <div class="option"><label>Minúsculas (a-z)</label><input type="checkbox" id="lowercase" checked></div>
                    <div class="option"><label>Números (0-9)</label><input type="checkbox" id="numbers" checked></div>
                    <div class="option"><label>Símbolos (!@#)</label><input type="checkbox" id="symbols" checked></div>
                </div>
            </div>
        `;
    }
    
    function addPasswordGeneratorListeners() {
        const lengthSlider = document.getElementById('length');
        const lengthVal = document.getElementById('length-val');
        const options = document.querySelectorAll('.password-generator input[type="checkbox"]');
        const output = document.getElementById('password-output');
        const copyBtn = document.getElementById('copy-password-btn');

        const generatePassword = () => {
            const length = lengthSlider.value;
            let charset = '';
            let password = '';
            if(document.getElementById('uppercase').checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if(document.getElementById('lowercase').checked) charset += 'abcdefghijklmnopqrstuvwxyz';
            if(document.getElementById('numbers').checked) charset += '0123456789';
            if(document.getElementById('symbols').checked) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            
            if (charset === '') {
                output.textContent = 'Selecciona una opción';
                return;
            }

            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            output.textContent = password;
        };

        lengthSlider.addEventListener('input', (e) => {
            lengthVal.textContent = e.target.value;
            generatePassword();
        });

        options.forEach(option => option.addEventListener('change', generatePassword));

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(output.textContent).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => { copyBtn.innerHTML = '<i class="far fa-copy"></i>'; }, 2000);
            });
        });

        generatePassword(); // Generar una al inicio
    }
});