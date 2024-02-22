const API_key ='67d41dbe2f724684a835511fd60169c3';
let newsList =[];
const menus = document.querySelectorAll(".menus button")

menus.forEach((menu) => 
    menu.addEventListener("click",(event)=>getNewsByCategory(event))
    );

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const getLatesNews = async()=>{
    const url = new URL(`https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&apiKey=${API_key}`
    );
    const response = await fetch(url);
    const date = await response.json();
    newsList = date.articles;
    render();
    console.log('ddd',newsList);
}

const getNewsByCategory = async (event) => {
        const category = event.target.textContent.toLowerCase();
    console.log('category',category)
    const url = new URL(`https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_key}`)
    const response = await fetch(url)
    const data =await response.json();
    console.groupCollapsed("DDD",data);
    newsList = data.articles;
    render();
}
const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value;
    console.log("KK",keyword)
    const url = new URL(`https://neon-licorice-ee838f.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_key}`);
    const response = await fetch(url)
    const data =await response.json();
    console.log("key",data)
    newsList = data.articles;
    render();
}


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

getLatesNews();