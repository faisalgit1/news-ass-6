const loadNewsCategory = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data.news_category)
    return data;
}
loadNewsCategory()

const displayNewsCategory = async (categories) => {
    const showCategory = document.getElementById('categories-list');
    categories.forEach(category => {
        // console.log(category)
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick ="loadNews('${category.category_id}')">${category.category_name}</a>
        `;
        showCategory.appendChild(li);

    })
}
const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadNews(data.data)
}

loadNews()
const displayLoadNews = async (newses) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newses.forEach(news => {
        const { title, thumbnail_url, details, author, total_view } = news;
        const { name, published_date, img } = author;
        console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img class="h-80 w-70" src="${thumbnail_url}" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <P class="text-current">${details.length > 200 ? details.slice(0, 200) + '...' : details} <P>
                   
            `;
        newsContainer.appendChild(div);
    })
}