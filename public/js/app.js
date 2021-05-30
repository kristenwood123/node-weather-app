const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = search.value;

  messageOne.textContent = 'Loading...'
  
    fetch(`/weather?address=${location}`)
    .then((res) => {
      res.json()
      .then((data) => {
        if(data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;

          let array = data.forecast;
          let temp = 70;
          let num;
            for(let i = 0; i < array.length; i++) {
              if(array.includes(i < temp)) {
                document.body.style.backgroundColor = 'pink'
              }
            }

        }
      })
    })

})