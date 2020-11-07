async function voegElementToe(e) {
    if (wijzigTaak === "J") {
        omschrijving = taakInput.value;
        wijzigTaakCall(id, done, omschrijving).then(() => verzamelTaken());
        wijzigTaak = "N";
        buttonAddTask.innerHTML = "Add task";
    } else {
        omschrijving = taakInput.value;
        regelsArr = Array.from(document.getElementsByClassName("regel"));
        taakToevoegbaar = "J";
        regelsArr.forEach(element => {
            childrenArr = Array.from(element.children);
            childrenArr.forEach(element => {
                if (element.classList.contains("taakOmschrijving") && (element.textContent.toUpperCase() === omschrijving.toUpperCase()) &&
                    (omschrijving !== "")) taakToevoegbaar = "N"
            })
        })

        if (taakToevoegbaar === "N") {
            alert("Deze taak staat al in de lijst en kan niet meer worden toegevoegd");
        } else {
            if (omschrijving === "")
                alert("Voor het toevoegen van een taak moet er wel wat zijn ingevuld");
            else voegElementToeCall().then(() => verzamelTaken());
        }
    }
    e.preventDefault();
    taakInput.value = "";
}

async function vinkItemAf(e) {
    parentElement = e.target.parentElement;
    childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("item_checked")) done = item.checked;
        if (item.classList.contains("id")) id = item.textContent;
        if (item.classList.contains("taakOmschrijving")) {
            if (done === true) item.classList.add("doorhalen")
            else {
                if (item.classList.contains("doorhalen"))
                    item.classList.remove("doorhalen");
            }
            omschrijving = item.textContent;
        }
    });
    wijzigTaakCall(id, done, omschrijving).then(() => verzamelTaken());
    e.preventDefault();
}


async function verwijderTaak(e) {
    parentElement = e.target.parentElement;
    let childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("id")) id = item.textContent;
    });
    verwijderTaakCall(id).then(() => verzamelTaken());
    e.preventDefault();
}

function vulRegel(omschrijving, id, done) {
    let regel = document.createElement("li");
    let taakCheckBox = document.createElement("input");
    taakCheckBox.setAttribute("type", "checkbox")
    taakCheckBox.setAttribute("name", "item_checked");
    taakCheckBox.checked = done;
    taakCheckBox.classList.add("item_checked");
    let p1 = document.createElement("p");
    p1.classList.add("taakOmschrijving");
    if (done === true) {
        p1.classList.add("doorhalen");
    }
    p1.innerHTML = omschrijving;
    let plaatje = document.createElement("img");
    plaatje.setAttribute("src", "prullenbak.png");
    plaatje.setAttribute("width", "50px");
    plaatje.setAttribute("alt", "plaatje");
    plaatje.classList.add("plaatje");
    p2 = document.createElement("p");
    p2.innerHTML = id;
    p2.classList.add("id");
    regel.appendChild(taakCheckBox);
    regel.appendChild(p1);
    regel.appendChild(plaatje);
    regel.appendChild(p2);
    regel.classList.add("regel");
    lijstje.appendChild(regel);
}

function veranderRegel(e) {
    wijzigTaak = 'J';
    parentElement = e.target.parentElement;
    childrenArr = Array.from(parentElement.children);
    childrenArr.forEach(item => {
        if (item.classList.contains("item_checked")) done = item.checked;
        if (item.classList.contains("id")) id = item.textContent;
        if (item.classList.contains("taakOmschrijving")) {
            if (done === true) {
                alert("Deze taak is al uitgevoerd en kan dus niet meer worden gewijzigd");
                wijzigTaak = "N";
            } else {
                buttonAddTask.innerHTML = "Change task";
                taakInput.value = item.textContent;
            }
        }
    })
}

function vulTaken(result) {
    lijstje.innerHTML = "";
    result.forEach(item => {
        vulRegel(item.omschrijving, item._id, item.done);
    })
    omschrijvingen = Array.from(document.getElementsByClassName("taakOmschrijving"));
    let checkItemsArr = Array.from(document.getElementsByClassName("item_checked"));
    verwijderButtonsArr = Array.from(document.getElementsByClassName("plaatje"));
    verwijderButtonsArr.forEach(element => element.addEventListener("click", verwijderTaak));
    checkItemsArr.forEach(element => element.addEventListener("change", vinkItemAf));
    omschrijvingen.forEach(element => element.addEventListener("click", veranderRegel));
    taak.value = "";
}

async function verzamelTaken() {
    verzamelTakenCall().then((result) => vulTaken(result))
}


let buttonAddTask = document.getElementById("addTask");
let basisUrl = "https://jsonbox.io/box_b5948abed8db0fcadf71";
let taak = document.getElementById('taakInput');
let done = false;
let str = "";
let p2 = "";
let parentElement = "";
let childrenArr = [];
let regelsArr = [];
let wijzigTaak = "N";
let taakToevoegbaar = "J";
let omschrijvingen = [];
buttonAddTask.addEventListener("click", voegElementToe)
let method = {};
let lijstje = document.getElementById("takenLijst");

verzamelTaken();