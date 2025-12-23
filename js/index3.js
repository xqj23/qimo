// 1. 从LocalStorage获取购物车数据
    function getCartData() {
        const cart = localStorage.getItem('dessertCart');
        return cart ? JSON.parse(cart) : [];
    }

    // 2. 保存购物车数据到LocalStorage
    function saveCartData(cart) {
        localStorage.setItem('dessertCart', JSON.stringify(cart));
        // 重新渲染购物车
        renderCart();
    }

    // 3. 计算购物车总价
    function calculateTotal() {
        const cart = getCartData();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return total.toFixed(2); // 保留2位小数
    }

    // 4. 渲染购物车列表
    function renderCart() {
        const cart = getCartData();
        const cartItemsEl = document.getElementById('cart-items');
        const emptyCartEl = document.getElementById('empty-cart-message');
        const cartTotalEl = document.getElementById('cart-total-price');
        const cartSummaryEl = document.getElementById('cart-summary');

        // 清空现有内容
        cartItemsEl.innerHTML = '';

        // 判断购物车是否为空
        if (cart.length === 0) {
            emptyCartEl.style.display = 'block';
            cartSummaryEl.style.display = 'none';
            return;
        }

        // 购物车有商品：隐藏空提示，显示汇总
        emptyCartEl.style.display = 'none';
        cartSummaryEl.style.display = 'flex';

        // 渲染每个商品项
        cart.forEach((item, index) => {
            const subtotal = (item.price * item.quantity).toFixed(2); // 小计
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.img}" class="cart-item-img">
                    <span>${item.name}</span>
                </div>
                <div class="cart-item-price">¥${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="quantity-btn plus-btn" data-index="${index}">+</button>
                </div>
                <div class="cart-item-subtotal">¥${subtotal}</div>
                <div class="cart-item-action">
                    <button class="delete-btn" data-index="${index}">删除</button>
                </div>
            `;
            cartItemsEl.appendChild(cartItem);
        });

        // 更新总价
        cartTotalEl.textContent = `¥${calculateTotal()}`;

        // 绑定数量修改事件
        bindQuantityEvents();
        // 绑定删除事件
        bindDeleteEvents();
    }

    // 5. 绑定数量增减事件
    function bindQuantityEvents() {
        // 减数量
        document.querySelectorAll('.minus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const cart = getCartData();
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    saveCartData(cart);
                }
            });
        });

        // 加数量
        document.querySelectorAll('.plus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const cart = getCartData();
                cart[index].quantity += 1;
                saveCartData(cart);
            });
        });

        // 手动输入数量
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                const cart = getCartData();
                const newQuantity = parseInt(this.value);
                // 限制数量≥1
                cart[index].quantity = newQuantity >= 1 ? newQuantity : 1;
                saveCartData(cart);
            });
        });
    }

    // 6. 绑定删除商品事件
    function bindDeleteEvents() {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const cart = getCartData();
                // 删除对应索引的商品
                cart.splice(index, 1);
                saveCartData(cart);
                alert('商品已从购物车移除！');
            });
        });
    }

    // 7. 绑定清空购物车事件
    document.querySelector('.clear-cart-btn').addEventListener('click', function() {
        if (confirm('确定要清空购物车吗？')) {
            localStorage.removeItem('dessertCart');
            renderCart();
        }
    });

    // 8. 绑定结算按钮事件
    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cart = getCartData();
        if (cart.length === 0) {
            alert('购物车为空，无法结算！');
            return;
        }
        alert(`结算成功！总计：¥${calculateTotal()}\n感谢你的购买～`);
        // 结算后清空购物车（可选）
        localStorage.removeItem('dessertCart');
        renderCart();
    });

    // 页面加载时渲染购物车
    window.onload = function() {
        renderCart();
    };