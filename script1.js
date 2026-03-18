let inputCode = "";
const correctCode = "180326"; // GANTI DENGAN TANGGAL LAIRNYA (misal: "180326")
const audio = document.getElementById('myAudio');
let isMusicPlaying = false;

// 1. INPUT PASSWORD & MUSIK
function addNum(num) {
    // Putar musik saat angka pertama ditekan
    if(!isMusicPlaying) { 
        audio.play().catch(()=>{}); 
        isMusicPlaying = true; 
    }
    
    if (inputCode.length < 6) {
        inputCode += num;
        // Update dots horizontal
        document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i < inputCode.length));
        
        // Cek kode setelah 6 digit
        if (inputCode.length === 6) setTimeout(checkCode, 300);
    }
}

function erase() {
    inputCode = inputCode.slice(0, -1);
    document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i < inputCode.length));
}

function checkCode() {
    if (inputCode === correctCode) {
        // Berhasil! Transisi ke Halaman Hi Pretty
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('content-section').style.display = 'block';
    } else {
        // Salah! Tampilkan Modal
        document.getElementById('custom-alert').style.display = 'flex';
        inputCode = "";
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    }
}

// 2. NAVIGASI ANTAR HALAMAN
function nextToQuestion() { document.getElementById('content-section').style.display = 'none'; document.getElementById('question-section').style.display = 'block'; }
function goToNgambek() { document.getElementById('question-section').style.display = 'none'; document.getElementById('ngambek-section').style.display = 'block'; }
function backToQuestion() { document.getElementById('ngambek-section').style.display = 'none'; document.getElementById('question-section').style.display = 'block'; }
function finalAction() { document.getElementById('question-section').style.display = 'none'; document.getElementById('success-section').style.display = 'block'; }
function goToFoto1() { document.getElementById('success-section').style.display = 'none'; document.getElementById('foto-section').style.display = 'block'; }
function goToBirthday() { document.getElementById('foto-section').style.display = 'none'; document.getElementById('birthday-section').style.display = 'block'; }
function closeModal() { document.getElementById('custom-alert').style.display = 'none'; }

// =========================================
// BARU: KARTU UCAPAN TERAKHIR & LOGIKA KETIK
// =========================================

// Ganti fungsi finalFinish lama
function finalFinish() {
    // Sembunyikan bagian birthday
    document.getElementById('birthday-section').style.display = 'none';
    
    // Tampilkan bagian kartu surat
    const suratSection = document.getElementById('surat-section');
    suratSection.style.display = 'block';
    
    // Mulai animasi ngetik setelah jeda sebentar biar transisi halus
    setTimeout(startTyping, 500);
}

// Konfigurasi Teks yang Akan Diketik
const wordsToType = "to the one who owns my heart, happy birthday! thank you for everything. i hope you know how much i adore you and how much i want to see you happy. always. ❤️";
const speed = 60; // Kecepatan ngetik (ms per karakter)
let wordIndex = 0;

function startTyping() {
    const textElement = document.getElementById("typewriter-text");
    
    // Gunakan setInterval untuk ngetik per karakter
    const interval = setInterval(() => {
        if (wordIndex < wordsToType.length) {
            textElement.textContent += wordsToType[wordIndex];
            wordIndex++;
        } else {
            // Selesai! Hentikan interval
            clearInterval(interval);
            
            // Hapus kursor ngetik setelah selesai
            textElement.style.setProperty('--after-content', 'none'); 
            
            // Munculkan Tombol WhatsApp setelah 1 detik
            setTimeout(() => {
                document.getElementById('wa-btn').style.display = 'block';
            }, 1000);
        }
    }, speed);
}
// GANTI NOMOR WA DISINI! (Pastikan pakai kode negara 62 di depan)
const MY_PHONE_NUMBER = "6285755191879"; 
const REPLY_MESSAGE = "iyaaa sayang! terima kasih banyak buat kejutan manisnya!! i love you too 🤍💙";

function goToWA() {
    const MY_PHONE_NUMBER = "6285755191879"; 
    const REPLY_MESSAGE = "iyaaa sayang! terima kasih banyak buat kejutan manisnya!! i love you too 🤍💙";
    
    // Metode wa.me adalah yang paling stabil untuk mobile browser
    const waUrl = `https://wa.me/${6285755191879}?text=${encodeURIComponent(REPLY_MESSAGE)}`;
    
    // Gunakan window.open dengan '_system' atau '_blank' untuk memaksa keluar dari browser internal
    window.open(waUrl, '_blank');
}

// 3. EMOJI BURST EFFET
function shakeAndBurst(el, e) {
    el.classList.remove('photo-shake');
    void el.offsetWidth; // Reset animation
    el.classList.add('photo-shake');

    const emojis = [
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%231a3c7a" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>', 
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23f9f9f9" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
    ];

    for (let i = 0; i < 12; i++) {
        const span = document.createElement('div');
        span.classList.add('emoji-burst');
        span.style.backgroundImage = `url('${emojis[Math.floor(Math.random() * emojis.length)]}')`;
        span.style.left = e.clientX + 'px';
        span.style.top = e.clientY + 'px';
        const tx = (Math.random() - 0.5) * 350;
        const ty = (Math.random() - 0.5) * 350;
        span.style.setProperty('--tx', tx + 'px');
        span.style.setProperty('--ty', ty + 'px');
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 1000);
    }
}
