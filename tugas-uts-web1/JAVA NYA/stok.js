// stok.js - render + tambah + edit + hapus
(function(){
  const tbody = document.getElementById('tabelStok') || document.querySelector('#tabelStok tbody') || document.getElementById('tbodyBuku');
  // jika HTML punya tbody id berbeda, coba beberapa id di atas.

  function render(){
    if(!tbody) return;
    tbody.innerHTML = '';
    dataKatalogBuku.forEach((b, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${b.kodeBarang}</td>
        <td>${b.namaBarang}</td>
        <td>${b.jenisBarang}</td>
        <td>${b.edisi}</td>
        <td class="stok-val">${b.stok}</td>
        <td>${b.harga}</td>
        <td class="actions">
          <button class="btn small edit" data-idx="${idx}">Ubah</button>
          <button class="btn secondary small del" data-idx="${idx}">Hapus</button>
        </td>`;
      tbody.appendChild(tr);
    });
    attachHandlers();
  }

  function attachHandlers(){
    Array.from(document.querySelectorAll('.edit')).forEach(btn=>{
      btn.onclick = function(){
        const i = +this.dataset.idx;
        const b = dataKatalogBuku[i];
        const newName = prompt('Ubah nama buku', b.namaBarang);
        if(newName === null) return;
        const newStok = prompt('Ubah stok', b.stok);
        if(newStok !== null && !isNaN(parseInt(newStok,10))) b.stok = parseInt(newStok,10);
        b.namaBarang = newName.trim() || b.namaBarang;
        render();
      };
    });
    Array.from(document.querySelectorAll('.del')).forEach(btn=>{
      btn.onclick = function(){
        const i = +this.dataset.idx;
        if(confirm('Hapus buku ini?')) {
          dataKatalogBuku.splice(i,1);
          render();
        }
      };
    });
  }

  // fitur tambah baris jika ada form dengan id formAdd
  const formAdd = document.getElementById('formAdd');
  if(formAdd){
    formAdd.addEventListener('submit', function(e){
      e.preventDefault();
      const kode = (document.getElementById('kodeBarang')?.value || '').trim();
      const nama = (document.getElementById('namaBarang')?.value || '').trim();
      const jenis = (document.getElementById('jenisBarang')?.value || '').trim();
      const edisi = (document.getElementById('edisi')?.value || '').trim();
      const stok = parseInt(document.getElementById('stok')?.value||0,10);
      if(!kode||!nama) return alert('Kode dan nama wajib');
      dataKatalogBuku.push({kodeBarang:kode,namaBarang:nama,jenisBarang:jenis,edisi:edisi,stok:stok,harga:'Rp 0',cover:''});
      formAdd.reset();
      render();
    });
  }

  render();
})();
