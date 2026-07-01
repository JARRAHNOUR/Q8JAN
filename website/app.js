document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer p");
  if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} Q8JAN. Built for the future.`;
  }
});