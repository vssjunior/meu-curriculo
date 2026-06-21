document.addEventListener('DOMContentLoaded', function () {
  const qualifications = [
    { title: 'Técnicas de Comunicação', institution: 'Help School', year: 2009, category: 'Comunicação e Desenvolvimento' },
    { title: 'Minicurso: Introdução à Linguagem C ANSI', institution: 'UFLA', year: 2010, category: 'Programação e Sistemas' },
    { title: 'Analista de Suporte Técnico', institution: 'Helpschool', year: 2010, category: 'Programação e Sistemas' },
    { title: 'Inglês Básico', institution: 'Centro Vocacional Tecnológico', year: 2011, category: 'Idiomas' },
    { title: 'Instalações Elétricas Residenciais', institution: 'Prontee', year: 2012, category: 'Segurança e Normas' },
    { title: 'NR10', institution: 'Prontee', year: 2013, category: 'Segurança e Normas' },
    { title: 'Redes de Computadores', institution: 'Prime', year: 2015, category: 'Redes e Infraestrutura' },
    { title: 'GDG In Touch: UX Designer', institution: 'Google Developer Group', year: 2019, category: 'Programação e Sistemas' },
    { title: 'White Belt Lean Six-Sigma', institution: 'EDTI', year: 2019, category: 'Gestão, Qualidade e BI' },
    { title: 'Fundamentos de Governança de TI', institution: 'Fundação Bradesco', year: 2019, category: 'Gestão, Qualidade e BI' },
    { title: 'Fundamentos do Power BI', institution: 'Fundação Bradesco', year: 2025, category: 'Gestão, Qualidade e BI' }
  ];

  const categoryOrder = [
    'Gestão, Qualidade e BI',
    'Programação e Sistemas',
    'Redes e Infraestrutura',
    'Segurança e Normas',
    'Comunicação e Desenvolvimento',
    'Idiomas'
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

  function groupByCategory (items) {
    const groups = {};
    items.forEach(function (q) {
      const cat = q.category || 'Outros';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(q);
    });
    return groups;
  }

  function renderQualifications () {
    const container = document.getElementById('qual-list');
    if (!container) return;

    const sorted = qualifications.slice().sort(function (a, b) {
      const ay = typeof a.year === 'number' ? a.year : Infinity;
      const by = typeof b.year === 'number' ? b.year : Infinity;
      return ay - by;
    });

    const groups = groupByCategory(sorted);
    const orderedCategories = categoryOrder.filter(function (cat) {
      return groups[cat] && groups[cat].length;
    });

    Object.keys(groups).forEach(function (cat) {
      if (orderedCategories.indexOf(cat) === -1) {
        orderedCategories.push(cat);
      }
    });

    container.innerHTML = orderedCategories.map(function (category) {
      const items = groups[category].map(formatQualificationItem).join('');
      return (
        '<section class="qual-group" aria-label="' + escapeHtml(category) + '">' +
          '<h3 class="qual-group-title">' + escapeHtml(category) + '</h3>' +
          '<ul class="qual-list">' + items + '</ul>' +
        '</section>'
      );
    }).join('');
  }

  window.addQualification = function (q) {
    qualifications.push(q);
    renderQualifications();
  };

  renderQualifications();

  var exportBtn = document.getElementById('export-pdf');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      document.body.classList.add('print-mode');
      window.print();
    });
  }

  window.addEventListener('afterprint', function () {
    document.body.classList.remove('print-mode');
  });
});
