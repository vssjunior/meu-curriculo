document.addEventListener('DOMContentLoaded', function () {
  // Arquivo JS principal do currículo
  // Renderiza dinamicamente a lista de Qualificações a partir de um array em memória

  const qualifications = [
    { title: 'Técnicas de Comunicação', institution: 'Help School', year: 2009 },
    { title: 'Minicurso: Introdução à Linguagem C ANSI', institution: 'UFLA', year: 2010 },
    { title: 'Analista de Suporte Técnico', institution: 'Helpschool', year: 2010 },
    { title: 'Apresentador de trabalho', institution: 'XXIII Congresso de Iniciação Científica, UFLA', year: 2010 },
    { title: 'Participação', institution: '8º Encontro Regional de Administração, UFLA', year: 2010 },
    { title: 'Inglês Básico', institution: 'Centro Vocacional Tecnológico', year: 2011 },
  { title: 'Instalações Elétricas Residenciais', institution: 'Prontee', year: 2012 },
  { title: 'NR10', institution: 'Prontee', year: 2013 },
    { title: 'Redes de Computadores', institution: 'Prime', year: 2015 },
    { title: 'GDG In Touch: UX Designer', institution: 'Google Developer Group', year: 2019 },
    { title: 'White Belt Lean Six-Sigma', institution: 'EDTI', year: 2019 },
    { title: 'Fundamentos de Governança de TI', institution: 'Fundação Bradesco', year: 2019 },
    { title: 'Fundamentos do Power BI', institution: 'Fundação Bradesco', year: 2025 }
  ];

  function escapeHtml (str) {
    if (!str && str !== 0) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function formatQualificationItem (q) {
    const yearText = q.year ? `(${escapeHtml(q.year)})` : '(data não informada)';
    return `<li><strong>${escapeHtml(q.title)}</strong> — ${escapeHtml(q.institution)} ${yearText}</li>`;
  }

  function renderQualifications () {
    const container = document.getElementById('qual-list');
    if (!container) return;
    // Ordena por ano ascendente (cronológico): cursos mais recentes vão para o final
    const sorted = qualifications.slice().sort((a, b) => {
      const ay = typeof a.year === 'number' ? a.year : Infinity;
      const by = typeof b.year === 'number' ? b.year : Infinity;
      return ay - by;
    });
    container.innerHTML = sorted.map(formatQualificationItem).join('');
  }

  // API pública para adicionar qualificações em tempo de execução
  window.addQualification = function (q) {
    qualifications.push(q);
    renderQualifications();
  };

  renderQualifications();
  console.log('Qualificações carregadas:', qualifications.length);
});
