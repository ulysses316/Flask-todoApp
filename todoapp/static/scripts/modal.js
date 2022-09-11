const closeModal = () => {
    let modal = document.querySelector('.modal');
    modal.style.display = "none";
}

const openModal = () =>{
    let modal = document.querySelector('.modal');
    modal.style.display = "flex";
}

let btnOpenModal = document.querySelector(".open-modal");
btnOpenModal.addEventListener('click', openModal)

let btnCloseModal = document.querySelector(".close-modal");
btnCloseModal.addEventListener('click', closeModal)

