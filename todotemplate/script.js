function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const clickDelete = (id) => {
    let myList = JSON.parse(localStorage.getItem("myList"));
    const found = myList.find((element) => element?.id === id);
    const index = myList?.indexOf(found);
    if(index > -1){
        myList?.splice(index, 1);
    }
    loadContent(myList);
    localStorage.setItem("myList", JSON.stringify(myList));
};

const clickEdit = (id) => {

}

const clickCheckBox = (id) => {
    const value = document.getElementById(`${id}-checkbox`).checked;
    let myList = JSON.parse(localStorage.getItem("myList"));
    const found = myList.find((element) => element?.id === id);
    const index = myList?.indexOf(found);
    myList[index].checked = value;
    loadContent(myList);
    localStorage.setItem("myList", JSON.stringify(myList));
}

function loadContent(myList) {
  document.getElementById("box-item").innerHTML = "";
  myList?.map((item) => {
    const htmlString = `
        <div class="box-item" id="${item?.id}">
            <input type="checkbox" id="${
              item?.id + "-checkbox"
            }" style="height: 30px; width: 30px" ${
      item?.checked ? "checked" : ""
    } onclick="clickCheckBox('${item?.id}')"/>
            <span class="text-content" id="${item?.id + "-content"}">${
      item?.content
    }</span>
            <div class="action">
                <div style="display: flex; justify-content: end">
                    <button type="button" style="outline: none; border: none" id="${
                      item?.id + "-edit"
                    }">
                    <i
                        class="fas fa-edit"
                        style="color: #3f78d9; font-size: 25px"
                    ></i>
                    </button>
                    <button
                    type="button"
                    style="outline: none; border: none; margin-left: 5px"
                    id="${item?.id + "-delete"}"
                    onclick="clickDelete('${item?.id}')"
                    >
                    <i
                        class="fas fa-trash-alt"
                        style="color: #cd3c32; font-size: 25px"
                    ></i>
                    </button>
                </div>
                <div style="margin-top: 10px">
                    ${
                      item?.dateAdd === ""
                        ? ""
                        : `<i
                        class="fas fa-info-circle"
                        style="color: #677389; font-size: 20px"
                        ></i>
                        <span style="color: #677389; font-size: 20px"
                        >${item?.dateAdd}</span>`
                    }
                </div>
            </div>
        </div>`;
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    document.getElementById("box-item").appendChild(template.content);
  });
}

window.onload = function () {
  // const todoList = [
  //   {
  //     id: makeid(16),
  //     content: "Buy groceries for next week",
  //     checked: true,
  //     dateAdd: '2023-10-11',
  //   },
  //   {
  //     id: makeid(16),
  //     content: "Renew car insurance",
  //     checked: false,
  //     dateAdd: '2023-10-11',
  //   },
  //   {
  //     id: makeid(16),
  //     content: "Sign up for online course",
  //     checked: false,
  //     dateAdd: '2023-10-11',
  //   },
  // ];

  // localStorage.setItem("myList", JSON.stringify(todoList))

  const myList = JSON.parse(localStorage.getItem("myList"));
  loadContent(myList);
};

const addItem = (e) => {
  e.preventDefault();
  let content = document.getElementById("content-add").value;
  let date = document.getElementById("date-add").value;
  const list = JSON.parse(localStorage.getItem("myList"));
  const myList = list ? list : [];
  const newItem = {
    id: makeid(16),
    content,
    checked: false,
    dateAdd: date,
  };
  myList.push(newItem);
  loadContent(myList);
  localStorage.setItem("myList", JSON.stringify(myList));
};

document.getElementById("btn-add").onclick = addItem;
