const card = document.querySelector(".card_inner");

/*Esperando a que de click*/
card.addEventListener("click", function(e){
    /*Ejecuta*/
    card.classList.toggle('is-flipped');
});