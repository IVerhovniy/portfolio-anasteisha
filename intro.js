(function() {
    const main = document.querySelector('main');
    if (main) main.classList.add('is-visible');

    const heroBlock = document.querySelector(".hero-content, .project-hero");
    
    if (heroBlock && typeof gsap !== 'undefined') {
        const animatedElements = heroBlock.querySelectorAll(".text-h1, .text-p");
        gsap.fromTo(animatedElements, 
            { y: '110%', opacity: 0 },
            { 
                y: '0%', 
                opacity: 1, 
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.2
            }
        );
        
        const heroTag = heroBlock.querySelector('.project-hero__tag');
        if (heroTag) {
            gsap.fromTo(heroTag, 
                { opacity: 0, scale: 0.95, rotateX: -10 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0, 
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );
        }
        
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            gsap.fromTo(profileCard, 
                { opacity: 0, scale: 0.95, rotateX: -10 },
                { opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: 0.1}
            );
        }
    }
})();