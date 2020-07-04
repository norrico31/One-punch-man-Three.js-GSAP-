document.addEventListener('DOMContentLoaded', () => {
    new Glide(".glide", {
        type: "carousel",
        startAt: 0,
        animationTimingFunc: "ease-in-out",
        gap: 100,
        perView: 3
    }).mount()

    let prevbtn = document.getElementById('prev')
    let nextBtn = document.getElementById('next')
    let background = document.querySelector('.background')
    let indices = document.querySelectorAll('.index')
    let bgImgs = ["saitama2.jpg", "genos2.jpg", "silverfang.jpg", "tatsumaki.jpg"]
    let currentIndex = 0

    indices.forEach(index => index.classList.remove('active'))
    indices[currentIndex].classList.add('active')

    let myAnimation = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        // imagesRatio: 1080/ 1920,
        image1: `./img/hq/${bgImgs[0]}`,
        image2: `./img/hq/${bgImgs[1]}`,
        displacementImage: "./img/4.png",
        hover: false
    })

    var myAnimation2 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        // imagesRatio: 1080/ 1920,
        image1: `./img/hq/${bgImgs[1]}`,
        image2: `./img/hq/${bgImgs[2]}`,
        displacementImage: "./img/4.png",
        hover: false
    })

    var myAnimation3 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        // imagesRatio: 1080/ 1920,
        image1: `./img/hq/${bgImgs[2]}`,
        image2: `./img/hq/${bgImgs[3]}`,
        displacementImage: "./img/4.png",
        hover: false
    })

    var myAnimation4 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        // imagesRatio: 1080/ 1920,
        image1: `./img/hq/${bgImgs[3]}`,
        image2: `./img/hq/${bgImgs[0]}`,
        displacementImage: "./img/4.png",
        hover: false
    })

    let distortAnimations = [
        myAnimation,
        myAnimation2,
        myAnimation3,
        myAnimation4,
    ]
    
    function startNextDistortAnimation() {
        let prevIndex = currentIndex
        currentIndex = (currentIndex + 1) % 4

        indices.forEach(index => index.classList.remove('active'))
        indices[currentIndex].classList.add('active')
        distortAnimations[prevIndex].next()

        showTextAnimation("next")

        setTimeout(() => {
            let canvas = background.querySelectorAll("canvas")
            background.appendChild(canvas[0])
            distortAnimations[prevIndex].previous()
        }, 1200)
    }

    function startPrevDistortionAnimation() {
        currentIndex = currentIndex - 1 < 0 ? 3 : currentIndex -1
        indices.forEach(index => index.classList.remove('active'))
        indices[currentIndex].classList.add('active')
        distortAnimations[currentIndex].next()

        showTextAnimation("prev")

        setTimeout(() => {
            let canvas = background.querySelectorAll('canvas')
            background.insertBefore(canvas[canvas.length - 1], background.firstChild)
            distortAnimations[currentIndex].previous()
        }, 500)
    }

    nextBtn.addEventListener('click', () => {
        startNextDistortAnimation()
    })

    prevbtn.addEventListener('click', () => {
        startPrevDistortionAnimation()
    })

    let titleDisplacement = 0
    let descriptionDisplacement = 0

    function showTextAnimation(direction) {
        if (titleDisplacement === 0 && direction === "prev") {
            titleDisplacement -= 615
        } else if (titleDisplacement === -615 && direction === "next") {
            titleDisplacement = 0
        } else {
            titleDisplacement = direction === "next" ? titleDisplacement - 205 : titleDisplacement + 205
        }

        if (descriptionDisplacement === 0 && direction === "prev") {
            descriptionDisplacement -= 180
        } else if (descriptionDisplacement === -180 && direction === "next") {
            descriptionDisplacement = 0
        } else {
            descriptionDisplacement = direction === "next" ? descriptionDisplacement - 60 : descriptionDisplacement + 60
        }

        let title = document.querySelectorAll('#title h4')
        title.forEach(data => {
            TweenMax.to(data, 1, {
                top: `${titleDisplacement}px`,
                ease: Strong.easeInOut
            })
        })
        
        let description = document.querySelectorAll('#description p')
        description.forEach((desc, index) => {
            let opacity = 0
            if (index === currentIndex) {
                opacity = 1
            } else {
                opacity = 0
            }

            TweenMax.to(desc, 1, {
                top: `${descriptionDisplacement}px`,
                ease: Strong.easeInOut,
                opacity: opacity
            })
        })
    }
})