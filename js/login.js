document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username === 'admin' && password === 'admin') {
        window.location.href = 'danhsach.html';
    }else{
        alert('Sai tài khoản hoặc mật khẩu!');
        e.target.reset();
    }
});