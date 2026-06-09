// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.style.background = window.scrollY > 60
      ? 'rgba(13,8,0,0.99)'
      : 'rgba(13,8,0,0.97)';
  }
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
  navLinks.querySelectorAll('a:not(.dropdown > a)').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

// SMOOTH SCROLL for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// AVAILABILITY BAR ANIMATION
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.avail-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = w; }, 300);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.season-card').forEach(c => barObserver.observe(c));

// STAT COUNTER ANIMATION
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'none';
      entry.target.style.transform = 'scale(1.05)';
      setTimeout(() => { entry.target.style.transform = 'scale(1)'; }, 300);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(s => countObserver.observe(s));

// MANGO LIST FILTER
function filterMango(tag) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.mango-item').forEach(item => {
    item.style.display = (tag === 'all' || item.dataset.tag.includes(tag)) ? 'grid' : 'none';
  });
}

// PRICE CALCULATOR
const priceData = {
  350: { name: 'হিমসাগর', d5: 330, d10: 300 },
  280: { name: 'আম্রপালি', d5: 260, d10: 240 },
  250: { name: 'ফজলি', d5: 230, d10: 210 },
  320: { name: 'ল্যাংড়া', d5: 300, d10: 280 },
  400: { name: 'গোপালভোগ', d5: 380, d10: 350 }
};

function calcPrice() {
  const base = parseInt(document.getElementById('mangoType')?.value);
  const qty = parseFloat(document.getElementById('qty')?.value) || 2;
  if (!base) return;
  const info = priceData[base];
  let price = base, note = '';
  if (qty >= 10) { price = info.d10; note = '🎉 ১০+ কেজিতে সর্বোচ্চ ছাড় পাচ্ছেন!'; }
  else if (qty >= 5) { price = info.d5; note = '✅ ৫+ কেজিতে বিশেষ ছাড় প্রযোজ্য।'; }
  const total = Math.round(price * qty);
  if (document.getElementById('perKg')) document.getElementById('perKg').textContent = '৳' + price;
  if (document.getElementById('totalKg')) document.getElementById('totalKg').textContent = qty + ' কেজি';
  if (document.getElementById('totalPrice')) document.getElementById('totalPrice').textContent = '৳' + total.toLocaleString('bn-BD');
  if (document.getElementById('discountNote')) document.getElementById('discountNote').textContent = note;
  const msg = info.name + ' আম অর্ডার করতে চাই — পরিমাণ: ' + qty + ' কেজি, মোট: ৳' + total;
  const waBtn = document.getElementById('waBtn');
  if (waBtn) waBtn.href = 'https://wa.me/8801789897434?text=' + encodeURIComponent(msg);
}

if (document.getElementById('mangoType')) { calcPrice(); }

// FAQ TOGGLE
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const arrow = el.querySelector('.faq-arrow');
  const isOpen = answer.style.display === 'block';
  document.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
  document.querySelectorAll('.faq-arrow').forEach(a => a.textContent = '▼');
  if (!isOpen) { answer.style.display = 'block'; arrow.textContent = '▲'; }
}
