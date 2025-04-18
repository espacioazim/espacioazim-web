document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init("ieTqO66ve8xuxywmu");

    // Optimización de imágenes lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('lazyload');
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => imageObserver.observe(img));

    // Manejar el menú hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Manejar el botón de volver arriba
    const backToTop = document.querySelector('.back-to-top');
    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    };

    // Throttle para el scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
    });

    // Manejar el scroll suave para los enlaces de navegación
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cerrar el menú si está abierto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Añadir clase active al enlace actual
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.scroll-section');
        const navLinks = document.querySelectorAll('.scroll-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (scrollY >= sectionTop - headerHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Manejar el envío del formulario
    const contactForm = document.getElementById('contact-form');
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-content"></div>';
    document.body.appendChild(loader);

    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <h3>¡Mensaje enviado!</h3>
            <p>Nos pondremos en contacto contigo a la brevedad.</p>
            <button onclick="closeSuccessModal()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(successModal);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Mostrar loader
        loader.classList.add('active');

        // Obtener los valores directamente
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Verificar si los campos están vacíos
        if (!nombre || !email || !mensaje) {
            alert('Por favor, complete todos los campos requeridos.');
            loader.classList.remove('active');
            return;
        }

        // Preparar los datos para EmailJS
        const templateParams = {
            "user_name": nombre,
            "user_email": email,
            "phone": telefono,
            "message_html": mensaje,
            "time": new Date().toLocaleString()
        };

        // Enviar el email usando EmailJS
        emailjs.send(
            'service_py0xmps',
            'template_bsjol4w',
            templateParams
        ).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Mostrar modal de éxito
            loader.classList.remove('active');
            successModal.classList.add('active');
            
            // Limpiar el formulario
            contactForm.reset();

            // Cerrar el modal después de 3 segundos
            setTimeout(() => {
                successModal.classList.remove('active');
            }, 3000);
        }, function(error) {
            console.error('FAILED...', error);
            alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            loader.classList.remove('active');
        });
    });

    // Función para cerrar el modal de éxito
    function closeSuccessModal() {
        successModal.classList.remove('active');
    }

    // Función para mostrar el modal emergente
    function showModal() {
        const modal = document.getElementById("announcementModal");
        modal.style.display = "block";
    }

    // Función para cerrar el modal
    function closeModal() {
        const modal = document.getElementById("announcementModal");
        modal.style.display = "none";
    }

    // Event listener para el botón de cerrar
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Event listener para el enlace de reserva
    const reserveLink = document.querySelector(".reserve-link");
    if (reserveLink) {
        reserveLink.onclick = function() {
            closeModal();
        };
    }

    // Event listener para cerrar el modal al hacer clic fuera
    window.onclick = function(event) {
        const modal = document.getElementById("announcementModal");
        if (event.target == modal) {
            closeModal();
        }
    }

    // Mostrar el modal cuando la página cargue
    window.onload = function() {
        showModal();
    };

    // Función para iniciar la animación de la barra de progreso
    function initProgressAnimation() {
        // No se utiliza en este código
    }
});
