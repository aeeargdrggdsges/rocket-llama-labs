// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Concepts Data
const concepts = {
  1: {
    title: "The Aero-Llama Mark (Hero Concept)",
    desc: "The rocket fuselage seamlessly forms the upright neck and head of a cheerful, alert llama. Its aerodynamic winglets double as perky ears, and the dual-tone blue propulsion flame conveys rapid customer acquisition for home-service contractors.",
    file: "vectors/mark-concept-1.svg",
    downloadName: "Rocket-Llama-Aero-Hero.svg"
  },
  2: {
    title: "The Precision Tech Shield",
    desc: "A symmetrical, aerospace-grade crest pairing rocket fins with llama geometry. Features an upward growth arrow embedded in the core fuselage for instant B2B authority.",
    file: "vectors/mark-concept-2.svg",
    downloadName: "Rocket-Llama-Tech-Shield.svg"
  },
  3: {
    title: "The Monoline Orbit Mark",
    desc: "An ultra-minimalist, continuous-line vector mark inspired by Silicon Valley developer icons. Clean, lightweight strokes with rounded terminals and an orbital trajectory ring.",
    file: "vectors/mark-concept-3.svg",
    downloadName: "Rocket-Llama-Monoline-Orbit.svg"
  }
};

let currentConceptId = 1;

function selectConcept(id) {
  currentConceptId = id;
  const data = concepts[id];
  if (!data) return;

  // Update Buttons
  [1, 2, 3].forEach(i => {
    const btn = document.getElementById(`concept${i}Btn`);
    if (btn) {
      if (i === id) {
        btn.className = 'px-3 py-1.5 rounded bg-blue-600 text-white font-bold transition-all flex items-center gap-1.5 shadow-sm';
      } else {
        btn.className = 'px-3 py-1.5 rounded text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
      }
    }
  });

  // Update Image & Text
  const img = document.getElementById('activeMarkImg');
  const title = document.getElementById('activeConceptTitle');
  const desc = document.getElementById('activeConceptDesc');
  const downloadLink = document.getElementById('downloadSvgLink');

  if (img) img.src = data.file;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (downloadLink) {
    downloadLink.href = data.file;
    downloadLink.download = data.downloadName;
  }
}

// Canvas Background Selector
function setCanvasBg(type) {
  const container = document.getElementById('markDisplayContainer');
  if (!container) return;

  if (type === 'dark') {
    container.style.backgroundColor = '#0B0F19';
    container.style.borderColor = 'transparent';
  } else if (type === 'white') {
    container.style.backgroundColor = '#FFFFFF';
    container.style.borderColor = '#E2E8F0';
    container.style.borderWidth = '1px';
  } else if (type === 'blue') {
    container.style.backgroundColor = '#1E3A8A';
    container.style.borderColor = 'transparent';
  }
}

// Geometric Blueprint Toggle
let blueprintActive = false;
function toggleBlueprint() {
  blueprintActive = !blueprintActive;
  const grid = document.getElementById('blueprintGrid');
  const status = document.getElementById('blueprintStatus');
  const toggleBtn = document.getElementById('blueprintToggle');

  if (blueprintActive) {
    grid.style.opacity = '1';
    status.textContent = 'ON';
    status.className = 'text-sky-400 font-bold';
    toggleBtn.className = 'px-3 py-1.5 rounded text-xs font-mono border border-sky-500/50 bg-sky-950/40 text-sky-200 flex items-center gap-1.5 transition-colors shadow-sm shadow-sky-500/20';
    showToast('Geometric blueprint & trajectory lines enabled');
  } else {
    grid.style.opacity = '0';
    status.textContent = 'OFF';
    status.className = 'text-slate-500';
    toggleBtn.className = 'px-3 py-1.5 rounded text-xs font-mono border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 transition-colors';
    showToast('Geometric blueprint hidden');
  }
}

// Scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function openStyleSheet() {
  scrollToSection('stylesheet');
}

// Proposal Modal Handlers
function openProposalModal() {
  const modal = document.getElementById('proposalModal');
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeProposalModal() {
  const modal = document.getElementById('proposalModal');
  if (modal) modal.classList.remove('active');
}

function closeProposalOutside(e) {
  if (e.target.id === 'proposalModal') {
    closeProposalModal();
  }
}

function copyProposalText() {
  const text = document.getElementById('proposalContent').textContent;
  navigator.clipboard.writeText(text.trim()).then(() => {
    const btnText = document.getElementById('copyProposalBtnText');
    btnText.textContent = 'Copied!';
    setTimeout(() => {
      btnText.textContent = 'Copy Proposal Text';
    }, 2000);
    showToast('Contest proposal copied to clipboard!');
  });
}

function copyActiveSVG() {
  const activeFile = concepts[currentConceptId].file;
  fetch(activeFile)
    .then(r => r.text())
    .then(svgText => {
      navigator.clipboard.writeText(svgText);
      showToast('Raw SVG code copied to clipboard!');
    })
    .catch(() => {
      showToast('Error copying SVG');
    });
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
