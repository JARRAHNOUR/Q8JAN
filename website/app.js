document.addEventListener("DOMContentLoaded", () => {
    console.log("Q8JAN Website Loaded");

    const year = new Date().getFullYear();

    const footer = document.querySelector("footer p");

    if (footer) {
        footer.innerHTML = `© ${year} Q8JAN. All Rights Reserved.`;
    }
});