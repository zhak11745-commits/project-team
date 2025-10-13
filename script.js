document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
  const valueInput = document.getElementById("value");
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const resultValue = document.getElementById("result-value");
  const resultDesc = document.getElementById("result-desc");
  const swapBtn = document.getElementById("swap-btn");
  const copyBtn = document.getElementById("copy-btn");
  const copyAll = document.getElementById("copy-all");
  const clearHistory = document.getElementById("clear-history");
  const historyList = document.getElementById("history-list");
  const tableBody = document.querySelector("#conversion-table tbody");
  const themeToggle = document.getElementById("theme-toggle");

  if (!valueInput || !fromSelect || !toSelect || !resultValue || !tableBody) {
    console.error('Elemen penting tidak ditemukan — periksa index.html');
    return;
  }
  
  // Objek baru untuk unit suhu dan formula konversinya ke basis (Celsius)
  const UNITS = {
    C: { name: 'Celsius', toBase: val => val, fromBase: val => val },
    F: { name: 'Fahrenheit', toBase: val => (val - 32) * 5 / 9, fromBase: val => (val * 9 / 5) + 32 },
    K: { name: 'Kelvin', toBase: val => val - 273.15, fromBase: val => val + 273.15 }
  };

  // Format angka dengan maksimal 2 angka di belakang koma
  const nf = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

  function formatNumber(num) {
    if (!isFinite(num)) return '0';
    return nf.format(Number(Number(num).toFixed(2)));
  }

  function populateSelects() {
    if (fromSelect.options.length > 0) return;
    Object.keys(UNITS).forEach(k => {
      const o1 = document.createElement('option'); o1.value = k; o1.text = ${k} (${UNITS[k].name}); fromSelect.add(o1);
      const o2 = document.createElement('option'); o2.value = k; o2.text = ${k} (${UNITS[k].name}); toSelect.add(o2);
    });
    // Default konversi C ke F
    fromSelect.value = 'C';
    toSelect.value = 'F';
  }

  function convertAndRender() {
    const raw = valueInput.value;
    const val = parseFloat(raw);
    const from = fromSelect.value;
    const to = toSelect.value;
    
    if (raw === '' || isNaN(val)) {
      resultValue.textContent = '–';
      resultDesc.textContent = 'Masukkan nilai untuk konversi';
      tableBody.innerHTML = '';
      return;
    }
    
    // Konversi nilai input ke basis (Celsius)
    const baseValue = UNITS[from].toBase(val);
    // Konversi dari basis ke unit tujuan
    const out = UNITS[to].fromBase(baseValue);
    
    const outFormatted = formatNumber(out);
    const valFormatted = formatNumber(val);

    resultValue.textContent = ${outFormatted}° ${to};
    resultDesc.textContent = ${UNITS[to].name} — dari ${valFormatted}° ${UNITS[from].name};

    addHistoryEntry(${valFormatted}° ${from} → ${outFormatted}° ${to});
    renderTable(baseValue);
  }

  function renderTable(baseValue) {
    tableBody.innerHTML = '';
    Object.entries(UNITS).forEach(([unit, formulas]) => {
      const v = formulas.fromBase(baseValue);
      const row = document.createElement('tr');
      const tdUnit = document.createElement('td'); tdUnit.textContent = ${unit} (${formulas.name});
      const tdVal = document.createElement('td'); tdVal.textContent = formatNumber(v);
      const tdAct = document.createElement('td');
      const btn = document.createElement('button'); btn.className = 'copy-btn-small'; btn.type = 'button'; btn.textContent = 'Salin';
      
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(formatNumber(v));
      });
      
      tdAct.appendChild(btn);
      row.appendChild(tdUnit);
      row.appendChild(tdVal);
      row.appendChild(tdAct);
      tableBody.appendChild(row);
    });
  }

  function addHistoryEntry(text) {
    if (!historyList) return;
    if (historyList.firstElementChild && historyList.firstElementChild.textContent === 'Belum ada riwayat') historyList.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = ${new Date().toLocaleTimeString('id-ID')} — ${text};
    historyList.prepend(li);
    if (historyList.children.length > 50) historyList.removeChild(historyList.lastChild);
  }

  // Event Listeners (tidak ada perubahan di sini)
  valueInput.addEventListener('input', convertAndRender);
  fromSelect.addEventListener('change', convertAndRender);
  toSelect.addEventListener('change', convertAndRender);

  swapBtn && swapBtn.addEventListener('click', () => {
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    convertAndRender();
  });

  copyBtn && copyBtn.addEventListener('click', () => {
    const txt = resultValue.textContent.split(' ')[0]; // Hanya salin angkanya
    if (txt && txt !== '–') navigator.clipboard.writeText(txt);
  });

  copyAll && copyAll.addEventListener('click', () => {
    const rows = Array.from(tableBody.querySelectorAll('tr')).map(r => {
      return r.children[0].textContent + ': ' + r.children[1].textContent;
    }).join('\n');
    if (rows) navigator.clipboard.writeText(rows);
  });

  clearHistory && clearHistory.addEventListener('click', () => {
    if (historyList) historyList.innerHTML = '<li>Belum ada riwayat</li>';
  });

  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Inisialisasi
  populateSelects();
  if (valueInput.value === '') valueInput.value = '30'; // Nilai default yang masuk akal untuk suhu
  convertAndRender();
});
