// 1. 从LocalStorage获取购物车数据（无则初始化空数组）
    function getCartData() {
        const cart = localStorage.getItem('dessertCart');
        return cart ? JSON.parse(cart) : [];
    }

    // 2. 保存购物车数据到LocalStorage
    function saveCartData(cart) {
        localStorage.setItem('dessertCart', JSON.stringify(cart));
    }

    // 3. 加入购物车逻辑
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 获取商品信息（从data属性）
            const productCard = this.closest('.product-card');
            const product = {
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                img: productCard.dataset.img,
                quantity: 1 // 初始数量为1
            };

            // 获取当前购物车数据
            const cart = getCartData();
            // 检查商品是否已在购物车
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex > -1) {
                // 商品已存在：数量+1
                cart[existingProductIndex].quantity += 1;
            } else {
                // 商品不存在：添加到购物车
                cart.push(product);
            }

            // 保存更新后的购物车数据
            saveCartData(cart);
            // 提示用户
            alert(`${product.name} 已加入购物车！`);
        });
    });