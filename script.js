const travelData = {
    car: {
        title: "เดินทางด้วยรถยนต์ส่วนตัว",
        desc: "ใช้เส้นทางถนนหลักเพื่อเลี่ยงทางแคบ มีที่จอดรถรองรับ 20 คัน",
        steps: [
            "1. เข้าจากถนน [ชื่อถนน] มุ่งหน้าสี่แยก",
            "2. เลี้ยวซ้ายเข้าซอย 5 (สังเกตตึกสีฟ้า)",
            "3. ตรงเข้าสุดซอย ที่จอดรถอยู่ซ้ายมือ"
        ],
        image: "images/stap1.jpg", // เปลี่ยนเป็นลิงก์รูปจริงของคุณ
        map: "https://goo.gl/maps/xxxx"
    },
    bike: {
        title: "เดินทางด้วยรถมอเตอร์ไซค์",
        desc: "สามารถเข้าทางลัดซอยข้างวัดได้ รถไม่ติด",
        steps: [
            "1. เข้าซอยลัด [ชื่อซอย]",
            "2. จุดจอดรถอยู่หน้าทางเข้าอาคาร Zone A"
        ],
        image: "https://via.placeholder.com/600x400?text=Bike+Parking", 
        map: "https://goo.gl/maps/xxxx"
    },
    walk: {
        title: "เดินทางเท้า / รถสาธารณะ",
        desc: "เดินจากสถานี BTS เพียง 5 นาที",
        steps: [
            "1. ลง BTS สถานี [ชื่อสถานี] ทางออก 2",
            "2. เดินมุ่งหน้ามาทางตึก G",
            "3. เลี้ยวขวาเข้าทางเชื่อมชั้น 2"
        ],
        image: "https://via.placeholder.com/600x400?text=Walking+Route",
        map: "https://goo.gl/maps/xxxx"
    }
};

function showContent(type, btn) {
    // 1. เปลี่ยนสถานะปุ่ม
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. ดึงข้อมูลมาแสดง
    const data = travelData[type];
    const container = document.getElementById('content-body');
    
    let stepsHtml = data.steps.map(s => `<p class="route-step">${s}</p>`).join('');

    container.innerHTML = `
        <h2>${data.title}</h2>
        <p style="color: #64748b; margin-bottom: 20px;">${data.desc}</p>
        <div class="steps-container">${stepsHtml}</div>
        <img src="${data.image}" class="img-thumbnail" onclick="openModal('${data.image}', '${data.title}')">
        <p style="font-size: 0.8rem; color: #94a3b8; text-align: center;">(คลิกที่รูปเพื่อขยาย)</p>
        <a href="${data.map}" class="btn-maps" target="_blank"><i class="fa-solid fa-location-arrow"></i> เริ่มนำทาง</a>
    `;
}

// ระบบ Modal รูปภาพ
function openModal(src, title) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = title;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// แสดงหน้า 'รถยนต์' เป็นค่าเริ่มต้นเมื่อโหลดหน้าเว็บ
window.onload = () => {
    showContent('car', document.querySelector('.menu-btn'));
};
