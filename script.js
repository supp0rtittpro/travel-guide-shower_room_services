let currentLang = 'th';
let currentCategory = 'car';
let slideIndex = 0;
let currentSliderImages = []; // เก็บรูปรวมของหมวดนั้นๆ ไว้ใช้กับ Modal
let currentModalImageIndex = 0; // เก็บตำแหน่งรูปปัจจุบันใน Modal

// ข้อมูล UI และคำแปลพื้นฐาน
const uiData = {
    th: {
        title: "การเดินทางมายังจุดบริการ",
        subtitle: "บริการห้องอาบน้ำ",
        btnCar: "รถยนต์",
        btnBike: "มอเตอร์ไซค์",
        btnWalk: "เดินเท้า",
        clickExpand: "คลิกรูปเพื่อขยาย"
    },
    en: {
        title: "Directions to Service Point",
        subtitle: "Shower Room Services",
        btnCar: "Car",
        btnBike: "Motorcycle",
        btnWalk: "Walk",
        clickExpand: "Click image to enlarge"
    }
};

// ข้อมูลการเดินทาง (ไม่มีขั้นตอนตัวเลขแล้ว เน้นคำอธิบายชัดเจน)
const travelData = {
    car: {
        // *** อย่าลืมเปลี่ยนชื่อไฟล์รูปให้ตรงกับที่มีในโฟลเดอร์ images ของคุณนะครับ ***
        images: ["images/step1.jpg", "images/step1.jpg"], 
        th: {
            title: "เดินทางด้วยรถยนต์ส่วนตัว",
            desc: "จอดรถที่ลานจอด <b>ชั้น 3</b> และติดต่อแสตมป์บัตรได้ที่ประชาสัมพันธ์ <b>ชั้น 1</b> <i>(สิทธิ์จอดฟรี 1 ชม. เฉพาะผู้ใช้บริการห้องอาบน้ำ)</i>"
        },
        en: {
            title: "By Private Car",
            desc: "Park on <b>Level 3</b> and validate your ticket at the <b>1st Floor Information Counter</b> <i>(1-hour free parking for shower service customers)</i>"
        }
    },
    bike: {
        images: ["images/step1.jpg", "images/step1.jpg"], 
        th: {
            title: "เดินทางด้วยรถมอเตอร์ไซค์",
            desc: "จอดรถที่จุดจอดรถจักรยานยนต์ <b>ประตู 3</b> และนำบัตรจอดรถมาติดต่อที่ <b>เคาน์เตอร์ประชาสัมพันธ์ ชั้น 1</b> <i>(รับสิทธิ์จอดฟรี 1 ชม.)</i>"
        },
        en: {
            title: "By Motorcycle",
            desc: "Park at <b>Gate 3</b> motorcycle parking area and visit the <b>Information Counter (1st Floor)</b> <i>(1-hour free parking)</i>"
        }
    },
    walk: {
        images: ["images/step1.jpg", "images/step1.jpg"], 
        th: {
            title: "เดินทางเท้า / รถสาธารณะ",
            desc: "เดินทางเข้าอาคารผ่าน <b>ทางเข้าหลัก</b> และติดต่อสอบถามจุดบริการได้ที่ <b>เคาน์เตอร์ประชาสัมพันธ์ ชั้น 1</b> <i>(เปิดให้บริการสำหรับลูกค้า Walk-in ทุกท่าน)</i>"
        },
        en: {
            title: "Walk-in / Public Transit",
            desc: "Enter through the <b>Main Entrance</b>. Visit the <b>Information Counter (1st Floor)</b> for directions. <i>(All Walk-in customers are welcome)</i>"
        }
    }
};

// เริ่มต้นการทำงานเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
    updateStaticUI();
    selectCategory('car'); // ค่าเริ่มต้นตอนเปิดมา

    // ปุ่มเปลี่ยนภาษา
    document.getElementById('langToggleBtn').addEventListener('click', () => {
        currentLang = currentLang === 'th' ? 'en' : 'th';
        document.getElementById('langToggleBtn').innerText = currentLang === 'th' ? 'EN' : 'TH';
        updateStaticUI();
        selectCategory(currentCategory);
    });
});

// อัปเดตข้อความทั่วไปตามภาษาที่เลือก
function updateStaticUI() {
    const ui = uiData[currentLang];
    document.getElementById('ui-title').innerText = ui.title;
    document.getElementById('ui-subtitle').innerText = ui.subtitle;
    document.getElementById('txt-car').innerText = ui.btnCar;
    document.getElementById('txt-bike').innerText = ui.btnBike;
    document.getElementById('txt-walk').innerText = ui.btnWalk;
}

// เลือกหมวดหมู่การเดินทาง
function selectCategory(category) {
    currentCategory = category;
    
    // เปลี่ยนสีปุ่มเมนู
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${category}`).classList.add('active');

    const data = travelData[category];
    const isEn = (currentLang === 'en');
    const langData = isEn ? data.en : data.th;
    const ui = uiData[currentLang];
    const container = document.getElementById('content-container');

    // อัปเดตตัวแปรรูปรวมของหมวดนี้
    currentSliderImages = data.images;

    // สร้างระบบสไลด์รูปภาพ
    let sliderHtml = '';
    if (data.images && data.images.length > 0) {
        const imagesHtml = data.images.map((img, index) => 
            `<img src="${img}" class="slider-img" onclick="openModal(${index})">`
        ).join('');
        
        let dotsHtml = '';
        if(data.images.length > 1){
            dotsHtml = `<div class="slider-dots">` + 
                       data.images.map((_, index) => `<span class="dot" onclick="currentSlide(${index})"></span>`).join('') +
                       `</div>`;
            
            sliderHtml = `
                <div class="slider-container">
                    ${imagesHtml}
                    <button class="slider-btn prev" onclick="changeSlide(-1)">&#10094;</button>
                    <button class="slider-btn next" onclick="changeSlide(1)">&#10095;</button>
                </div>
                ${dotsHtml}
            `;
        } else {
             sliderHtml = `
                <div class="slider-container">
                    ${imagesHtml}
                </div>
            `;
        }
    }

    // เอาเนื้อหาใส่ในหน้าเว็บ (เอา list steps ออกแล้ว)
    container.innerHTML = `
        <h2>${langData.title}</h2>
        <p style="color: #64748b; margin-bottom: 20px; line-height: 1.6;">${langData.desc}</p>
        ${sliderHtml}
        <p style="font-size: 0.8rem; color: #94a3b8; text-align: center; margin-top: 10px;">${ui.clickExpand}</p>
    `;

    slideIndex = 0;
    if (data.images && data.images.length > 0) {
        showSlide(slideIndex);
    }
}

// --------- ระบบสไลด์รูปภาพในหน้าปกติ ---------
function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("slider-img");
    const dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex].classList.add("active");
    if(dots.length > 0) {
        dots[slideIndex].classList.add("active");
    }
}

// --------- ระบบสไลด์รูประหว่างซูม (Modal) ---------
function openModal(index) {
    if (!currentSliderImages || currentSliderImages.length === 0) return;
    
    currentModalImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    
    modal.style.display = "block";
    modalImg.src = currentSliderImages[currentModalImageIndex];
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

function changeModalImage(direction) {
    currentModalImageIndex += direction;

    if (currentModalImageIndex < 0) {
        currentModalImageIndex = currentSliderImages.length - 1; // วนกลับไปรูปสุดท้าย
    } else if (currentModalImageIndex >= currentSliderImages.length) {
        currentModalImageIndex = 0; // วนกลับมารูปแรก
    }

    document.getElementById('img01').src = currentSliderImages[currentModalImageIndex];
}