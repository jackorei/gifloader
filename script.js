const generate = document.querySelector('#generate')
const remove = document.querySelector('#remove')
const gifsearch = document.querySelector('#gifsearch')
const error = document.querySelector('#searcherror')
const giftext = document.querySelector('#giftext')
const spinner = document.querySelector('#spinner')

remove.disabled = true

gifsearch.addEventListener('input', () => {
  error.textContent = ''
})

gifsearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    generate.click();
  }
});

generate.addEventListener('click', () => {
  if (gifsearch.value === '') {
    error.textContent = 'Enter a search!'
  }
  else {
    generate.disabled = true
    spinner.style.display = 'block'
    giftext.style.display = 'none'

    const search = gifsearch.value
    const gifcontainer = document.querySelector('.gifcontainer')
    const existingGif = gifcontainer.querySelector('.gif')
    if (existingGif) existingGif.remove()

    const img = document.createElement('img')
    img.classList.add('gif')
    gifcontainer.appendChild(img)
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=QyscNsnRFMb27o0WrnCDqoZQ3erDzn2J&s=${search}`, {mode: 'cors'})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        if (!response.data || !response.data.images || !response.data.images.original) {
          spinner.style.display = ''
          error.textContent = 'No GIF found for that search!'
          img.remove()
          giftext.style.display = 'block'
          gifsearch.disabled = false
          generate.disabled = false
          remove.disabled = true
          return
        }
        generate.disabled = false
        remove.disabled = false
        spinner.style.display = ''
        console.log(`Found GIF! URL: ${response.data.images.original.url}`)
        img.src = response.data.images.original.url
        document.querySelector('#download').style.display = 'flex';
        document.querySelector('#download').dataset.gifUrl = response.data.images.original.url;
      })
    }
})

remove.addEventListener('click', () => {
  downloadBtn.style.display = ''
  giftext.style.display = 'block'
  gifsearch.value = ''
  remove.disabled = true
  const img = document.querySelector('.gif')
  img.remove()
})

const downloadBtn = document.querySelector('#download');

downloadBtn.addEventListener('click', () => {
  const gifUrl = downloadBtn.dataset.gifUrl;

  fetch(gifUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'iloveyou.gif'; // you could make this dynamic later
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error('Download failed:', err);
    });
});