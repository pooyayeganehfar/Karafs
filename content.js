// Helper: روزهای هفته فارسی
const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
// Helper: تعطیلی‌های نمونه (جمعه‌ها و چند روز دلخواه)
const holidays = [6, 13, 20, 27]; // جمعه‌ها و نمونه

// Helper: نام ماه و سال شمسی (نمونه)
const persianMonth = 'شهریور';
const persianYear = 1402;
const persianMonthDays = 31;
const today = new Date().getDate();

// Helper: میانبرها (نمونه)
const shortcuts = [
  { icon: '🎵', title: 'وی‌پاد', url: 'https://vipod.ir', favicon: 'https://www.google.com/s2/favicons?domain=vipod.ir' },
  { icon: '📰', title: 'خبر', url: 'https://www.bbc.com/persian', favicon: 'https://www.google.com/s2/favicons?domain=bbc.com' },
  { icon: '📧', title: 'جیمیل', url: 'https://mail.google.com', favicon: 'https://www.google.com/s2/favicons?domain=mail.google.com' },
  { icon: '💻', title: 'گیت‌هاب', url: 'https://github.com', favicon: 'https://www.google.com/s2/favicons?domain=github.com' },
  { icon: '📺', title: 'یوتیوب', url: 'https://youtube.com', favicon: 'https://www.google.com/s2/favicons?domain=youtube.com' },
  { icon: '🛒', title: 'دیجی‌کالا', url: 'https://digikala.com', favicon: 'https://www.google.com/s2/favicons?domain=digikala.com' },
  { icon: '💬', title: 'تلگرام', url: 'https://web.telegram.org', favicon: 'https://www.google.com/s2/favicons?domain=telegram.org' },
  { icon: '📚', title: 'کتاب', url: 'https://taaghche.com', favicon: 'https://www.google.com/s2/favicons?domain=taaghche.com' }
];

// بارگذاری یادداشت از localStorage
function loadNotes() {
  return localStorage.getItem('notes') || '';
}
function saveNotes(val) {
  localStorage.setItem('notes', val);
}

// ساخت تقویم شمسی ساده
function generateCalendar() {
  let html = '';
  // Header
  for (let i = 0; i < 7; i++) {
    html += `<div class="calendar-day header">${weekDays[i]}</div>`;
  }
  // Days
  for (let i = 1; i <= persianMonthDays; i++) {
    const isHoliday = holidays.includes((i + 5) % 7); // جمعه‌ها و نمونه
    const isToday = i === today;
    html += `<div class="calendar-day${isHoliday ? ' holiday' : ''}${isToday ? ' today' : ''}">${i}</div>`;
  }
  return html;
}

// ساخت میانبرها
function generateShortcuts() {
  let html = '';
  for (let i = 0; i < 12; i++) {
    if (i < shortcuts.length) {
      html += `
        <div class="shortcut-card" onclick="window.open('${shortcuts[i].url}', '_blank')">
          <img src="${shortcuts[i].favicon}" alt="" style="width:32px;height:32px;border-radius:8px;">
          <div class="shortcut-title">${shortcuts[i].title}</div>
        </div>
      `;
    } else {
      html += `
        <div class="shortcut-card add">
          <span style="font-size:2.5rem;">+</span>
          <div class="shortcut-title">افزودن</div>
        </div>
      `;
    }
  }
  return html;
}

// ساخت HTML صفحه
document.body.innerHTML = `
  <div class="container">
    <!-- ستون چپ -->
    <div class="left-column">
      <div class="card weather-card">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="weather-icon" id="weather-icon" style="font-size:2rem;">🌙</span>
          <span id="weather-temp" style="font-size:1.7rem;font-weight:500;">۲۷°</span>
        </div>
        <div class="digital-clock" id="digital-clock" style="margin:10px 0 0 0;">--:--</div>
        <div class="date" id="persian-date"><span style="margin-left:5px;">📅</span>۱۷ شهریور ۱۴۰۲</div>
        <div class="date" id="gregorian-date"><span style="margin-left:5px;">🌍</span>8 September 2023</div>
        <div class="date" id="islamic-date"><span style="margin-left:5px;">🕌</span>۲۲ صفر ۱۴۴۵</div>
        <div class="action-buttons" style="margin-top:12px;">
          <button class="btn" id="prayer-btn"><span style="margin-left:5px;">🕋</span>اوقات شرعی</button>
          <button class="btn" id="timer-btn"><span style="margin-left:5px;">⏱️</span>تایمر</button>
        </div>
        <div class="weather-img" style="display:flex;justify-content:center;margin-top:10px;">
          <img src="icons/hand.png" alt="کارتون" style="width:32px;height:32px;">
        </div>
      </div>
      <div class="card calendar-card">
        <div class="calendar-header" style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.3rem;">📆</span>
          <span class="calendar-title" style="font-weight:500;">${persianMonth} ${persianYear}</span>
        </div>
        <div class="calendar-grid">
          ${generateCalendar()}
        </div>
        <div class="calendar-footer" style="margin-top:10px;">
          <button class="btn"><span style="margin-left:5px;">🔄</span>تبدیل تاریخ</button>
        </div>
      </div>
    </div>
    <!-- ستون وسط -->
    <div class="middle-column">
      <div class="search-section">
        <form class="google-search" id="google-search-form" autocomplete="off" style="gap:10px;">
          <img src="icons/google.png" alt="Google" style="width:28px;height:28px;margin-right:5px;">
          <input type="text" id="google-search-input" placeholder="جستجو در گوگل" style="font-size:1rem;">
          <span class="mic-icon" title="جستجوی صوتی" style="font-size:1.3rem;cursor:pointer;margin:0 6px;">🎤</span>
          <span class="search-icon" title="جستجو" id="search-btn" style="font-size:1.3rem;cursor:pointer;">🔍</span>
        </form>
        <div class="shortcuts-grid">
          ${generateShortcuts()}
        </div>
      </div>
    </div>
    <!-- ستون راست -->
    <div class="right-column">
      <div class="card notes-card">
        <h3 style="display:flex;align-items:center;gap:6px;font-size:1.1rem;font-weight:500;margin-bottom:10px;">
          <span style="font-size:1.2rem;">✍️</span> دستنویس
        </h3>
        <div class="notes-content" id="notes" contenteditable="true" style="min-height:120px;"></div>
        <button class="new-task-btn" id="new-task-btn"><span style="margin-left:5px;">➕</span>نوشتن تسک جدید</button>
      </div>
    </div>
  </div>
`;

// ساعت دیجیتال
function updateClock() {
  const now = new Date();
  document.getElementById('digital-clock').textContent =
    now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// تاریخ شمسی، میلادی، قمری (نمونه ساده)
function updateDates() {
  // ...existing code or your own logic for updating dates...
}
updateDates();

// آب‌وهوا (نمونه ثابت، برای واقعی‌سازی باید API اضافه شود)
function updateWeather() {
  // ...existing code or your own logic for updating weather...
}
updateWeather();

// جستجوی گوگل
document.getElementById('google-search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const q = document.getElementById('google-search-input').value.trim();
  if (q) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank');
  }
});
document.getElementById('search-btn').addEventListener('click', function() {
  document.getElementById('google-search-form').dispatchEvent(new Event('submit'));
});

// یادداشت دستنویس با ذخیره‌سازی محلی
const notesEl = document.getElementById('notes');
notesEl.innerHTML = loadNotes();
notesEl.addEventListener('input', () => saveNotes(notesEl.innerHTML));

// دکمه نوشتن تسک جدید (نمونه عملکرد)
document.getElementById('new-task-btn').addEventListener('click', () => {
  notesEl.focus();
  notesEl.innerHTML += '<div>تسک جدید...</div>';
  saveNotes(notesEl.innerHTML);
});

// دکمه‌های اوقات شرعی و تایمر (نمونه عملکرد)
document.getElementById('prayer-btn').addEventListener('click', () => {
  alert('اوقات شرعی به‌زودی اضافه می‌شود.');
});
document.getElementById('timer-btn').addEventListener('click', () => {
  alert('تایمر به‌زودی اضافه می‌شود.');
});

// اضافه کردن باکس نتایج پیشنهادی زیر سرچ‌بار
const searchSection = document.querySelector('.search-section');
const suggestionsBox = document.createElement('div');
suggestionsBox.id = 'google-suggestions-box';
suggestionsBox.style.display = 'none';
suggestionsBox.style.position = 'relative';
searchSection.appendChild(suggestionsBox);

// استایل ساده برای باکس پیشنهادات (در صورت نیاز بهبود دهید)
const style = document.createElement('style');
style.innerHTML = `
#google-suggestions-box {
  background: #fff;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 8px 24px rgba(60,72,88,0.08);
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  z-index: 10;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
  font-family: inherit;
  font-size: 1rem;
  direction: rtl;
}
.suggestion-item {
  padding: 10px 18px;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  align-items: center;
  gap: 8px;
}
.suggestion-item:last-child {
  border-bottom: none;
}
.suggestion-item:hover, .suggestion-item.active {
  background: #f0f4fa;
}
.suggestion-icon {
  font-size: 1.1rem;
  color: #4285f4;
}
`;
document.head.appendChild(style);

// تابع دریافت پیشنهادات (نمونه با پیشنهادات ثابت، برای واقعی‌سازی باید از API عمومی استفاده شود)
async function fetchSuggestions(query) {
  if (!query.trim()) return [];
  // نمونه پیشنهادات استاتیک
  const staticSuggestions = [
    'وضعیت آب و هوا',
    'قیمت دلار',
    'اخبار روز',
    'ترجمه انگلیسی به فارسی',
    'ساعت ایران',
    'نتایج فوتبال',
    'تبدیل تاریخ',
    'دانلود اینستاگرام',
    'آب و هوا تهران',
    'قیمت طلا'
  ];
  // فیلتر ساده
  return staticSuggestions.filter(s => s.includes(query)).slice(0, 5);
}

// نمایش پیشنهادات زیر سرچ‌بار
const searchInput = document.getElementById('google-search-input');
let suggestions = [];
let selectedSuggestion = -1;

searchInput.addEventListener('input', async function () {
  const query = this.value.trim();
  if (!query) {
    suggestionsBox.style.display = 'none';
    suggestionsBox.innerHTML = '';
    return;
  }
  suggestions = await fetchSuggestions(query);
  if (suggestions.length === 0) {
    suggestionsBox.style.display = 'none';
    suggestionsBox.innerHTML = '';
    return;
  }
  suggestionsBox.innerHTML = suggestions.map((s, i) =>
    `<div class="suggestion-item${i === 0 ? ' active' : ''}" data-index="${i}">
      <span class="suggestion-icon">🔎</span>
      <span>${s}</span>
    </div>`
  ).join('');
  suggestionsBox.style.display = 'block';
  selectedSuggestion = 0;
});

// انتخاب با موس
suggestionsBox.addEventListener('mousedown', function (e) {
  const item = e.target.closest('.suggestion-item');
  if (item) {
    searchInput.value = item.querySelector('span:last-child').textContent;
    suggestionsBox.style.display = 'none';
    document.getElementById('google-search-form').dispatchEvent(new Event('submit'));
  }
});

// انتخاب با کیبورد
searchInput.addEventListener('keydown', function (e) {
  if (!suggestions || suggestions.length === 0) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSuggestion = (selectedSuggestion + 1) % suggestions.length;
    updateSuggestionActive();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSuggestion = (selectedSuggestion - 1 + suggestions.length) % suggestions.length;
    updateSuggestionActive();
  } else if (e.key === 'Enter') {
    const items = suggestionsBox.querySelectorAll('.suggestion-item');
    if (suggestionsBox.style.display === 'block' && items[selectedSuggestion]) {
      searchInput.value = items[selectedSuggestion].querySelector('span:last-child').textContent;
      suggestionsBox.style.display = 'none';
    }
  } else if (e.key === 'Escape') {
    suggestionsBox.style.display = 'none';
  }
});

function updateSuggestionActive() {
  const items = suggestionsBox.querySelectorAll('.suggestion-item');
  items.forEach((item, idx) => {
    if (idx === selectedSuggestion) item.classList.add('active');
    else item.classList.remove('active');
  });
}

// بستن باکس پیشنهادات هنگام کلیک بیرون
document.addEventListener('mousedown', function (e) {
  if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
    suggestionsBox.style.display = 'none';
  }
});
