const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msgOne = document.querySelector("#msg1")
const msgTwo = document.querySelector("#msg2")
const msgThree = document.querySelector("#msg3")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    msgOne.textContent = "Loading..."
    msgTwo.textContent = ""
    msgThree.textContent = ""

    fetch("http://localhost:3000/weather?address="+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error
        }else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.disc
            msgThree.textContent = data.temp +", "+ data.feel
        }
    })
})
})