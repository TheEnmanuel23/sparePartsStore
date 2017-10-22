const  PreLoading = (ctx, next) => {
  let loading = `
  <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`

  let content = document.querySelector('#content')
  content.innerHTML = loading
  next()
}

export default PreLoading