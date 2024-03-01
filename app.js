const categoryButtonContainer = document.getElementById('categoryButtonContainer');
const cardPostContainer = document.getElementById('cardPostContainer');
const errorElement = document.getElementById('errorElement');
let selectedCategory = 1000;

const fetchCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
        .then(res => res.json())
        .then(({data}) => {
            data.forEach(card => {
                // console.log(card);
                const catBtn = document.createElement('button');
                catBtn.innerText = card.category;
                catBtn.classList='bg-[#25252526] py-2 px-2 lg:px-5 rounded-lg text-base font-medium'
                catBtn.addEventListener('click', () => fetchDataByCategories(card.category_id))
                categoryButtonContainer.appendChild(catBtn)
            });
        })
}

const fetchDataByCategories = (catId) =>{
    // console.log(catId);
    selectedCategory = catId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${catId}`
    fetch(url)
        .then((res) => res.json())
        .then(({data}) =>{
            // console.log(data);
            if(data.length === 0){
                errorElement.classList.remove('hidden')
            }else{
                errorElement.classList.add('hidden')
            }
            cardPostContainer.innerHTML = '';
            data.forEach(video => {
                // console.log(video);
                let verifiedBadge = '';
                if(video.authors[0].verified){
                    verifiedBadge = `<img class="lg:w-6 w-3 lg:h-6 h-3" src="badge.png" alt="">`
                }
                const newCard = document.createElement('div');
                newCard.classList.add('mx-auto')
                newCard.innerHTML = `
                <img class="w-[290px] h-[200px] rounded-lg" src="${video.thumbnail}" alt="">
                <div class="flex mt-5">
                    <img class="w-[40px] h-[40px] rounded-full mr-3" src="${video.authors[0].profile_picture}" alt="">
                    <div>
                        <h6 class="text-sm font-bold w-[245px]">${video.title}</h6>
                        <div class="flex items-center">
                            <p class="mr-2">${video.authors[0].profile_name}</p>
                            ${verifiedBadge}
                        </div>
                        <p>${video.others.views} views</p>
                    </div>
                </div>
                `;
                cardPostContainer.appendChild(newCard)
                
            });
        })
}


fetchCategory()
fetchDataByCategories(selectedCategory)