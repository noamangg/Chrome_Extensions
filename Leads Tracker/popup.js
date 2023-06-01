

let containerBox = document.createElement("div");
containerBox.className = "container-box";
let inputFiled = document.createElement("input");
inputFiled.type = "text";
inputFiled.placeholder = "Enter The URL";
inputFiled.className = "input-filed";
let buttonsBox = document.createElement("div");
buttonsBox.className = "buttons-box";
let sessionBtn = document.createElement("button");
sessionBtn.className = "session-btn";
sessionBtn.textContent = "Add Session"
let inputBtn = document.createElement("button");
inputBtn.textContent = "Add Input";
inputBtn.className = "input-btn";
buttonsBox.appendChild(inputBtn);
buttonsBox.appendChild(sessionBtn);
let linksList = document.createElement("ul");
let h1 = document.createElement("h1");
h1.textContent = "Saved URLs:";
containerBox.appendChild(inputFiled);
containerBox.appendChild(buttonsBox);
containerBox.appendChild(h1);
containerBox.appendChild(linksList);
linksList.className = "link-list";
document.body.appendChild(containerBox);
checkLocal();
renderList();


inputFiled.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        if (inputFiled.value) {
            insertArr(inputFiled.value);
            addLink(inputFiled.value);
            inputFiled.value = "";
        }
    }
});

linksList.onclick = function (e) {
    if (e.target.tagName.toLowerCase() === "img") {
        let a = ((e.target.parentElement).parentElement).querySelector("a");
        removeLink(a.textContent);
        (e.target.parentElement).parentElement.remove();
    }

}

inputBtn.addEventListener("click", function (e) {
    insertArr(inputFiled.value);
    addLink(inputFiled.value);
    inputFiled.value = "";
})

sessionBtn.addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        insertArr(tabs[0].url);
        addLink(tabs[0].url);
    });

})


function checkLocal() {
    if (!localStorage.linksList)
        localStorage.linksList = "[]";
}
function getLocal() {
    return JSON.parse(localStorage.linksList);
}
function updateLocal(links) {
    localStorage.linksList = JSON.stringify(links);
}
function insertArr(value) {
    let linksArr = getLocal();
    linksArr.push(value);
    // Update Local Storage
    localStorage.linksList = JSON.stringify(linksArr);
}
function renderList() {
    let data = JSON.parse(localStorage.linksList);
    for (let i = 0; i < data.length; i++) {
        addLink(data[i]);
    }
}
function addLink(link) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = link;
    a.textContent = link;
    a.target = "_blank";
    let button = document.createElement("button");

    let img = document.createElement("img");
    img.src = "icons8-trash-400.png";
    img.alt = "trash";
    button.appendChild(img);
    li.appendChild(a);
    li.appendChild(button);
    linksList.prepend(li);
}
function removeLink(link) {
    let links = getLocal();
    links = links.filter((e) => e !== link);
    let lis = linksList.querySelectorAll("li");
    lis.forEach((li) => li.remove());
    updateLocal(links);
    renderList();
}
