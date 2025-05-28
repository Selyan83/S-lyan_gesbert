document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initMobileMenu();
    initContactForm();
    initCalculator();
    initQuiz();
    initMap();
    initSmoothScroll();
});

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (slides.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    const updateSlides = () => {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.style.display = 'block';
                slide.classList.add('active');
            } else {
                slide.style.display = 'none';
                slide.classList.remove('active');
            }
        });
    };
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    });
    
    updateSlides();
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 1024) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };
        
        let isValid = true;
        
        if (!fields.name.value || fields.name.value.length < 2) {
            document.getElementById('name-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('name-error').classList.add('hidden');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fields.email.value)) {
            document.getElementById('email-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('email-error').classList.add('hidden');
        }
        
        if (!fields.subject.value) {
            document.getElementById('subject-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('subject-error').classList.add('hidden');
        }
        
        if (!fields.message.value || fields.message.value.length < 10) {
            document.getElementById('message-error').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('message-error').classList.add('hidden');
        }
        
        if (isValid) {
            document.getElementById('form-success').classList.remove('hidden');
            contactForm.reset();
            
            setTimeout(() => {
                document.getElementById('form-success').classList.add('hidden');
            }, 3000);
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initCalculator() {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-btn');
    if (!display || !buttons.length) return;
    
    let currentValue = '';
    let operation = null;
    let previousValue = null;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            switch(value) {
                case 'clear':
                    currentValue = '';
                    operation = null;
                    previousValue = null;
                    display.value = '0';
                    break;
                    
                case 'backspace':
                    currentValue = currentValue.slice(0, -1);
                    display.value = currentValue || '0';
                    break;
                    
                case '+': case '-': case '*': case '/': case '%':
                    if (currentValue) {
                        if (previousValue !== null) {
                            currentValue = calculate(previousValue, currentValue, operation);
                            display.value = currentValue;
                        }
                        previousValue = currentValue;
                        operation = value;
                        currentValue = '';
                    }
                    break;
                    
                case '=':
                    if (previousValue !== null && operation && currentValue) {
                        currentValue = calculate(previousValue, currentValue, operation);
                        display.value = currentValue;
                        previousValue = null;
                        operation = null;
                    }
                    break;
                    
                case '.':
                    if (!currentValue.includes('.')) {
                        currentValue = currentValue + value;
                        display.value = currentValue;
                    }
                    break;
                    
                default:
                    currentValue = currentValue + value;
                    display.value = currentValue;
            }
        });
    });
    
    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch(op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return b !== 0 ? (a / b).toString() : 'Error';
            case '%': return (a % b).toString();
            default: return b.toString();
        }
    }
}

function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const checkButton = document.getElementById('check-answers');
    const hackButton = document.getElementById('hack-button');
    const quizResult = document.getElementById('quiz-result');
    const contactSection = document.getElementById('contact');
    const quizSection = document.getElementById('quiz-contact'); 

    if (!quizContainer || !checkButton) return;
    
    // Hide contact section initially
    if (contactSection) {
        contactSection.classList.add('hidden');
        contactSection.style.display = 'none';
        contactSection.setAttribute('aria-hidden', 'true');
    }
    
    let userResponses = [];
    
    if (typeof window.questionnaire === 'undefined') {
        quizContainer.innerHTML = `<div class="alert alert-error">Erreur lors du chargement du questionnaire.</div>`;
        return;
    }
    
    window.questionnaire.forEach((q, index) => {
        quizContainer.innerHTML += `
            <div class="question-block" data-qid="${q.qId}">
               <h3 class="text-lg font-bold mb-4">Question ${index + 1}: ${q.qLabel}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${q.reponses.map(r => `
                        <button class="response-btn btn btn-outline" 
                                data-qid="${q.qId}" 
                                data-rid="${r.rid}">
                            ${r.rlabel}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    document.querySelectorAll('.response-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const qid = this.getAttribute('data-qid');
            const rid = this.getAttribute('data-rid');
            
            document.querySelectorAll(`.response-btn[data-qid="${qid}"]`).forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline');
            });
            
            this.classList.remove('btn-outline');
            this.classList.add('btn-primary');
            
            const existingIndex = userResponses.findIndex(r => r.qid === qid);
            if (existingIndex !== -1) {
                userResponses[existingIndex].rid = rid;
            } else {
                userResponses.push({ qid, rid });
            }
        });
    });
    
    checkButton.addEventListener('click', function() {
        if (userResponses.length < window.questionnaire.length) {
            quizResult.innerHTML = `<div class="alert alert-warning">Veuillez répondre à toutes les questions avant de continuer.</div>`;
            quizResult.classList.remove('hidden');
            return;
        }

        const allCorrect = userResponses.every(response => {
            const question = window.questionnaire.find(q => q.qId.toString() === response.qid.toString());
            return question && question.bonneReponse.toString() === response.rid.toString();
        });

        if (allCorrect) {
            // Show success message and redirect
            quizResult.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-trophy"></i>
                    <div>
                        <h3 class="font-bold">Parfait ! Toutes vos réponses sont correctes.</h3>
                        <div class="text-sm opacity-90">Redirection vers la page de contact...</div>
                    </div>
                </div>
            `;
            quizResult.classList.remove('hidden');
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "A1_3_A2_2_A3_3.html";
            }, 2000);
        } else {
            quizResult.innerHTML = `<div class="alert alert-error">Certaines de vos réponses sont incorrectes. Essayez à nouveau!</div>`;
            quizResult.classList.remove('hidden');
        }
    });
    
    if (hackButton) {
        let clickTimeout = null;
        
        hackButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (clickTimeout) clearTimeout(clickTimeout);
            
            clickTimeout = setTimeout(function() {
                window.location.href = "A1_3_A2_2_A3_3.html";
                clickTimeout = null;
            }, 300);
        });
        
        hackButton.addEventListener('dblclick', function(e) {
            e.preventDefault();
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
            }
            bruteForceQuiz();
        });
    }
    
    function bruteForceQuiz() {
        quizResult.innerHTML = `<div class="alert alert-info"><span>Tentative de brute force en cours...</span></div>`;
        quizResult.classList.remove('hidden');
        
        setTimeout(() => {
            quizResult.innerHTML = `
                <div class="alert alert-success mb-4">
                   <span>Hack réussi ! Redirection...</span>
                </div>
                <button id="redirect-btn" class="btn btn-primary">
                    Continuer vers la page suivante
                </button>
            `;
            
            document.getElementById('redirect-btn').addEventListener('click', function() {
                window.location.href = "A1_3_A2_2_A3_3.html";
            });
            
            setTimeout(() => {
                window.location.href = "A1_3_A2_2_A3_3.html";
            }, 2000);
        }, 1000);
    }
}

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || !window.L) return;
    
    const map = L.map('map').setView([46.603354, 1.888334], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);
    
    const favoriteTrails = [
        {
            name: "Bois de L'Huisserie",
            location: [48.0373467, -0.7829785],
            description: "Mon terrain d'entraînement préféré avec des descentes techniques et la fameuse côte de Pierre.",
            difficulty: "Difficile",
            distance: "12 km",
            icon: "🚵"
        },
        {
            name: "Ancien terrain de BMX",
            location: [48.0835596, -0.642135],
            description: "Parfait pour travailler ma technique et mon explosivité. Un retour aux sources!",
            difficulty: "Modéré",
            distance: "0.5 km",
            icon: "🏁"
        },
        {
            name: "Parcours championnat régional XCE 2024",
            location: [48.342771, -0.063022],
            description: "Le parcours de ma première victoire en championnat régional XCE.",
            difficulty: "Très difficile",
            distance: "0.7 km",
            icon: "🏆"
        },
        {
            name: "Coupe de France - Marseille",
            location: [43.296482, 5.369780],
            description: "Parcours de la manche de Coupe de France à Marseille. Un souvenir mitigé mais formateur.",
            difficulty: "Expert",
            distance: "0.8 km",
            icon: "🔥"
        },
        {
            name: "Championnat de France - Levens",
            location: [43.8477377, 7.2401105],
            description: "C'était le parcours exigeant de la manche du Championnat de France à Levens. Ce jour-là, j'avais des sensations incroyables, mais il m'a manqué la lucidité tactique pour vraiment en tirer profit.",
            difficulty: "Expert",
            distance: "0.7 km",
            icon: "🔥"
        }
    ];
    
    const markers = favoriteTrails.map(trail => {
        const marker = L.marker(trail.location, {
            icon: L.divIcon({
                html: `<div class="text-2xl">${trail.icon}</div>`,
                className: 'custom-map-icon',
                iconSize: [30, 30]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="trail-popup">
                <h3 class="font-bold">${trail.name}</h3>
                <p>${trail.description}</p>
                <div class="trail-details mt-2">
                    <p><strong>Difficulté:</strong> ${trail.difficulty}</p>
                    <p><strong>Distance:</strong> ${trail.distance}</p>
                </div>
            </div>
        `);
        
        return marker;
    });
    
    const bounds = L.featureGroup(markers).getBounds();
    map.fitBounds(bounds, { padding: [50, 50] });
}
