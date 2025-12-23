// 轮播图逻辑
let currentSlide = 0;// 记录当前显示的轮播图索引（初始为第1张，索引从0开始）
const slides = document.querySelectorAll('.slide');// 获取所有轮播项（.slide类的元素）
const indicators = document.querySelectorAll('.indicator');// 获取所有轮播指示器（小点）
            
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));// 1. 先移除所有轮播项的“active”类（隐藏所有轮播图）
    indicators.forEach(indicator => indicator.classList.remove('active'));// 2. 移除所有指示器的“active”类（取消所有小点的选中状态）
                
    slides[index].classList.add('active');// 3. 给目标索引的轮播项加“active”类（显示这张轮播图）
    indicators[index].classList.add('active');// 4. 给目标索引的指示器加“active”类（高亮对应小点）
}
            
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;// 索引循环：比如有3张图，当前是2（第3张），+1后%3=0（回到第1张）
    showSlide(currentSlide);// 调用显示函数，切换到新索引的轮播图
}
            
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;// 索引循环：当前是0（第1张），-1+length=4（到最后一张），再%length=4
    showSlide(currentSlide);
}
            
document.querySelector('.prev').addEventListener('click', prevSlide);// 找到“上一张”按钮，点击时执行prevSlide函数
document.querySelector('.next').addEventListener('click', nextSlide);// 找到“下一张”按钮，点击时执行nextSlide函数

// 遍历所有指示器，给每个小点绑定点击事件
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;// 把当前索引改成小点对应的索引
        showSlide(currentSlide);// 显示对应轮播图
    });
});
            
// 自动轮播
// 每5000毫秒（5秒）自动执行一次nextSlide函数（切换到下一张
setInterval(nextSlide, 3000);


// 页面加载完成后执行
window.onload = function() {
    // 1. 获取所有分类卡片和商品卡片
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');

    // 2. 分类点击逻辑封装（复用）
    function filterProducts(targetCategory, activeCard) {
        // ① 高亮选中的分类
        categoryCards.forEach(c => c.classList.remove('active'));
        activeCard.classList.add('active');

        // ② 筛选商品：显示对应分类，隐藏其他
        productCards.forEach(product => {
            const productCategory = product.dataset.productCategory;
            product.style.display = productCategory === targetCategory ? 'block' : 'none';
        });
    }

    // 3. 给每个分类卡片绑定点击事件
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            filterProducts(this.dataset.category, this);
        });
    });

    // ========== 核心改动：默认触发第一个分类的点击 ==========
    if (categoryCards.length > 0) {
        const firstCategory = categoryCards[0]; // 获取第一个分类（蛋糕）
        filterProducts(firstCategory.dataset.category, firstCategory); // 执行筛选逻辑
    }
};