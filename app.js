document.addEventListener('DOMContentLoaded', () => {
    //card options
    const bulbasaur = {
        name: 'bul',
        img: './images/bullbasaur.png'
    }
    const charmander = {
        name: 'char',
        img: './images/charmander.png'
    }
    const eevee = {
        name: 'eev',
        img: './images/eevee.png'
    }
    const jigglypuff = {
        name: 'jig',
        img: './images/jigglypuff.png'
    }
    const pikachu = {
        name: 'pik',
        img: './images/pikachu-2.png'
    }
    const rattata = {
        name: 'rat',
        img: './images/rattata.png'
    }
    const squirtle = {
        name: 'squi',
        img: './images/squirtle.png'
    }
    const zubat = {
        name: 'zub',
        img: './images/zubat.png'
    }

    let cardArray = [bulbasaur, charmander, eevee, jigglypuff, pikachu, rattata, squirtle, zubat, bulbasaur, charmander, eevee, jigglypuff, pikachu, rattata, squirtle, zubat]

    let display = "show"
    
    document.getElementById('easy').addEventListener('click', changeLevel);
    

    function sortCards() {
        cardArray.sort(() => 0.5 - Math.random())
    }

    sortCards()

    const grid = document.querySelector('.grid')
    const grod = document.querySelector('.grod')
    const resultDisplay = document.querySelector('#result')


    let cardsChosen = []
    let cardsChosenId = []
    const cardsWon = []

    //tiempo
    let timer = 0;
    setInterval(() => {
        timer++;
        document.querySelector('#timer').textContent = timer;
    }, 1000)


    //contador
    var counter = 0;
    document.querySelector('#counter').textContent = counter;

    // Crear tablero
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', './images/superball.png')
            card.setAttribute('data-id', i)
            card.classList.add('mystyle')
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }
    createBoard()

    function changeLevel() {
        
        if (display === "show") {
            cardArray = [bulbasaur, charmander, eevee, jigglypuff, pikachu, rattata, squirtle, zubat];
            sortCards()
            grod.innerHTML = ""
            resultDisplay
            for (let i = 0; i < cardArray.length; i++) {
                let card = document.createElement('img')
                card.setAttribute('src', './images/superball.png')
                card.setAttribute('data-id', i)
                card.classList.add('big')
                card.addEventListener('click', flipCard)
                grod.appendChild(card)
            }
            grid.style.display = "none";
            grod.style.display = "block"
        display = "none"  
        } else {
            grod.style.display = "none"
            grid.innerHTML = ""
            grid.style.display = "block"

            display = "show"
            cardArray = [bulbasaur, charmander, eevee, jigglypuff, pikachu, rattata, squirtle, zubat, bulbasaur, charmander, eevee, jigglypuff, pikachu, rattata, squirtle, zubat]
            sortCards()
            createBoard()
        }
        
    }

    
    //check for matches
    function checkForMatch() {

        let cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]

        const optionTwoId = cardsChosenId[1]


        if (optionOneId == optionTwoId) {
            let img1 = cards[optionOneId].setAttribute('src', './images/ultra-ball.png')
            let img2 = cards[optionTwoId].setAttribute('src', './images/ultra-ball.png')
            img1.classList.add('mystyle')
            img2.classList.add('mystyle')
            alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', './images/pokeball.png')
            cards[optionTwoId].setAttribute('src', './images/pokeball.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cards[optionOneId].classList.add('mystyle')
            cards[optionTwoId].classList.add('mystyle')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', './images/ultra-ball.png')
            cards[optionTwoId].setAttribute('src', './images/ultra-ball.png')
            cards[optionOneId].classList.add('mystyle')
            cards[optionTwoId].classList.add('mystyle')
            // Swal.fire({
            //     title: '¡oh no!',
            //     text: 'Inténtalo otra vez',
            //     icon: 'error',
            //     confirmButtonText: '¡Voy!'
            //   })
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            Swal.fire({
                title: '¡Enhorabuena!',
                text: 'Lo has conseguido',
                icon: 'success',
                confirmButtonText: '¡Bien!'
            }).then(() => {
                 window.location.reload();
            })
           
        }
    }

    //flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        counter++;
        document.querySelector('#counter').textContent = counter;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }

    }



})





