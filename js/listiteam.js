let listProduct = [];
function displayProducts() {
    let tbody = document.getElementById('container-product');
    tbody.innerHTML = '';
    for (let i = 0; i < listProduct.length; i++) {
        let skins = listProduct[i];
        let row = '<tr>';
        row += '<th class = "maSkin">' + skins.ma + '</th>';
        row += '<td class = "tenSkin">' + skins.ten + '</td>';
        row += '<td class = "hinhAnh">' + skins.anh + '</td>';
        row += '<td class = "soLuong">' + skins.soluong + '</td>';
        row += '<td class = "thaoTac">' + '<button onclick="editSkin(' + i + ')">Sửa</button> ' +
            '<button onclick="deleteSkin(' + i + ')">Xóa</button>' + '</td>';
        row += '</tr>';
        tbody.innerHTML += row;
    }
}
function saveToLocalStorage(){
    localStorage.setItem('skin', JSON.stringify(listProduct));
}
function loadFromLocalStorage(){
    let data = localStorage.getItem('skin');
    if(data){
        listProduct = JSON.parse(data);
        displayProducts();
    }
}
function addSkins(event){
    event.preventDefault();
    let ma = document.getElementById("maSkin").value.trim();
    let ten = document.getElementById("tenSkin").value.trim();
    let soLuong = document.getElementById("soLuong").value.trim();
    let fileInput = document.getElementById("fileInput");
    let file = fileInput.files[0];
    if (!ma || !ten || !soLuong || !file) {
        alert("Vui lòng nhập đầy đủ thông tin và chọn hình ảnh.");
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        let anh = `<img src="${e.target.result}">`;

        let skins = {
            ma,
            ten,
            anh,
            soluong: soLuong
        };

        listProduct.push(skins);
        saveToLocalStorage();
        displayProducts();
        document.getElementById("maSkin").value = '';
        document.getElementById("tenSkin").value = '';
        document.getElementById("soLuong").value = '';
        document.getElementById("fileInput").value = '';
    };
    reader.readAsDataURL(file);
}
function deleteSkin(index) {
    if (confirm("Bạn có chắc muốn xóa Skin này không?")) {
        listProduct.splice(index, 1);
        saveToLocalStorage();
        displayProducts();
    }
}
function editSkin(index) {
    let skins = listProduct[index];
    document.getElementById("maSkin").value = skins.ma;
    document.getElementById("tenSkin").value = skins.ten;
    document.getElementById("soLuong").value = skins.soluong;
    listProduct.splice(index, 1);
    saveToLocalStorage();
    displayProducts();
}
window.onload = function() {
    loadFromLocalStorage();
};
