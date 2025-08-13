document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SIDEBAR (Sin cambios) ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }

    // --- LÓGICA DE LA PÁGINA DE CREAR CUENTA ---

    // Selección de elementos del DOM
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submit-btn');
    const termsLink = document.getElementById('terms-link');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBodyTerms = document.getElementById('modal-body-terms');

    // --- Lógica para validar el formulario y habilitar/deshabilitar el botón ---
    const formInputs = [nameInput, emailInput, passwordInput, termsCheckbox];

    function validateForm() {
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && emailInput.checkValidity(); // Usa validación nativa de email
        const isPasswordValid = passwordInput.value.trim() !== '';
        const areTermsAccepted = termsCheckbox.checked;

        if (isNameValid && isEmailValid && isPasswordValid && areTermsAccepted) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Añadir escuchadores a cada campo para validar en tiempo real
    formInputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('change', validateForm); // Para el checkbox
    });


    // --- Lógica para la ventana modal de Términos y Condiciones ---
    const termsAndConditionsText = `
        <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        <p>Bienvenido a MIEmpresaGenial.com. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web y servicios.</p>
        <p><strong>1. Aceptación de los Términos:</strong> Al acceder y utilizar este servicio, usted acepta y está de acuerdo con estar sujeto a los términos y provisiones de este acuerdo. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.</p>
        <p><strong>2. Cuentas de Usuario:</strong> Cuando crea una cuenta con nosotros, debe proporcionarnos información que sea precisa, completa y actual en todo momento. El no hacerlo constituye una violación de los términos, lo que puede resultar en la terminación inmediata de su cuenta en nuestro servicio.</p>
        <p><strong>3. Propiedad Intelectual:</strong> El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de MIEmpresaGenial.com y sus licenciantes. El servicio está protegido por derechos de autor, marcas registradas y otras leyes tanto de España como de países extranjeros.</p>
        <p><strong>4. Limitación de Responsabilidad:</strong> En ningún caso MIEmpresaGenial.com, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.</p>
        <p><strong>5. Cambios en los Términos:</strong> Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que los nuevos términos entren en vigor.</p>
    `;

    termsLink.addEventListener('click', () => {
        modalBodyTerms.innerHTML = termsAndConditionsText;
        modalOverlay.classList.add('active');
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });


    // --- Lógica para el envío del formulario ---
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío real del formulario

        // Verificar por si acaso el botón se habilitó de otra forma
        if (submitBtn.disabled) return;
        
        // Crear y mostrar la notificación de éxito
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = '¡Cuenta creada con éxito! Redirigiendo...';
        document.body.appendChild(toast);

        // Forzar un reflow para que la transición de entrada funcione
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Redirigir después de un par de segundos
        setTimeout(() => {
            // Opcional: Ocultar el toast antes de redirigir
            toast.classList.remove('show');
            setTimeout(() => {
                 // **IMPORTANTE**: Cambia 'pagina-principal.html' por el nombre de tu archivo de página de inicio si es diferente
                window.location.href = 'index.html';
            }, 300); // Dar tiempo para que la animación de salida termine
        }, 2500); // 2.5 segundos de espera
    });

});