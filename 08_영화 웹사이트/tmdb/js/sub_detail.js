const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTg2NTc3YjkzMjA4NDA3NjlkYmNhM2RlNTY5YTY0OSIsIm5iZiI6MTczMDA3NjA0Mi44Njc2NTMsInN1YiI6IjY3MWIwNjNiZmVmZDFlMDUxMDAwMDhkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s73jyPprDmzztqNPKC6QjIudkNAdWJ_2Veqgdd4CcIE',
   },
}
const urlParams = new URLSearchParams(window.location.search)

const tvId = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`

const subContainer = document.querySelector('main .sub_container_detail')

const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()

      console.log('tv data ====>', data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      let langs = (data) => {
         let langsTxt = ''
         if (data.original_language === 'en') {
            return '영어'
         } else if (data.original_language === 'de') {
            return '독일어'
         } else if (data.original_language === 'es') {
            return '스페인어'
         } else if (data.original_language === 'ar') {
            return '아르헨티나'
         } else if (data.original_language === 'fr') {
            return '프랑스어'
         } else if (data.original_language === 'nl') {
            return '네델란드어'
         }
      }
      const rowHtml = `<div class="row">
                            <div class="col-sm-3" style="text-align: center">
                                <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width: 100%" />
                            </div>
                            <div class="col-sm-9">
                                <h2>${data.name} (${data.first_air_date.substring(0, 4)})</h2>
                                <br />
                                <ul class="movie-info">
                                    <li>원제 ${data.original_name}, ${langs(data)}</li>
                                    <li>평점 ${data.vote_average.toFixed(1)}점</li>
                                    <li>최근방영일 ${data.last_air_date}</li>
                                    <li>처음방영일 ${data.first_air_date}</li>
                                </ul>
                                <br />
                                <p>줄거리<br />${data.overview}</p>
                            </div>
                        </div>
                        <div class="seasons_list">
                           ${data.seasons
                              .map((season, i) => {
                                 return ` 
                                    <p>
                                       <i>• ${season.name}</i> 평점(${season.vote_average.toFixed(1)})보러가기 ${season.air_date} 방영
                                    </p>
                                 `
                              })
                              .join('')}
                        </div>
                        `

      subContainer.innerHTML += rowHtml
   } catch (error) {
      console.log('에러 발생: ', error)
   }
}
getDetailTv(tvDetailUrl)
