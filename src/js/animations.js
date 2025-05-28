document.addEventListener('DOMContentLoaded', function() {
    
    initBasicScrollAnimations();
    initSimpleHoverEffects();
    initBasicModalViewer();
});

function initBasicScrollAnimations() {
    
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

function initSimpleHoverEffects() {
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
   
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.transition = 'all 0.2s ease';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initBasicModalViewer() {
    
    const images = document.querySelectorAll('.card img');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.3s ease';
        
        img.addEventListener('click', function() {
           
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const imgClone = this.cloneNode();
            imgClone.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            modal.appendChild(imgClone);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
