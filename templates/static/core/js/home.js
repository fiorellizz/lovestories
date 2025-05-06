// script.js

// Exemplo de funcionalidade interativa (pode ser expandido conforme necessário)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Love Stories site carregado e pronto!');

    // Exemplo: Suavizar a rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Adicionar um pouco de interatividade aos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            // Poderia adicionar uma animação ou efeito aqui
        });
        button.addEventListener('mouseout', () => {
            // Resetar o efeito
        });
    });
});
