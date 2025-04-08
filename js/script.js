// 导航切换
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// 语言切换
let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');

function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
    });
    langToggle.textContent = lang === 'en' ? 'CN' : 'EN'; // 更新按钮文本
}

// 点击语言切换按钮
langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    switchLang(currentLang === 'en' ? 'zh' : 'en');
});

// 默认英文
switchLang('en');