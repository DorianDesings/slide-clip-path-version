const slide = document.getElementById('slide')
const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg','6.jpg']

addEventListener('load', () => {
    const fragment = document.createDocumentFragment()
    for (const image of images) {
        //CODIGO NUEVO
        const div = document.createElement('DIV')
        div.style.backgroundImage = `url(./assets/img/${image})`
        div.classList.add('slide__img')
         //FIN CODIGO NUEVO
        

        div.addEventListener('animationstart', (e) => {
            e.target.style.zIndex = 2
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.zIndex = 1
            } else {
                slide.firstElementChild.style.zIndex = 1
            }
        })

        div.addEventListener('animationend', (e) => {
             //CODIGO NUEVO
            e.target.style.zIndex = 0
             //FIN CODIGO NUEVO
            e.target.classList.remove('slide__img--animate')
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.classList.add('slide__img--animate')
            } else {
                slide.firstElementChild.classList.add('slide__img--animate')
            }
        })

        fragment.appendChild(div)
    }

    slide.appendChild(fragment)

    slide.firstElementChild.classList.add('slide__img--animate')

})