
const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('cardContainer');

const errorElement = document.getElementById("errorElement");
const shortByViewBtn = document.getElementById("short-by-view");

shortByViewBtn.addEventListener("click",()=>{
    shortByView = true;
    faceDataByCategories(selectedCategories,shortByView);
})


let selectedCategories = 1000;
let shortByView = false;

const faceCategories = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({ data }) => {
            data.forEach((buttonData) => {
                const button = document.createElement('button');
                button.className = "categoryBtn btn mr-2";
                button.innerText = buttonData.category;
                button.addEventListener('click', () => {
                    // console.log("button click");
                    // console.log(buttonData);
                    const allBtn = document.querySelectorAll(".categoryBtn");
                    for(btn of allBtn){
                        btn.classList.remove("bg-red-600");
                    }
                    button.classList.add("bg-red-600");
                    faceDataByCategories(buttonData.category_id);
                })
                btnContainer.appendChild(button);
            })
        })
}

const faceDataByCategories = (btnId,shortByView) => {
    selectedCategories = btnId;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${btnId}`)
        .then((res) => res.json())
        .then(({ data }) => {

            if(shortByView){
                data.sort((a,b)=>{
                    const totalViewFirst = a.others?.views;
                    const totalViewSecond = b.others?.views;

                    const totalViewFirstNumber = parseFloat(totalViewFirst.replace("k","")) || 0;
                    const totalViewSecondNumber = parseFloat(totalViewSecond.replace("k","")) || 0;

                    return totalViewSecondNumber - totalViewFirstNumber;
                })
            }

            if (data.length === 0) {
                errorElement.classList.remove('hidden');
            } else {
                errorElement.classList.add('hidden');
            }
            cardContainer.innerHTML = '';
            data.forEach((video) => {
                console.log(video);
                let verifiedBeth = "";
                if (video.authors[0].verified) {
                    verifiedBeth = `<img class="w-6 h6" src="./img/verify.png" alt=""></img>`
                }
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
                            <div class="flex mt-3 justify-between">
                                <p>${video.authors[0].profile_name}</p>
                                ${verifiedBeth}
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



faceDataByCategories(selectedCategories,shortByView);
faceCategories();