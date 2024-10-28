const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTg2NTc3YjkzMjA4NDA3NjlkYmNhM2RlNTY5YTY0OSIsIm5iZiI6MTczMDA3NjA0Mi44Njc2NTMsInN1YiI6IjY3MWIwNjNiZmVmZDFlMDUxMDAwMDhkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s73jyPprDmzztqNPKC6QjIudkNAdWJ_2Veqgdd4CcIE',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'
const getPlayingTv = async (url) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results
      const container = document.querySelector('main .sub_container')
      let rowsHtml = ''

      console.log(data)

      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row tv_row">'

         for (let j = 0; j < 1; j++) {
            const index = i + j
            if (index >= results.length) break

            const tv = results[index]

            console.log(tv.original_language)
            rowHtml += `
                        <div class="sub_card ">
                            <div class="card">
                                <a href="./sub_detail.html?tv_id=${tv.id}">
                                    <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.name}" />
                                </a>
                                <div class="card-body">
                                    <p class="card-text title">${tv.name}</p>
                                    <p class="card-text average">평점: ${tv.vote_average.toFixed(1)}점</p>
                                    <p class="card-text txt">${tv.overview}</p>
                                </div>
                            </div>
                        </div>
                        `
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {}
}
getPlayingTv(url)

// fetch('https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1', options)
//    .then((res) => res.json())
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err))
