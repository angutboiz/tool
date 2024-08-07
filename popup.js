const API_END_POINT = "https://toolser.vercel.app/";
// const API_END_POINT = "http://localhost:3080/";
const message = document.querySelector(".message");
var data = [];
document.addEventListener("DOMContentLoaded", () => {
    message.classList.add("hidden");
    var loginform = document.querySelector("form");
    var search = document.querySelector(".search");
    var button = document.querySelector("button");
    var loader = document.querySelector(".loader");
    var searchInput = document.querySelector("#searchInput");

    var countSubmit = 4;

    document.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const deviceId = "34253456vfdgd1";

        button.disabled = true;
        button.classList.add("disable");
        loader.classList.remove("hidden");

        var data = await fetchLogin(username, password);

        if (data.success && countSubmit > 0) {
            chrome.storage.local.set({ loggedIn: true }, () => {
                chrome.runtime.sendMessage({ action: "unlock" }, (response) => {
                    message.innerText = response.message;
                    loginform.classList.add("hidden");
                    search.classList.remove("hidden");
                    loader.classList.add("hidden");
                });
            });
            chrome.storage.local.set({ loggedIn: true }, () => {
                console.log("login success");
            });
            console.log("login success");
        } else {
            countSubmit--;
            message.textContent = `Tài khoản mật khẩu không đúng!\nHoặc đã bị khoá, còn ${countSubmit} lần thử`;
            button.disabled = false;
            button.classList.remove("disable");
            loader.classList.add("hidden");
        }
        if (countSubmit == 0) {
            message.textContent = `Bạn đã nhập sai quá nhiều lần!`;
            button.disabled = true;
            button.classList.add("disable");
            loader.classList.add("hidden");
        }
    });

    chrome.storage.local.get("loggedIn", (result) => {
        if (result.loggedIn) {
            loginform.classList.add("hidden");
            search.classList.remove("hidden");
            if (searchInput) searchInput.focus();
        } else {
            loginform.classList.remove("hidden");
            search.classList.add("hidden");
        }
    });
    if (searchInput) searchInput.focus();

    searchInput.addEventListener("input", searchQuestion);

    function searchQuestion() {
        var searchTerm = searchInput.value.toLowerCase();
        var resultContainer = document.querySelector(".result-container");
        resultContainer.innerHTML = ""; // Clear previous results

        // Sample data of questions and answers

        if (searchTerm == "") {
            // Display result
            var resultItem = document.createElement("div");
            resultItem.innerHTML = "Chưa nhập câu hỏiii"; // hiện đáp án
            resultContainer.appendChild(resultItem);
        } else {
            // Search for questions
            for (var i = 0; i < data.length; i++) {
                var question = data[i].question.toLowerCase();
                var answer = data[i].answer;

                if (question.includes(searchTerm)) {
                    // Display result
                    var resultItem = document.createElement("div");
                    resultItem.innerHTML = answer; // hiện đáp án
                    resultContainer.appendChild(resultItem);
                }
            }
        }
    }
});

const fetchLogin = async (username, password) => {
    const response = await fetch(`${API_END_POINT}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    message.classList.remove("hidden");

    return await response.json();
};

data = [
    {
        question: "Câu 1: Các nhà sáng lập ra chủ nghĩa Mác – Lênin đã sử dụng thuật ngữ nào thay cho thuật ngữ “Chủ nghĩa xã hội khoa học”? ",
        answer: ["Chủ nghĩa cộng sản khoa học"],
    },
    {
        question: "Câu 2: Chủ nghĩa xã hội khoa học là? ",
        answer: [
            "Là một trong ba bộ phận hợp thành của chủ nghĩa Mác – Lênin; Nghiên cứu sự vận động xã hội nhằm thủ  tiêu chủ nghĩa tư bản và xây dựng xã hội xã hội chủ nghĩa, tiến tới xây dựng xã hội cộng sản chủ nghĩa.",
        ],
    },
    {
        question: "Câu 3: Chủ nghĩa Mác – Lênin là một học thuyết hoàn chỉnh, gồm: ",
        answer: [" Triết học Mác – Lênin, kinh tế chính trị học Mác – Lênin và chủ nghĩa xã hội khoa học"],
    },
];
