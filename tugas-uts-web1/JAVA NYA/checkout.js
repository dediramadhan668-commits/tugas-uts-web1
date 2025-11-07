// checkout.js - cart sederhana + edit qty + hapus
(function(){
  const select = document.getElementById('buku');
  const form = document.getElementById('formOrder');
  const hasil = document.getElementById('hasilPesanan');
  const tableBody = document.querySelector('#keranjangTable tbody') || null;
  let cart = [];

  // isi select
  if(select){
    select.innerHTML = '<option value="">-- Pilih Buku --</option>';
    dataKatalogBuku.forEach(b=>{
      const opt = document.createElement('option');
      opt.value = b.kodeBarang; opt.textContent = `${b.namaBarang} - ${b.harga}`;
      select.appendChild(opt);
    });
  }

  function renderCart(){
    if(!tableBody) return;
    tableBody.innerHTML = '';
    let total = 0;
    cart.forEach((it, idx)=>{
      const tr = document.createElement('tr');
      const price = parseInt((it.harga||'0').toString().replace(/\D/g,'')) || 0;
      const subtotal = price * it.jumlah;
      total += subtotal;
      tr.innerHTML = `
        <td><img src="${it.cover||''}" style="width:60px;height:60px;object-fit:cover;border-radius:6px"></td>
        <td>${it.nama}</td>
        <td><input class="qty" data-idx="${idx}" type="number" min="1" value="${it.jumlah}" style="width:64px"></td>
        <td>${it.harga}</td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td><button class="btn secondary del" data-idx="${idx}">Hapus</button></td>
      `;
      tableBody.appendChild(tr);
    });
    const totalEl = document.getElementById('totalHarga') || document.getElementById('totalValue') || document.querySelector('#totalHarga');
    if(totalEl) totalEl.textContent = 'Rp ' + total.toLocaleString();

    // attach handlers qty & del
    Array.from(document.querySelectorAll('.qty')).forEach(el=>{
      el.addEventListener('change', function(){
        const i = +this.dataset.idx;
        const v = parseInt(this.value,10) || 1;
        cart[i].jumlah = v;
        renderCart();
      });
    });
    Array.from(document.querySelectorAll('.del')).forEach(btn=>{
      btn.addEventListener('click', function(){
        const i = +this.dataset.idx;
        cart.splice(i,1);
        renderCart();
      });
    });
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const nama = document.getElementById('nama')?.value || document.getElementById('penerima')?.value || '';
      const email = document.getElementById('email')?.value || document.getElementById('emailPemesan')?.value || '';
      const kode = select?.value;
      const jumlah = parseInt(document.getElementById('jumlah')?.value || document.getElementById('qty')?.value || 1,10);
      const metode = document.getElementById('pembayaran')?.value || document.getElementById('jenisPembayaran')?.value || '';

      if(!kode) return alert('Pilih buku terlebih dahulu');
      const buku = dataKatalogBuku.find(b=>b.kodeBarang===kode);
      if(!buku) return alert('Buku tidak ditemukan');
      if(jumlah > (buku.stok||0)) return alert('Stok tidak cukup');

      // tambahkan ke cart
      const existing = cart.find(c=>c.kode===kode);
      if(existing) existing.jumlah += jumlah; else cart.push({kode:buku.kodeBarang,nama:buku.namaBarang,jumlah:jumlah,harga:buku.harga,cover:buku.cover||''});

      // kurangi stok sementara di dataKatalogBuku
      buku.stok -= jumlah;

      renderCart();
      hasil && (hasil.innerHTML = `<div class="card-muted"><strong>Pesanan ditambahkan.</strong></div>`);
      form.reset();
    });
  }

  renderCart();
})();
