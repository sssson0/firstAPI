const API_key ='67d41dbe2f724684a835511fd60169c3';
let news =[];

const getLatesNews = async()=>{
    const url = new URL(`https://neon-licorice-ee838f.netlify.app/top-headlines?country=us&apiKey=${API_key}`
    );
    const response = await fetch(url);
    const date = await response.json();
    news = date.articles;
    console.log('ddd',news);
}

getLatesNews();