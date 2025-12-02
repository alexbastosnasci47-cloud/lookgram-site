// Lookgram MVP Logic
let currentPlan = 'free';
let looks = Array.from({length: 10}, (_, i) => 'Look ' + (i + 1));
document.getElementById('counter').textContent = looks.length;

function triggerDownload() {
  alert('Download do look simulado!');
}

function upgrade() {
  currentPlan = 'pro';
  document.getElementById('planFree').classList.add('hidden');
  document.getElementById('planPro').classList.remove('hidden');
  alert('Upgrade realizado! Bem-vindo ao PRO.');
}

// Sleep trick para simular processamento
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}