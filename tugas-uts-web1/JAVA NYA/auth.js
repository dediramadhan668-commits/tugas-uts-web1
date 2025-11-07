// auth.js - BNHA full anime login effect + validasi
(function(){
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');

  function toast(msg, timeout=1800){
    const t = document.createElement('div');
    t.className = 'card-muted';
    t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px'; t.style.zIndex=90;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.remove(), timeout);
  }

  function validEmail(v){ return /\S+@\S+\.\S+/.test(v); }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = (emailEl.value||'').trim();
    const pwd = (passEl.value||'').trim();

    if(!email || !pwd){ toast('Isi email dan password'); return; }
    if(!validEmail(email)){ toast('Format email salah'); return; }

    const user = dataPengguna.find(u => u.email === email && u.password === pwd);
    if(!user){
      toast('email/password yang anda masukkan salah');
      form.animate([{ transform:'translateX(0)' }, { transform:'translateX(-8px)' }, { transform:'translateX(8px)' }, { transform:'translateX(0)' }], { duration:420 });
      return;
    }

    // sukses: efek PLUS ULTRA
    sessionStorage.setItem('loginUser', JSON.stringify(user));
    plusUltraEffect(user.nama);
  });

  function plusUltraEffect(name){
    // overlay
    const o = document.createElement('div');
    o.className = 'plus-ultra-overlay';
    o.innerHTML = `
      <div class="plus-ultra-card">
        <div class="plus-ultra-text">PLUS ULTRA!</div>
        <div class="plus-ultra-sub">Selamat datang, ${name}</div>
      </div>
    `;
    document.body.appendChild(o);

    // suara kecil? (tidak disertakan)
    // animasi kekinian: getar cepat pada body
    document.body.animate([{filter:'brightness(1)'},{filter:'brightness(1.12)'},{filter:'brightness(1)'}], {duration:900});

    setTimeout(()=> {
      o.remove();
      window.location.href = 'dashboard.html';
    }, 1600);
  }

  // modal open handlers (jika ada elemen)
  const openLupa = document.getElementById('lupaPassword');
  const modalLupa = document.getElementById('modalLupa');
  if(openLupa && modalLupa){
    openLupa.addEventListener('click', (e)=>{ e.preventDefault(); modalLupa.style.display='flex'; });
    modalLupa.querySelector('.modal-close')?.addEventListener('click', ()=> modalLupa.style.display='none');
  }
  const openDaftar = document.getElementById('daftar');
  const modalDaftar = document.getElementById('modalDaftar');
  if(openDaftar && modalDaftar){
    openDaftar.addEventListener('click', (e)=>{ e.preventDefault(); modalDaftar.style.display='flex'; });
    modalDaftar.querySelector('.modal-close')?.addEventListener('click', ()=> modalDaftar.style.display='none');
    const regForm = document.getElementById('daftarForm');
    if(regForm){
      regForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        const inputs = Array.from(regForm.querySelectorAll('input'));
        const nama = inputs[0].value.trim(), email = inputs[1].value.trim(), pwd = inputs[2].value.trim();
        if(!nama||!email||!pwd) return toast('Lengkapi data pendaftaran');
        dataPengguna.push({ id: (dataPengguna.length?Math.max(...dataPengguna.map(u=>u.id))+1:1), nama, email, password:pwd, role:'User' });
        toast('Akun dibuat. Silakan login');
        regForm.reset(); modalDaftar.style.display='none';
      });
    }
  }

})();
