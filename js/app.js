const loadNewsCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
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
        li.innerHTML = `
        <a onclick =loadNews()>${category.category_name}</a>
        `;
        showCategory.appendChild(li);

    })
}
const loadNews = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data)
}

loadNews()
