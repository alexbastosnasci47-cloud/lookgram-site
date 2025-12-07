// app.js - Lookgram
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const looksGrid = document.getElementById('looksGrid');
    const styleInput = document.getElementById('styleInput');
    const colorInput = document.getElementById('colorInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const startBtn = document.getElementById('startBtn');
    const counter = document.getElementById('counter');
    const planBadge = document.getElementById('planBadge');
    
    // Looks iniciais
    const initialLooks = [
        { style: 'Casual', color: 'Azul e Branco', icon: '👕' },
        { style: 'Esportivo', color: 'Preto e Cinza', icon: '👟' },
        { style: 'Elegante', color: 'Preto', icon: '🎩' },
        { style: 'Streetwear', color: 'Colorido', icon: '🕶️' },
        { style: 'Casual', color: 'Verde Militar', icon: '🧥' },
        { style: 'Esportivo', color: 'Azul Royal', icon: '🩳' }
    ];
    
    // Gerar cards de looks
    function renderLooks(looks) {
        looksGrid.innerHTML = '';
        looks.forEach(look => {
            const card = document.createElement('div');
            card.className = 'look-card';
            card.innerHTML = `
                <div style="font-size: 3rem;">${look.icon}</div>
                <h3>${look.style}</h3>
                <p>Cores: ${look.color}</p>
                <small>Clique para editar</small>
            `;
            looksGrid.appendChild(card);
        });
        counter.textContent = looks.length;
    }
    
    // Gerar novo look
    function generateLook() {
        const style = styleInput.value;
        const colors = colorInput.value || 'aleatório';
        
        const icons = ['👕', '👖', '🧥', '👟', '🕶️', '🎒', '🧢', '👔'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        const newLook = {
            style: style,
            color: colors,
            icon: randomIcon
        };
        
        initialLooks.unshift(newLook); // Adiciona no início
        renderLooks(initialLooks);
        
        // Ativar botão de download
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Imagem (Novo!)';
        
        // Feedback
        alert(`✅ Look "${style}" gerado com cores: ${colors}`);
    }
    
    // Botão "Começar Agora"
    startBtn.addEventListener('click', function() {
        document.getElementById('generate').scrollIntoView({ behavior: 'smooth' });
        styleInput.focus();
    });
    
    // Botão "Gerar Look"
    generateBtn.addEventListener('click', generateLook);
    
    // Botão de download (simulado)
    downloadBtn.addEventListener('click', function() {
        if (!downloadBtn.disabled) {
            alert('📥 Download iniciado! (Simulação)');
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Baixado!';
            downloadBtn.disabled = true;
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Imagem';
                downloadBtn.disabled = false;
            }, 3000);
        }
    });
    
    // Seleção de planos
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.closest('.plan-card').dataset.plan;
            let planName = '';
            let maxLooks = 0;
            
            if (plan === 'free') {
                planName = 'Free';
                maxLooks = 10;
            } else if (plan === 'pro') {
                planName = 'Pro';
                maxLooks = 100;
            } else {
                planName = 'Enterprise';
                maxLooks = 999;
            }
            
            planBadge.textContent = `Plano ${planName}`;
            planBadge.style.background = plan === 'pro' ? '#6d28d9' : 
                                         plan === 'enterprise' ? '#1f2937' : '#10b981';
            
            alert(`✅ Plano ${planName} ativado! Até ${maxLooks} looks/mês.`);
        });
    });
    
    // Enter no campo de cores gera look
    colorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateLook();
    });
    
    // Inicialização
    renderLooks(initialLooks);
    
    console.log('Lookgram carregado! 👗');
});
