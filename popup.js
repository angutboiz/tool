document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const deviceId = "34253456vfdgd1";

        fetchLogin(username, password, deviceId);
    });
});

const fetchLogin = async (username, password, deviceId) => {
    const message = document.querySelector(".message");
    message.classList.add("hidden");
    const response = await fetch("https://toolser.vercel.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            deviceId,
        }),
    });
    const data = await response.json();
    message.classList.remove("hidden");

    data.success ? (message.textContent = "Đăng nhập thành công!") : (message.textContent = "Tài khoản mật khẩu không đúng!");

    return data;
};
