const container = document.querySelector(".pol-container");
const btnAdd = document.querySelector(".btn-add-dot");
const btnSave = document.querySelector(".btn-save");
const cusPolBg = document.querySelector(".cus-pol-bg");
const cusPol = document.querySelector(".cus-pol");
const bgPol = document.querySelector("#bgColor");
const polColor = document.querySelector("#polColor");
const dotLocation = document.querySelector(".dot-location");

let data = [{
        "col": 1,
        "row": 1,
        "polygon": "13% 16%, 12% 68%, 44% 80%, 82% 33%",
        "backgroundColor": "#fff",
        "polColor": "#000",
        "author": "Natswar"
    }, {
        "col": 2,
        "row": 2,
        "polygon": "16% 61%, 12% 68%, 44% 80%, 82% 33%",
        "backgroundColor": "#000",
        "polColor": "#fff",
        "author": "Natswar"
    // }, {
    //     "col": 100,
    //     "row": 1000,
    //     "polygon": "16% 61%, 12% 68%, 44% 80%, 82% 33%",
    //     "backgroundColor": "#000",
    //     "polColor": "#fff",
    //     "author": "Natswar"
}];
updatePol();
data.forEach(element => {
    const bgPol = document.createElement('div');
    const pol = document.createElement('div');

    pol.classList.add('w-h-100');
    pol.style.backgroundColor = element.polColor;
    pol.style.clipPath = `polygon(${element.polygon})`;

    bgPol.style.position = "absolute";
    bgPol.style.top = ((element.row - 1) * 100) + 'px';
    bgPol.style.left = ((element.col - 1) * 100) + 'px';
    bgPol.classList.add('w-h-100');
    bgPol.style.backgroundColor = element.backgroundColor;
    bgPol.appendChild(pol);

    container.appendChild(bgPol);
});
updatePol();
//gọi api
// axios.get("http://127.0.0.1/my-polygon").then((res) => {
//     data = res.data;
//     res.data.forEach(element => {
//         const bgPol = document.createElement('div');
//         const pol = document.createElement('div');

//         pol.classList.add('w-h-100');
//         pol.style.backgroundColor = element.polColor;
//         pol.style.clipPath = `polygon(${element.polygon})`;

//         bgPol.style.position = "absolute";
//         bgPol.style.top = ((element.row - 1) * 100) + 'px';
//         bgPol.style.left = ((element.col - 1) * 100) + 'px';
//         bgPol.classList.add('w-h-100');
//         bgPol.style.backgroundColor = element.backgroundColor;
//         bgPol.appendChild(pol);

//         container.appendChild(bgPol);
//     });
//     updatePol();
// });

//thêm nút chỉnh polygon
btnAdd.addEventListener('click', function () {
    dotLocation.innerHTML += `
    <div class="mt-1 my-4 d-flex justify-content-between">
    <div class="w-100 me-2">
        <label for="my-2 fw-bold"> Vertical</label>
        <input class="form-control" type="range" min="0" max="100" value="50"
            onchange="updatePol()">
        <label for="my-2 fw-bold"> Horizontal</label>
        <input class="form-control" type="range" min="0" max="100" value="0"
            onchange="updatePol()">
    </div>
    <button class="btn btn-red" onclick="removeDot(this)"><i class="fa-solid fa-x"></i></button>

</div>`;

    updatePol();
});

//xóa nút chỉnh polygon
function removeDot(dot) {
    dotLocation.removeChild(dot.parentNode.parentNode);
    updatePol();
}

//cập nhật polygon
function updatePol() {
    const arrDot = document.querySelectorAll(".mt-1");
    let tempArr = [];
    let dotArr = [];
    arrDot.forEach(element => {
        element.querySelectorAll("input").forEach((item) => { tempArr.push(item.value + "%") });
        dotArr.push(tempArr.join(" "));
        tempArr = [];
    });
    cusPolBg.style.backgroundColor = polColor.value;
    cusPol.style.backgroundColor = bgPol.value;
    cusPol.style.clipPath = `polygon(${dotArr.join(",")})`;
}

btnSave.addEventListener("click", function () {
    const bgPol = document.createElement('div');
    const pol = document.createElement('div');
    const col = document.querySelector("#col");
    const row = document.querySelector("#row");
    for (const item of data) {
        console.log(item.row == row, item.col == col);
        if (item.row == row.value && item.col == col.value) {
            alert("Đã tồn tại");
            return;
        }
    }
    pol.classList.add('w-h-100');
    pol.style.backgroundColor = cusPol.style.backgroundColor;
    pol.style.clipPath = cusPol.style.clipPath;

    bgPol.style.position = "absolute";
    bgPol.style.top = ((row.value - 1) * 100) + 'px';
    bgPol.style.left = ((col.value - 1) * 100) + 'px';
    bgPol.classList.add('w-h-100');
    bgPol.style.backgroundColor = cusPolBg.style.backgroundColor;
    bgPol.appendChild(pol);

    container.appendChild(bgPol);
    $('#myModal').modal('hide');
})








document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    toggleButton.addEventListener("click", function () {
        if (sidebar.style.width === "250px") {
            // Close the sidebar
            sidebar.style.width = "0";
            overlay.style.display = "none";
        } else {
            // Open the sidebar
            sidebar.style.width = "250px";
            overlay.style.display = "block";
        }
    });

    overlay.addEventListener("click", function () {
        // Close the sidebar when clicking on the overlay
        sidebar.style.width = "0";
        overlay.style.display = "none";
    });
});



const sidebar = document.getElementById("mySidebar");
const openButton = document.getElementById("openSidebar");
const overlay = document.getElementById("overlay");
const content = document.getElementById("myContent");

function openSidebar() {
    sidebar.style.right = "0";
    document.body.classList.add("sidebar-open"); // Thêm lớp để ẩn nút "Open Sidebar"
    overlay.style.display = "block"; // Hiển thị overlay khi sidebar mở
    sidebar.style.transition = "1s";
}

function closeSidebar() {
    sidebar.style.right = "-550px";
    document.body.classList.remove("sidebar-open"); // Loại bỏ lớp để hiện nút "Open Sidebar"
    overlay.style.display = "none"; // Ẩn overlay khi sidebar đóng
    sidebar.style.transition = "1s";
}

openButton.addEventListener("click", openSidebar);

// Lắng nghe sự kiện click trên overlay để đóng sidebar
overlay.addEventListener("click", closeSidebar);