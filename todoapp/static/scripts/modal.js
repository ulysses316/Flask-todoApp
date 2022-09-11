const closeModalCreate = () => {
    let modal = document.querySelector('.modal-create');
    modal.style.display = "none";
}

const openModalCreate = () =>{
    let modal = document.querySelector('.modal-create');
    modal.style.display = "flex";
}

let btnopenModalCreate = document.querySelector(".open-modal-create");
btnopenModalCreate.addEventListener('click', openModalCreate)

let btncloseModalCreate = document.querySelector(".close-modal-create");
btncloseModalCreate.addEventListener('click', closeModalCreate)


// UPDATE MODAL

const closeModalUpdate = () => {
    let modal = document.querySelector('.modal-update');
    modal.style.display = "none";
}

const openModalUpdate = (e) =>{
    // Note info
    let cardID = e.path[2].getAttribute("cardNumber");
    let cardTitle = e.path[2].childNodes[1].childNodes[1].innerText;
    let cardBody = e.path[2].childNodes[1].childNodes[3].innerText;
    // Modal info
    let modal = document.querySelector('.modal-update');
    let formAction = modal.childNodes[1].childNodes[3];
    let formTitle = modal.childNodes[1].childNodes[3].childNodes[3];
    let formBody = modal.childNodes[1].childNodes[3].childNodes[7];
    
    formAction.action = `${cardID}/update`;
    formTitle.value = cardTitle;
    formBody.innerText = cardBody;
    
    modal.style.display = "flex";
}

let btnopenModalUpdate = document.querySelectorAll(".open-modal-update");
let allBtnOpenModalUpdate = [...btnopenModalUpdate];
allBtnOpenModalUpdate.map((btn)=>{
    btn.addEventListener('click', openModalUpdate);
})

let btncloseModalUpdate = document.querySelector(".close-modal-update");
btncloseModalUpdate.addEventListener('click', closeModalUpdate)