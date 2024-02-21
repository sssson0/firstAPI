const API_key ='67d41dbe2f724684a835511fd60169c3';
let newsList =[];

const getLatesNews = async()=>{
    const url = new URL(`https://neon-licorice-ee838f.netlify.app/top-headlines?country=us&apiKey=${API_key}`
    );
    const response = await fetch(url);
    const date = await response.json();
    newsList = date.articles;
    console.log('ddd',newsList);
}



const render = ()=>{
    const newHTML = ``;
    newHTML = newsList.map(news=>``)

    document.getElementById('news-board').innerHTML = newsHTML
    
}

getLatesNews();