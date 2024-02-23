const API_key ='67d41dbe2f724684a835511fd60169c3';
let newsList =[];
const menus = document.querySelectorAll(".menus button");
const sideMenus = document.querySelectorAll(".side-menu-list");
let url = new URL(
    `https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&apiKey=${API_key}`
    );




const getNews = async() =>{
    try{
        const response = await fetch(url);
        
        const data = await response.json();
        if(response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search!");
            };
            newsList = data.articles;
            render();
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

getLatesNews();