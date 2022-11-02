const students = [
  {
    id: 1,
    name: "Reyhan",
    NIM: "120140183",
  },
  {
    id: 2,
    name: "Rizky",
    NIM: "120140184",
  },
  {
    id: 3,
    name: "Andre",
    NIM: "120140189",
  },
];

const btnAdd = document.querySelector("#btn-add");
const btnOk = document.querySelector("#btn-ok");
const btnCancel = document.querySelector("#btn-cancel");
const btnOkEdit = document.querySelector("#btn-ok-edit");
const btnCancelEdit = document.querySelector("#btn-cancel-edit");
const modalContainer = document.querySelector(".modal-container");
const modalContainerEdit = document.querySelector(".modal-containerEdit");
const searchInput = document.querySelector("#search-input");

const studentList = document.querySelector(".student-list");

searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();

  const student = document.querySelectorAll(".student");

  student.forEach((student) => {
    if (student.textContent.toLowerCase().includes(searchValue)) {
      student.style.display = "flex";
      searchInput.style.border = "none";
    } else {
      student.style.display = "none";
      searchInput.style.border = "1px solid red";
    }
  });
});

btnAdd.addEventListener("click", function () {
  modalContainer.classList.add("show");

  btnOk.addEventListener("click", addStudent);
});

btnCancel.addEventListener("click", function () {
  document.querySelector("#name").value = "";
  document.querySelector("#NIM").value = "";

  modalContainer.classList.remove("show");
});

btnCancelEdit.addEventListener("click", function () {
  document.querySelector("#name-edit").value = "";
  document.querySelector("#NIM-edit").value = "";

  modalContainerEdit.classList.remove("show");
});

const addStudent = () => {
  if (
    document.querySelector("#name").value == "" ||
    document.querySelector("#NIM").value == ""
  ) {
    alert("Data tidak boleh kosong!");
  } else {
    const name = document.querySelector("#name").value;
    const NIM = document.querySelector("#NIM").value;
    const id = students.length + 1;

    students.push({
      id,
      name,
      NIM,
    });

    //   console.log(students);

    modalContainer.classList.remove("show");
    render();

    document.querySelector("#name").value = "";
    document.querySelector("#NIM").value = "";
  }
};

const render = () => {
  studentList.innerHTML = "";

  students.forEach((student, n) => {
    const div = document.createElement("div");
    div.classList.add("student");

    const p0 = document.createElement("p");
    p0.textContent = n + 1;

    const p1 = document.createElement("p");
    p1.textContent = student.name;

    const p2 = document.createElement("p");
    p2.textContent = student.NIM;

    const action = document.createElement("div");
    action.classList.add("action");

    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btn-edit");
    btnEdit.setAttribute("data-id", student.id);
    btnEdit.classList.add("btn-edit");

    const editIcon = document.createElement("i");
    editIcon.setAttribute("data-id", student.id);
    editIcon.classList.add("fa-solid", "fa-pen-to-square");

    btnEdit.appendChild(editIcon);

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", "btn-delete");
    btnDelete.setAttribute("data-id", student.id);
    btnDelete.classList.add("btn-delete");

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("data-id", student.id);
    deleteIcon.classList.add("fa-solid", "fa-trash");

    btnDelete.appendChild(deleteIcon);

    action.appendChild(btnEdit);
    action.appendChild(btnDelete);

    div.appendChild(p0);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(action);

    studentList.appendChild(div);
  });
};

const deleteStudent = (id) => {
  //   console.log(id);

  const newStudents = students.filter((student) => student.id != id);

  //   console.log(newStudents);

  students.splice(0, students.length, ...newStudents);
};

const editStudent = (id) => {
  const index = students.findIndex((student) => student.id == id);

  const name = document.querySelector("#name-edit").value;
  const NIM = document.querySelector("#NIM-edit").value;

  students[index].name = name;
  students[index].NIM = NIM;

  //   console.log(students);
};

studentList.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (
    e.target.classList.contains("fa-trash") ||
    e.target.classList.contains("btn-delete")
  ) {
    deleteStudent(id);
  } else if (
    e.target.classList.contains("fa-pen-to-square") ||
    e.target.classList.contains("btn-edit")
  ) {
    modalContainerEdit.classList.add("show");
    modalContainerEdit.setAttribute("data-id", id);

    const index = students.findIndex((student) => student.id == id);

    document.querySelector("#name-edit").value = students[index].name;
    document.querySelector("#NIM-edit").value = students[index].NIM;
  }

  render();
});

btnOkEdit.addEventListener("click", function () {
  const id = modalContainerEdit.dataset.id;
  editStudent(id);
  modalContainerEdit.classList.remove("show");

  document.querySelector("#name-edit").value = "";
  document.querySelector("#NIM-edit").value = "";

  render();
});

render();
