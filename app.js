// Lookgram MVP Logic - DOWNLOAD REAL IMPLEMENTADO
let currentPlan = 'free';
let looks = Array.from({length: 10}, (_, i) => 'Look ' + (i + 1));
document.getElementById('counter').textContent = looks.length;

// Função que gera uma imagem real e inicia o download
function generateAndDownload() {
  showStatus('Gerando imagem...', 'blue');
  
  // Cria canvas para gerar imagem
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  
  // Fundo gradiente
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Texto principal
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('LOOKGRAM', canvas.width/2, 400);
  
  // Subtítulo
  ctx.font = '40px Arial';
  ctx.fillText('Look Gerado por IA', canvas.width/2, 500);
  ctx.fillText(new Date().toLocaleString(), canvas.width/2, 580);
  
  // Modelo simulado (manequim)
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(canvas.width/2 - 200, 800, 400, 800);
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.fillText('MODELO', canvas.width/2, 1200);
  
  // Adiciona "marca d'água"
  ctx.globalAlpha = 0.5;
  ctx.font = '20px Arial';
  ctx.fillText('Plano: ' + currentPlan.toUpperCase(), 50, 1870);
  ctx.globalAlpha = 1;
  
  // Converte para blob e faz download
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'look-lookgram-' + Date.now() + '.png';
    
    // Para mobile: adiciona ao DOM antes de clicar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Libera memória
    URL.revokeObjectURL(url);
    
    showStatus('✅ Download iniciado! Verifique sua galeria.', 'green');
    
    // Feedback visual
    setTimeout(() => {
      showStatus('', 'black');
    }, 3000);
    
  }, 'image/png', 0.95);
}

// Função para download de todos (placeholder)
function downloadAll() {
  if (looks.length === 0) {
    alert('Nenhum look para baixar!');
    return;
  }
  
  alert('Funcionalidade PRO: Download de todos os looks em massa. (Em desenvolvimento)');
}

// Função de upgrade
function upgrade() {
  currentPlan = 'pro';
  document.getElementById('planFree').classList.add('hidden');
  document.getElementById('planPro').classList.remove('hidden');
  alert('🎉 Upgrade realizado! Bem-vindo ao plano PRO.');
}

// Função auxiliar para mostrar status
function showStatus(message, color) {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.color = color;
  }
}

// Sleep function (utilidade)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
