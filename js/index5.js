// 1. 获取所有需要操作的元素
const loginToggle = document.getElementById('loginToggle'); // 登录切换按钮
const registerToggle = document.getElementById('registerToggle'); // 注册切换按钮
const formBox = document.querySelector('.form-box'); // 粉色表单盒子
const registerBox = document.getElementById('register-box'); // 注册框
const loginBox = document.getElementById('loginBox'); // 登录框
const loginBtn = document.getElementById('loginBtn'); // 登录按钮
const registerBtn = document.getElementById('registerBtn'); // 注册按钮

// 2. 点击「创建新账号」：切换到注册界面（带平移动效）
registerToggle.addEventListener('click', () => {
    // 表单盒子向右平移（适配你的布局，80%为推荐值，可根据需要调整）
    formBox.style.transform = 'translateX(80%)';
    // 隐藏登录框，显示注册框
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
});

// 3. 点击「登录账号」：切换回登录界面（恢复原位置）
loginToggle.addEventListener('click', () => {
    // 表单盒子回到初始位置
    formBox.style.transform = 'translateX(0)';
    // 隐藏注册框，显示登录框
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// 4. 登录按钮点击事件（含表单验证）
loginBtn.addEventListener('click', () => {
    // 获取输入框值并去除首尾空格
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // 空值验证
    if (!username) {
        return alert('请输入用户名！');
    }
    if (!password) {
        return alert('请输入密码！');
    }

    // 登录成功（实际项目中替换为接口请求）
    alert(`登录成功！欢迎 ${username}`);
    // 登录后跳转首页
    window.location.href = 'index.html';
});

// 5. 注册按钮点击事件（含表单验证）
registerBtn.addEventListener('click', () => {
    // 获取注册表单值并去除首尾空格
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

    // 分步验证（更友好的提示）
    if (!username) return alert('请输入用户名！');
    if (!email) return alert('请输入邮箱！');
    if (!password) return alert('请输入密码！');
    if (!confirmPassword) return alert('请确认密码！');
    if (password !== confirmPassword) return alert('两次输入的密码不一致！');

    // 模拟注册成功（实际项目中替换为接口请求）
    alert('注册成功！即将跳转到登录界面');
    
    // 注册成功后：切回登录界面 + 清空注册表单
    formBox.style.transform = 'translateX(0)';
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
    
    // 清空注册表单输入框
    document.getElementById('regUsername').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
});

// 可选：页面加载时初始化表单位置（防止刷新后位置异常）
window.onload = () => {
    formBox.style.transform = 'translateX(0)';
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
};