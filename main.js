// main.js

function showCharacter(event, characterId) {
    event.preventDefault();
    
    // Oculta todas as informações dos personagens
    document.querySelectorAll('.character-info').forEach(info => {
        info.style.display = 'none';
    });
    
    // Oculta todas as informações das casas
    document.querySelectorAll('.house-info').forEach(house => {
        house.style.display = 'none';
    });
    
    // Remove a classe active de todos os links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'bg-success', 'bg-danger', 'bg-warning', 'bg-primary', 'text-white');
        link.classList.add('bg-light', 'text-dark');
    });
    
    // Adiciona as classes apropriadas ao link clicado
    const selectedLink = document.getElementById('link-' + characterId);
    selectedLink.classList.remove('bg-light', 'text-dark');
    selectedLink.classList.add('active', 'text-white');
    
    // Adiciona a cor de fundo específica baseada no personagem
    switch(characterId) {
        case 'natsai':
            selectedLink.classList.add('bg-danger');
            break;
        case 'poppy':
            selectedLink.classList.add('bg-warning');
            break;
        case 'amit':
            selectedLink.classList.add('bg-primary');
            break;
        case 'sebastian':
            selectedLink.classList.add('bg-success');
            break;
    }
    
    // Mostra a informação do personagem selecionado
    document.getElementById(characterId).style.display = 'block';
    
    // Mostra a informação da casa do personagem selecionado
    document.getElementById(characterId + '-house').style.display = 'block';
    
    // Atualiza a imagem do personagem
    const selectedCharacterImage = document.getElementById('selected-character-image');
    selectedCharacterImage.src = `imagens/perfil/${characterId}.png`;
    selectedCharacterImage.style.display = 'block';
}

// Mostrar Sebastian por padrão quando a página carregar
window.addEventListener('DOMContentLoaded', function() {
    showCharacter({ preventDefault: () => {} }, 'sebastian');
});

// Função para lidar com o envio do formulário
function handleSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome === '' || email === '' || telefone === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos.');
        return false; // Impede o envio do formulário
    }

    // Verifica se o telefone contém apenas números
    if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
        alert('O telefone deve estar no formato (00) 0000-0000 ou (00) 00000-0000.');
        return false; // Impede o envio do formulário
    }

    // Se todos os campos estiverem preenchidos, exibe o alerta de sucesso
    alert('Formulário enviado com sucesso!');

    // Limpa o formulário
    document.getElementById('contactForm').reset();

    return true; // Permite o envio do formulário (se necessário)
}

// Adiciona o evento de submit ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleSubmit);

    // Aplica a máscara ao campo de telefone
    $('#telefone').inputmask('(99) 9999-9999[9]', { placeholder: ' ' });
});

document.getElementById('link-sebastian').addEventListener('click', function() {
    var description = document.getElementById('sebastian-description');
    if (description.style.display === 'none') {
        description.style.display = 'block';
    } else {
        description.style.display = 'none';
    }
});

// Função reutilizável para rolagem suave
function smoothScroll(targetId) {
    const targetSection = document.querySelector(targetId);
    const headerHeight = 56;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Adiciona eventos de clique para todos os links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Links de navegação
    const navLinks = {
        '#sobre-jogo': 'link-sobre',
        '#personagens': 'link-personagens',
        '#cadastre-se': 'link-cadastro'
    };

    // Adiciona eventos para links de navegação
    Object.keys(navLinks).forEach(targetId => {
        document.querySelector(`a[href="${targetId}"]`).addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(targetId);
        });
    });

    // Eventos para links dos personagens
    const characterLinks = ['sebastian', 'natsai', 'poppy', 'amit'];
    characterLinks.forEach(character => {
        document.getElementById(`link-${character}`).addEventListener('click', function(e) {
            e.preventDefault();
            showDescription(`${character}-description`);
        });
    });
});

// Função para mostrar descrição dos personagens
function showDescription(activeId) {
    const descriptions = document.querySelectorAll('.school-description');
    descriptions.forEach(description => {
        description.classList.remove('active');
        description.style.display = 'none';
    });
    const activeDescription = document.getElementById(activeId);
    activeDescription.classList.add('active');
    activeDescription.style.display = 'block';
}

