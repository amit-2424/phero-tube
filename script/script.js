
const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('cardContainer');


let selectedCategories = 1000;

const faceCategories = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({ data }) => {
            data.forEach((buttonData) => {
                const button = document.createElement('button');
                button.className = "btn mr-2";
                button.innerText = buttonData.category;
                button.addEventListener('click', () => {
                    // console.log("button click");
                    // console.log(buttonData);
                    faceDataByCategories(buttonData.category_id);
                })
                btnContainer.appendChild(button);
            })
        })
}

const faceDataByCategories = btnId => {
    selectedCategories = btnId;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${btnId}`)
    .then((res)=>res.json())
    .then(({data})=>{
        cardContainer.innerHTML = '';
        data.forEach((video)=>{
            console.log(video);
            const cardBody = document.createElement('div');
            cardBody.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                    <figure class="overflow-hidden h-72">
                        <img class="w-full h-72 relative" src="${video.thumbnail}" alt="">
                        <h6 class="absolute bottom-[40%] right-12 text-white text-xl">0 hr</h6>
                    </figure>
                    <div class="card-body flex flex-row gap-4">
                        <div class="flex space-x-4 justify-start items-start">
                            <img class="w-12 h-12 rounded-full m-2" src="${video.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p>${video.authors[0].profile_name}</p>
                                <img class="w-6 h6" src="./img/verify.png" alt="">
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            `
            cardContainer.appendChild(cardBody);
        })
    })
}



faceDataByCategories(selectedCategories);
faceCategories();