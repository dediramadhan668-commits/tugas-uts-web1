// tracking.js
(function(){
  const btn = document.getElementById('btnCari') || document.getElementById('cariTracking');
  const input = document.getElementById('inputNoDO') || document.getElementById('noDO');
  const out = document.getElementById('hasilTracking');

  function setProgress(el, pct){
    const bar = el.querySelector('.progress-bar') || el.querySelector('#progressBar');
    if(bar) bar.style.width = pct + '%';
  }

  if(!btn || !input || !out) return;

  btn.addEventListener('click', function(){
    const q = input.value.trim();
    if(!q) return alert('Masukkan Nomor DO');

    const rec = dataTracking[q];
    if(!rec) {
      out.innerHTML = `<div class="card-muted">Nomor DO tidak ditemukan</div>`;
      return;
    }

    // tentukan persen dari status
    let pct = 25;
    const s = rec.status.toLowerCase();
    if(s.includes('proses')) pct = 30;
    if(s.includes('dikirim') || s.includes('dalam perjalanan')) pct = 60;
    if(s.includes('selesai') || s.includes('delivered')) pct = 100;

    // render
    const perjalananHTML = (rec.perjalanan||[]).map(p=>`<li><small class="small">${p.waktu}</small><div>${p.keterangan}</div></li>`).join('');
    out.innerHTML = `
      <div><strong>Nama Pemesan:</strong> ${rec.nama}</div>
      <div><strong>Status:</strong> ${rec.status}</div>
      <div><strong>Ekspedisi:</strong> ${rec.ekspedisi} • ${rec.paket} • ${rec.tanggalKirim}</div>
      <div><strong>Total:</strong> ${rec.total}</div>
      <div class="progress-wrap" style="margin-top:8px"><div class="progress-bar" style="width:0"></div></div>
      <h4 style="margin-top:12px;color:var(--accent)">Riwayat Perjalanan</h4>
      <ul style="list-style:none;padding-left:0">${perjalananHTML}</ul>
    `;
    // set progress after dom appended
    setTimeout(()=> setProgress(out, pct), 60);
  });
})();
