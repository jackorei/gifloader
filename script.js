const generate = document.querySelector('#generate')
const remove = document.querySelector('#remove')
const gifsearch = document.querySelector('#gifsearch')
const error = document.querySelector('#searcherror')
const giftext = document.querySelector('#giftext')

remove.disabled = true

gifsearch.addEventListener('input', () => {
  error.textContent = ''
})

generate.addEventListener('click', () => {
  if (gifsearch.value === '') {
    error.textContent = 'Enter a search!'
  }
  else {
    giftext.style.display = 'none'
    gifsearch.disabled = true
    remove.disabled = false

    const search = gifsearch.value
    const img = document.createElement('img')
    img.classList.add('gif')
    const gifcontainer = document.querySelector('.gifcontainer')
    gifcontainer.appendChild(img)
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=QyscNsnRFMb27o0WrnCDqoZQ3erDzn2J&s=${search}`, {mode: 'cors'})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        if (!response.data || !response.data.images) {
          console.log(`Did not find a GIF! URL: ${response.data.images.original.url}`)
          error.textContent = 'No GIF found for that search.'
          img.remove()
          gifsearch.disabled = false
          generate.disabled = false
          remove.disabled = true
          return
        }
        console.log(`Found GIF! URL: ${response.data.images.original.url}`)
        img.src = response.data.images.original.url
      })
    }
})

remove.addEventListener('click', () => {
  giftext.style.display = 'block'
  gifsearch.disabled = false
  gifsearch.value = ''
  remove.disabled = true
  const img = document.querySelector('.gif')
  img.remove()
})