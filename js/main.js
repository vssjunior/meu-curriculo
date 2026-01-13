document.addEventListener('DOMContentLoaded', function () {
  // Arquivo JS principal do currículo
  // Implementa carregamento dinâmico da lista de cursos a partir de um array JSON

  // Lista inicial de cursos (modifique ou chame window.addCourse para adicionar dinamicamente)
  const courses = [
    { title: 'Fundamentos do Power BI', institution: 'Fundação Bradesco', year: 2025, link: '' }
  ];

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&<>"']/g, function(m){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
  }

  function formatCourseItem(c){
    const yearText = c.year ? (typeof c.year === 'number' ? c.year : c.year) : 'data não informada';
    const linkPart = c.link ? ` — <a href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer">Certificado</a>` : '';
    return `<li><strong>${escapeHtml(c.title)}</strong> — ${escapeHtml(c.institution)} (${yearText})${linkPart}</li>`;
  }

  function renderCourses(){
    const container = document.getElementById('cursos-list');
    if(!container) return;
    // Ordena por ano (desc). Cursos sem ano ficam ao final.
    courses.sort((a,b)=>{
      const ay = typeof a.year === 'number' ? a.year : -Infinity;
      const by = typeof b.year === 'number' ? b.year : -Infinity;
      return by - ay;
    });
    container.innerHTML = courses.map(formatCourseItem).join('');
  }

  // API pública mínima: adicionar curso em tempo de execução
  window.addCourse = function(course){
    courses.push(course);
    renderCourses();
  }

  renderCourses();
  console.log('Cursos carregados:', courses.length);
});
