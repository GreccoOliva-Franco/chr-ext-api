const uploadBtn = document.getElementById("upload");
const downloadBtn = document.getElementById("download");
// const form = document.getElementById("form");

uploadBtn.addEventListener("click", () => {
    form.classList.toggle("hidden");
});

downloadBtn.addEventListener("click", () => {
    fetch("/api/words").then(res => {
        res.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "words.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    })

});

