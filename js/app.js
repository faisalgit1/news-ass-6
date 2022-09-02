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
