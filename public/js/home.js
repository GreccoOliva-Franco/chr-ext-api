const uploadBtn = document.getElementById("upload");
const downloadBtn = document.getElementById("download");
// const form = document.getElementById("form");

uploadBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

downloadBtn.addEventListener("click", () => {
  fetch("/api/words");
});
