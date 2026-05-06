// ตัวแปรควบคุมภาษา (เริ่มต้นที่ภาษาไทย)
let currentLang = 'th';
// ตัวแปรจำว่าตอนนี้ดูเมนูไหนอยู่
let currentType = 'car';

// ----------------------------------------
// 1. คลังคำศัพท์สำหรับหน้าจอ UI ทั่วไป
// ----------------------------------------
const uiDict = {
    th: {
        title: "วิธีการเดินทาง",
        subtitle: "เลือกประเภทการเดินทางของคุณ",
        menuCar: "รถยนต์",
        menuBike: "มอเตอร์ไซค์",
        menuWalk: "เดินเท้า",
        footer: "&copy; 2026 JJ MALL - Shower Room Services",
        clickExpand: "(คลิกที่รูปเพื่อขยาย)"
    },
    en: {
        title: "Directions",
        subtitle: "Select your transportation mode",
        menuCar: "Car",
        menuBike: "Motorcycle",
        menuWalk: "Walk",
        footer: "&copy; 2026 JJ MALL - Shower Room Services",
        clickExpand: "(Click image to expand)"
    }
};

// ----------------------------------------
// 2. ข้อมูลการเดินทาง (แยก 2 ภาษา)
// ----------------------------------------
const travelData = {
    car: {
        images: ["images/step1.jpg", "images/step.jpg"],
        th: {
            title: "เดินทางด้วยรถยนต์ส่วนตัว",
            // ใช้ <i> </i> คร่อมส่วนที่ต้องการให้เอียง
            desc: "จอดรถที่ลานจอดชั้น 3 และติดต่อแสตมป์บัตรได้ที่ประชาสัมพันธ์ ชั้น 1 <i>(เฉพาะผู้ใช้บริการห้องอาบน้ำ)</i>",
            steps: [
                "1. จอดรถ ณ ลานจอดรถชั้น 3",
                "2. ติดต่อประชาสัมพันธ์ ชั้น 1 เพื่อรับสิทธิ์ <b>จอดฟรี 1 ชม.</b>",
                "<i>กรุณาแสดงใบเสร็จหรือหลักฐานการใช้บริการ</i>"
            ]
        },
        en: {
            title: "By Private Car",
            desc: "Park on Level 3 and validate your ticket at the Info Counter <i>(Shower service customers only)</i>",
            steps: [
                "1. Park on Level 3",
                "2. Visit Information Counter on 1st Floor for <b>1-hour free parking</b>",
                "<i>Please show your service receipt</i>"
            ]
        }
    },
    bike: {
        images: ["images/bike_step1.jpg", "images/bike_step2.jpg"], 
        th: {
            title: "เดินทางด้วยรถมอเตอร์ไซค์",
            desc: "จอดรถที่จุดจอดรถจักรยานยนต์ประตู 3 และติดต่อแสตมป์บัตรได้ที่ประชาสัมพันธ์ ชั้น 1",
            steps: [
                "1. จอดรถ ณ จุดจอดรถจักรยานยนต์ <b>ประตู 3</b>",
                "2. นำบัตรจอดรถมาติดต่อที่ <b>เคาน์เตอร์ประชาสัมพันธ์ ชั้น 1</b>",
                "<i>รับสิทธิ์จอดฟรี 1 ชม. (เฉพาะลูกค้าที่ใช้บริการห้องอาบน้ำ)</i>"
            ]
        },
        en: {
            title: "By Motorcycle",
            desc: "Park at Gate 3 and validate your ticket at the 1st Floor Information Counter.",
            steps: [
                "1. Park at <b>Gate 3</b> motorcycle parking area",
                "2. Visit <b>Information Counter (1st Floor)</b>",
                "<i>1-hour free parking for shower service customers only</i>"
            ]
        }
    },
    walk: {
        images: ["images/walk_step1.jpg", "images/walk_step2.jpg"], 
        th: {
            title: "เดินทางเท้า / รถสาธารณะ",
            desc: "เดินทางเข้า JJ MALL ได้ทุกประตู",
            steps: [
                "ติดต่อเจ้าหน้าที่ ณ <b>เคาน์เตอร์ประชาสัมพันธ์ ชั้น 1</b> เพื่อสอบถามจุดบริการ",
                "<i>เปิดให้บริการสำหรับลูกค้า Walk-in ทุกท่านที่ต้องการใช้บริการห้องอาบน้ำ</i>"
            ]
        },
        en: {
            title: "Walk-in / Public Transit",
            desc: "Easy access from all main entrances. Head to the service point on the 1st Floor.",
            steps: [
                "Visit the <b>Information Counter (1st Floor)</b> for directions",
                "<i>All Walk-in customers are welcome to use our shower facilities</i>"
            ]
        }
    }
};

// ----------------------------------------
// ระบบการทำงานต่างๆ
// ----------------------------------------
let currentImages = [];
let currentSlideIndex = 0;

function showContent(type, btn) {
    currentType = type; // จำไว้ว่ากำลังดูรถยนต์ มอเตอร์ไซค์ หรือเดิน

    // เปลี่ยนสีปุ่มเมนู
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    else document.getElementById(`btn-${type}`).classList.add('active');

    const data = travelData[type];
    const langData = data[currentLang]; // ดึงข้อมูลตามภาษาปัจจุบัน
    const ui = uiDict[currentLang]; // ดึงคำศัพท์ UI

    currentImages = data.images;
    currentSlideIndex = 0;

    const container = document.getElementById('content-body');
    let stepsHtml = langData.steps.map(s => `<p class="route-step">${s}</p>`).join('');

    let sliderHtml = `
        <div class="slider-container">
            ${currentImages.map((img, index) => 
                `<img src="${img}" class="slider-img ${index === 0 ? 'active' : ''}" onclick="openModal('${img}')">`
            ).join('')}
            ${currentImages.length > 1 ? `
                <button class="slider-btn prev" onclick="changeSlide(-1)">&#10094;</button>
                <button class="slider-btn next" onclick="changeSlide(1)">&#10095;</button>
            ` : ''}
        </div>
        <div class="slider-dots">
            ${currentImages.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}"></span>`).join('')}
        </div>
    `;

    container.innerHTML = `
        <h2>${langData.title}</h2>
        <p style="color: #64748b; margin-bottom: 20px;">${langData.desc}</p>
        <div class="steps-container">${stepsHtml}</div>
        ${sliderHtml}
        <p style="font-size: 0.8rem; color: #94a3b8; text-align: center;">${ui.clickExpand}</p>
    `;
}

// ฟังก์ชันสลับภาษา
function toggleLanguage() {
    // สลับค่าตัวแปร
    currentLang = currentLang === 'th' ? 'en' : 'th';
    
    // เปลี่ยนข้อความบนปุ่ม (ถ้าเป็น th ให้ปุ่มโชว์ EN เพื่อกดสลับ)
    document.getElementById('langToggleBtn').innerText = currentLang === 'th' ? 'EN' : 'TH';
    
    // อัปเดตข้อความ UI ส่วนนอก (Header, Menu, Footer)
    const ui = uiDict[currentLang];
    document.getElementById('ui-title').innerText = ui.title;
    document.getElementById('ui-subtitle').innerText = ui.subtitle;
    document.getElementById('ui-menu-car').innerText = ui.menuCar;
    document.getElementById('ui-menu-bike').innerText = ui.menuBike;
    document.getElementById('ui-menu-walk').innerText = ui.menuWalk;
    document.getElementById('ui-footer').innerHTML = ui.footer;

    // อัปเดตเนื้อหาตรงกลางใหม่ให้เป็นภาษาที่เลือก
    showContent(currentType, document.getElementById(`btn-${currentType}`));
}

// ฟังก์ชันควบคุมสไลด์และ Modal คงเดิม
function changeSlide(n) {
    currentSlideIndex += n;
    if (currentSlideIndex >= currentImages.length) { currentSlideIndex = 0; }
    if (currentSlideIndex < 0) { currentSlideIndex = currentImages.length - 1; }
    updateSliderUI();
}

function updateSliderUI() {
    const imgs = document.querySelectorAll('.slider-img');
    const dots = document.querySelectorAll('.dot');
    imgs.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if(imgs.length > 0) {
        imgs[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }
}

function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// เริ่มต้นทำงานเมื่อโหลดเว็บเสร็จ
window.onload = () => {
    showContent('car', document.getElementById('btn-car'));
};