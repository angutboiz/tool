var data = [];
chrome.storage.local.get("loggedIn", (result) => {
    if (result.loggedIn) {
        console.log("Mở khoá thành công cảm ơn bạn đã sử dụng");
        var style = document.createElement("style");
        style.innerHTML = `
        p::selection {
            background: transparent;
            color: inherit;
        }
    `;
        var table = document.querySelectorAll("table");
        table.forEach((item) => {
            item.style.fontSize = "16px";
        });
        document.head.appendChild(style);
        document.addEventListener("contextmenu", (e) => e.stopPropagation(), true);
        document.addEventListener("keydown", (e) => e.stopPropagation(), true);

        const customButton = document.createElement("button");
        customButton.className = "custom-button";
        customButton.style.position = "absolute";
        customButton.style.border = "none";
        customButton.style.fontFamily = "Hevetica, Arial, sans-serif";
        customButton.style.fontSize = "16px";
        customButton.style.background = "white";

        document.body.appendChild(customButton);

        document.addEventListener("selectionchange", function () {
            const selectedText = getSelectedText();

            for (var i = 0; i < data.length; i++) {
                var question = data[i].question.toLowerCase();
                var answer = data[i].answer;

                if (question.includes(selectedText)) {
                    customButton.textContent = answer;
                }
            }

            if (selectedText) {
                const selection = window.getSelection();

                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();

                    customButton.style.left = 75 + "px";
                    customButton.style.top = rect.top + window.scrollY + 30 + "px";

                    // Display the button
                    customButton.style.display = "block";
                }
            } else {
                // Hide the button when no text is selected
                customButton.style.display = "none";
            }
        });

        function getSelectedText() {
            if (window.getSelection) {
                return window.getSelection().toString();
            } else if (document.selection && document.selection.type !== "Control") {
                return document.selection.createRange().text;
            }
            return "";
        }
    } else {
        console.log("Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng");
    }
});

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
