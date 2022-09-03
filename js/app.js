

const loadNewsCategory = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data.news_category)

}
loadNewsCategory()

const displayNewsCategory = async (categories) => {
    const showCategory = document.getElementById('categories-list');
    categories.forEach(category => {
        // console.log(category)
        const li = document.createElement('li');
        li.classList.add('font-medium')
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
    if (newses.length === 0) {
        alert('no data');
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newses.forEach(news => {
        const { title, thumbnail_url, details, author, total_view, image_url, rating } = news;
        const { name, published_date, img } = author;
        const { number } = rating;
        console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img class="h-80 w-70" src="${thumbnail_url ? thumbnail_url : 'not found'}" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title text-2xl font-extrabold">${title ? title : 'not found'}</h2>
                    <P class="font-semibold">${details.length > 200 ? details.slice(0, 200) + '...' : details} <P>
                    <div class="stats ">
                    <div class="stat flex w-30">
                        <div class="avatar">
                            <div class="w-16 rounded-full">
                                <img src="${img ? img : 'not found'}" />
                            </div>
                        </div>
                        <div>
                            <h1 class="stat-value">${name ? name : 'not found'}</h1>
                            <h2 class="font-semibold">${published_date ? published_date : 'not found'}</h2>
                        </div>
                    </div>
                    <div class="stat flex">
                        <div>
                            <img src="images/images.jpg" alt="">
                        </div>
                        <div class="stat-value text-secondary">${total_view ? total_view : 'not found'}</div>
                    </div>
                </div>
                <div class="stat">
                <label for="my-modal-3" onclick="showModal('${image_url}', '${title}', '${number}', '${details}')" class="btn btn-primary w-20 modal-button">Details</label>
                <div>
                
                </div>
            </div>
            `;
        newsContainer.appendChild(div);
    })
}

const showModal = async (image_url, title, number, details) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="h-80 w-70" src="${image_url ? image_url : 'not found'}" alt="Album">
    <h2 class="card-title text-2xl font-extrabold">${title ? title : 'not found'}</h2>
    <h2 class="text-2xl font-semibold">Ratings:${number}</h2>
    <P class="font-semibold">${details} <P>
`;
}
