const API_key ='67d41dbe2f724684a835511fd60169c3';
let newsList =[];
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list");
let url = new URL(
    `https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&apiKey=${API_key}`
    );
let totalResults = 0;
let page = 1;
const pageSize =10;
const groupSize = 5;



const getNews = async() =>{
    try{
        url.searchParams.set("page",page); //&page = page
        url.searchParams.set("pageSize",pageSize);

        const response = await fetch(url);
        const data = await response.json();

        if(response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search!");
            };
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else{
            throw new Error(data.message);
        }
    } catch (error){
        console.log("ee",error.message);
        errorRender(error.message)
    }

    
};

const getLatesNews = async()=>{
    url = new URL(
        `https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&apiKey=${API_key}`
    );
    getNews();
};

sideMenus.forEach((menu) => 
menu.addEventListener("click",(event)=>getNewsByCategory(event))
);
menus.forEach((menu) => 
    menu.addEventListener("click",(event)=>getNewsByCategory(event))
    );

const getNewsByCategory = async (event) => {
        const category = event.target.textContent.toLowerCase();
    console.log('category',category)
    url = new URL(
        `https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_key}`
        );
    getNews();
}
const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value;
    url = new URL(
        `https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_key}`
        );
        getNews();
};


const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" 
                src="${news.urlToImage||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}">
        </div>
        <div class="col-lg-8">
            <h2>
                ${news.title}
            </h2>
            <p>
                ${news.description}
            </p>
            <p>${
                news.summary == null || news.summary == ""
                ? ""
                : news.summary.length > 200
                ? news.summary.substring(0, 200) + "..."
                : news.summary
            }</p>
            <div>
                ${news.source.name} * 
                ${news.source.publishedAt}
            </div>
            <div>${news.rights || "no source"}  ${moment(
                news.published_date
            ).fromNow()}</div>
        </div>
    </div>`
    ).join('');
        console.log(newsHTML)
    document.getElementById('news-board').innerHTML = newsHTML;
    
}

const errorRender = (errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
};

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const paginationRender = ()=>{
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * 5;
    if(lastPage > totalPages){
        lastPage = totalPages;
    }

    let firstPage = lastPage - 4 <=0? 1:lastPage - 4;

    let paginationHTML = ``;
    if (firstPage >= 6) {
        paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
                            <a class="page-link" >&lt;&lt;</a>
                            </li>
                            <li class="page-item" onclick="moveToPage(${page - 1})">
                            <a class="page-link" >&lt;</a>
                            </li>`;
        }
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ""}" >
                            <a class="page-link"  onclick="moveToPage(${i})" >${i}</a>
                            </li>`;
        }
    
    if (lastPage < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
                            <a  class="page-link" >&gt;</a>
                            </li>
                            <li class="page-item" onclick="moveToPage(${totalPages})">
                            <a class="page-link" >&gt;&gt;</a>
                            </li>`;
    }
    // for(let i = firstPage; i <= lastPage; i++){
    //     paginationHTML+=`<li class="page-item ${
    //         i === page ? "active"  : ""
    //     }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    // }
    // paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">>></a></li>`;
    document.querySelector(".pagination").innerHTML = paginationHTML;

};

const moveToPage =(pageNum)=>{

    page = pageNum;
    window.scrollTo({ top: 0, behavior: "smooth" });

    getNews();
};


getLatesNews();
