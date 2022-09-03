

const loadNewsCategory = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data.news_category)

}
loadNewsCategory()

const displayNewsCategory = async (categories) => {
    loading(true)
    const showCategory = document.getElementById('categories-list');
    categories.forEach(category => {
        // console.log(category)
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="bg-primary text-white border border-0 rounded fs-4 " onclick ="loadNews('${category.category_id}')">${category.category_name}</button >
        `;
        showCategory.appendChild(div);

    })
}
const loading = isloading => {
    const spinner = document.getElementById('spinner')
    if (isloading === true) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}
const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadNews(data.data)
    loading(false)
}

loadNews()
const displayLoadNews = async (newses) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newses.forEach(news => {
        const { title, thumbnail_url, details, author, total_view, image_url, rating } = news;
        const { name, published_date, img } = author;
        const { number } = rating;
        console.log(news)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
            <img  src="${thumbnail_url ? thumbnail_url : 'not found'}"  class="card-img-top img-fluid" alt="..." >
            <div class="card-body">
                <h5 class="card-title">${title ? title : 'not found'}</h5>
                <p class="card-text">${details.slice(0, 200)}...</p>
                <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex">
                   <img src="${img ? img : 'not found'}" width="40">
                    <p class="ps-2 fw-semibold">${name ? name : 'not found'} </p>
                </div>
                <div>
                <p><span class="mx-2 eye-icon"><i class="fa-regular fa-eye"></i></span>${total_view ? total_view : 'not found'}</p>
                </div>
                <div>
                <button type="button" onclick="loadIdNews('${news._id}')"   class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-arrow-right"></i></button>
                </div>
                </div>
                
            </div>
        </div>
        `
        newsContainer.appendChild(div);
    })
}

const loadIdNews = (modal) => {
    const url = `https://openapi.programming-hero.com/api/news/${modal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalData(data.data[0]))
        .catch(error => console.log(error))
}

// Display news in Modal 
const displayModalData = (news) => {
    const bodyModal = document.getElementById('body-modal');
    bodyModal.innerHTML = `
    <h2>${news.title}</h2>
    <img class="img-fluid" src="${news.image_url}">
    <hr>
    <h2>Ratings: ${news.rating.number}</h2>
    <hr>
    <P>${news.details}</P>
    
    `
}
