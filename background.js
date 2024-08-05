let isUnlocked = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "unlock" && request.key === "123") {
        isUnlocked = true;
        // Mở khóa các chức năng hoặc thay đổi trạng thái của extension
        console.log("Extension unlocked");
    }
});

// Kiểm tra trạng thái của extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkStatus") {
        sendResponse({ unlocked: isUnlocked });
    }
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "textSelected") {
        console.log("Selected text:", request.text);
    }
});
