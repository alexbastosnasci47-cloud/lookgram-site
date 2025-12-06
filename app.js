// Lookgram - Sistema Completo de Catálogo de Moda
document.addEventListener('DOMContentLoaded', function() {
    // Estado do aplicativo
    let currentPlan = 'free';
    let looks = [];
    let generatedImageUrl = null;
    
    // Elementos da UI
    const counterElement = document.getElementById('counter');
    const planBadge = document.getElementById('planBadge');
    const looksGrid = document.getElementById('looksGrid');
    const styleInput = document.getElementById('styleInput');
    const colorInput = document.getElementById('colorInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const startBtn = document.getElementById('startBtn');
    
    // Inicializar catálogo com exemplos
    function initializeLooks() {
        const exampleLooks = [
            { id: 1, name: 'Look Casual Elegante', style: 'Casual', colors: ['azul', 'branco', 'bege'], tags: ['casual', 'elegante', 'dia-a-dia'] },
            { id: 2, name: 'Conjunto Esportivo', style: 'Esportivo', colors: ['preto', 'cinza', 'laranja'], tags: ['esportivo', 'confortável', 'academia'] },
            { id: 3, name: 'Vestido de Festa', style: 'Elegante', colors: ['vermelho', 'dourado', 'preto'], tags: ['festa', 'elegante', 'noite'] },
            { id: 4, name: 'Streetwear Urbano', style: 'Streetwear', colors: ['preto', 'branco', 'amarelo'], tags: ['streetwear', 'urbano', 'moderno'] },
            { id: 5, name: 'Look de Trabalho', style: 'Casual', colors: ['cinza', 'azul-marinho', 'branco'], tags: ['trabalho', 'formal', 'profissional'] },
            { id: 6, name: 'Conjunto Praia', style: 'Casual', colors: ['azul-claro', 'branco', 'amarelo'], tags: ['praia', 'verão', 'casual'] },
            { id: 7, name: 'Jaqueta de Couro', style: 'Streetwear', colors: ['preto', 'cinza', 'vermelho'], tags: ['couro', 'streetwear', 'outono'] },
            { id: 8, name: 'Look Romântico', style: 'Elegante', colors: ['rosa', 'branco', 'prata'], tags: ['romântico', 'elegante', 'encontro'] }
        ];
        
        looks = exampleLooks;
        updateCounter();
        renderLooks();
    }
    
    // Atualizar contador
    function updateCounter() {
        counterElement.textContent = looks.length;
        
        // Atualizar badge do plano
        const planNames = {
            'free': 'Plano Free',
            'pro': 'Plano Pro',
            'enterprise': 'Plano Enterprise'
        };
        planBadge.textContent = planNames[currentPlan];
        planBadge.style.background = currentPlan === 'free' ? '#10b981' : 
                                    currentPlan === 'pro' ? '#7c3aed' : '#1f2937';
    }
    
    // Renderizar looks na grade
    function renderLooks() {
        looksGrid.innerHTML = '';
        
        looks.forEach(look => {
            const lookCard = document.createElement('div');
            lookCard.className = 'look-card';
            
            // Gerar ícone baseado no estilo
            const styleIcons = {
                'Casual': '👕',
                'Esportivo': '👟',
                'Elegante': '👗',
                'Streetwear': '🧢'
            };
            
            const icon = styleIcons[look.style] || '👕';
            const color1 = look.colors[0] || 'azul';
            const color2 = look.colors[1] || 'cinza';
            
            lookCard.innerHTML = `
                <div class="look-image" style="background: linear-gradient(135deg, var(--color-${color1}), var(--color-${color2}))">
                    ${icon}
                </div>
                <div class="look-info">
                    <h4>${look.name}</h4>
                    <p>Estilo: ${look.style} | Cores: ${look.colors.join(', ')}</p>
                    <div class="look-tags">
                        ${look.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            looksGrid.appendChild(lookCard);
        });
    }
    
    // Gerar nova imagem/look
    function generateLook() {
        const style = styleInput.value;
        const colors = colorInput.value.split(',').map(c => c.trim()).filter(c => c);
        
        if (colors.length === 0) {
            showNotification('Adicione pelo menos uma cor', 'error');
            return;
        }
        
        showNotification('Gerando look...', 'info');
        
        // Simular geração com delay
        setTimeout(() => {
            const newLook = {
                id: looks.length + 1,
                name: `Look ${style} ${colors[0]}`,
                style: style,
                colors: colors,
                tags: [style.toLowerCase(), colors[0], 'novo']
            };
            
            looks.unshift(newLook);
            
            // Criar imagem simulada
            createMockImage(style, colors);
            
            updateCounter();
            renderLooks();
            
            // Ativar botão de download
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Imagem (PNG)';
            
            showNotification('Look gerado com sucesso!', 'success');
        }, 1500);
    }
    
    // Criar imagem mock (simulação)
    function createMockImage(style, colors) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Fundo gradiente
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, getColorCode(colors[0] || 'azul'));
        gradient.addColorStop(1, getColorCode(colors[1] || 'roxo'));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Texto
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`LOOK: ${style.toUpperCase()}`, canvas.width/2, 100);
        
        ctx.font = '30px Arial';
        ctx.fillText(`Cores: ${colors.join(', ')}`, canvas.width/2, 150);
        
        // Desenhar silhueta de roupa
        drawClothingSilhouette(ctx, style, canvas.width/2, canvas.height/2);
        
        // Logo
        ctx.font = '20px Arial';
        ctx.fillText('Lookgram', canvas.width - 100, canvas.height - 30);
        
        // Converter para URL
        generatedImageUrl = canvas.toDataURL('image/png');
    }
    
    // Desenhar silhueta baseada no estilo
    function drawClothingSilhouette(ctx, style, x, y) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        switch(style.toLowerCase()) {
            case 'casual':
                // Camiseta e calça
                ctx.beginPath();
                ctx.rect(x - 60, y - 80, 120, 100); // torso
                ctx.rect(x - 40, y + 20, 30, 80);   // perna esquerda
                ctx.rect(x + 10, y + 20, 30, 80);   // perna direita
                ctx.fill();
                break;
                
            case 'elegante':
                // Vestido
                ctx.beginPath();
                ctx.moveTo(x, y - 100);
                ctx.lineTo(x - 50, y + 50);
                ctx.lineTo(x + 50, y + 50);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'esportivo':
                // Short e camiseta
                ctx.beginPath();
                ctx.rect(x - 50, y - 60, 100, 80);  // torso
                ctx.rect(x - 30, y + 20, 20, 60);   // perna esquerda
                ctx.rect(x + 10, y + 20, 20, 60);   // perna direita
                ctx.fill();
                break;
                
            default:
                // Silhueta genérica
                ctx.beginPath();
                ctx.arc(x, y, 60, 0, Math.PI * 2);
                ctx.fill();
        }
    }
    
    // Converter nome de cor para código hex
    function getColorCode(colorName) {
        const colorMap = {
            'azul': '#3b82f6',
            'vermelho': '#ef4444',
            'verde': '#10b981',
            'amarelo': '#f59e0b',
            'roxo': '#8b5cf6',
            'rosa': '#ec4899',
            'laranja': '#f97316',
            'preto': '#1f2937',
            'branco': '#f9fafb',
            'cinza': '#6b7280',
            'bege': '#d6d3d1',
            'marrom': '#92400e',
            'azul-marinho': '#1e40af',
            'azul-claro': '#0ea5e9'
        };
        
        return colorMap[colorName.toLowerCase()] || '#8b5cf6';
    }
    
    // Baixar imagem gerada
    function downloadImage() {
        if (!generatedImageUrl) {
            showNotification('Gere um look primeiro', 'error');
            return;
        }
        
        const link = document.createElement('a');
        link.href = generatedImageUrl;
        link.download = `lookgram-${styleInput.value}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Imagem baixada com sucesso!', 'success');
    }
    
    // Sistema de notificação
    function showNotification(message, type) {
        // Remover notificação anterior
        const oldNotification = document.querySelector('.notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Estilos inline
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        // Cores por tipo
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'info': '#3b82f6',
            'warning': '#f59e0b'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        // Botão de fechar
        notification.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Selecionar plano
    function setupPlanSelection() {
        const planButtons = document.querySelectorAll('.plan-btn');
        planButtons.forEach(button => {
            button.addEventListener('click', function() {
                const planCard = this.closest('.plan-card');
                const plan = planCard.dataset.plan;
                currentPlan = plan;
                
                // Atualizar UI
                planButtons.forEach(btn => {
                    btn.textContent = 'Selecionar';
                    btn.style.background = '#7c3aed';
                });
                
                this.textContent = 'Selecionado ✓';
                this.style.background = '#10b981';
                
                updateCounter();
                showNotification(`Plano ${plan.toUpperCase()} ativado!`, 'success');
                
                // Simular upgrade de limites
                if (plan === 'pro' || plan === 'enterprise') {
                    looks = [...looks, ...looks.slice(0, 5)]; // Duplicar alguns looks
                    renderLooks();
                }
            });
        });
    }
    
    // CSS para notificações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        :root {
            --color-azul: #3b82f6;
            --color-vermelho: #ef4444;
            --color-verde: #10b981;
            --color-amarelo: #f59e0b;
            --color-roxo: #8b5cf6;
            --color-rosa: #ec4899;
            --color-laranja: #f97316;
            --color-preto: #1f2937;
            --color-branco: #f9fafb;
            --color-cinza: #6b7280;
            --color-bege: #d6d3d1;
            --color-marrom: #92400e;
            --color-azul-marinho: #1e40af;
            --color-azul-claro: #0ea5e9;
        }
    `;
    document.head.appendChild(style);
    
    // Event Listeners
    generateBtn.addEventListener('click', generateLook);
    downloadBtn.addEventListener('click', downloadImage);
    startBtn.addEventListener('click', () => {
        document.getElementById('generate').scrollIntoView({ behavior: 'smooth' });
        showNotification('Vamos criar seu primeiro look!', 'info');
    });
    
    // Inicializar
    initializeLooks();
    setupPlanSelection();
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        showNotification('Bem-vindo ao Lookgram! 🎉', 'info');
    }, 1000);
});
