let members = JSON.parse(localStorage.getItem("members")) || [];

function renderTable() {
    const tableBody = document.getElementById("memberTableBody");
    tableBody.innerHTML = "";
    members.forEach((member, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editMember(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">Xóa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addOrUpdateMember(event) {
    event.preventDefault();
    const name = document.getElementById("memberName").value;
    const email = document.getElementById("memberEmail").value;
    const role = document.getElementById("memberRole").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        members.push({ name, email, role });
    } else {
        members[editIndex] = { name, email, role };
    }

    localStorage.setItem("members", JSON.stringify(members));
    renderTable();
    document.getElementById("memberForm").reset();
    document.getElementById("editIndex").value = "";
    let modal = bootstrap.Modal.getInstance(document.getElementById("addMemberModal"));
    modal.hide();
}

function editMember(index) {
    document.getElementById("memberName").value = members[index].name;
    document.getElementById("memberEmail").value = members[index].email;
    document.getElementById("memberRole").value = members[index].role;
    document.getElementById("editIndex").value = index;
    let modal = new bootstrap.Modal(document.getElementById("addMemberModal"));
    modal.show();
}

function confirmDelete(index) {
    if (confirm("Bạn có chắc muốn xóa thành viên này không?")) {
        deleteMember(index);
    }
}

function deleteMember(index) {
    members.splice(index, 1);
    localStorage.setItem("members", JSON.stringify(members));
    renderTable();
}

function searchMember() {
    let keyword = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#memberTableBody tr");

    rows.forEach(row => {
        let name = row.cells[1].textContent.toLowerCase();
        let email = row.cells[2].textContent.toLowerCase();
        row.style.display = (name.includes(keyword) || email.includes(keyword)) ? "" : "none";
    });
}

document.getElementById("memberForm").addEventListener("submit", addOrUpdateMember);
renderTable();
