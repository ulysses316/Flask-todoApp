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
    let modal = document.querySelector('.modal-update');
    modal.style.display = "flex";
    let cardID = e.path[2].getAttribute("cardNumber");
    let formAction = modal.childNodes[1].childNodes[3];
    formAction.action = `${cardID}/update`
}

let btnopenModalUpdate = document.querySelectorAll(".open-modal-update");
let allBtnOpenModalUpdate = [...btnopenModalUpdate];
allBtnOpenModalUpdate.map((btn)=>{
    btn.addEventListener('click', openModalUpdate);
})

let btncloseModalUpdate = document.querySelector(".close-modal-update");
btncloseModalUpdate.addEventListener('click', closeModalUpdate)