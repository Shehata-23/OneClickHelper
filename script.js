document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const downloadButton = document.getElementById('downloadButton');
    const fileInfo = document.getElementById('fileInfo');

    let selectedFiles = [];

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            selectedFiles = Array.from(files);
            fileInfo.textContent = `Selected file(s): ${selectedFiles.map(file => file.name).join(', ')}`;
            downloadButton.style.display = 'inline-block';
        } else {
            fileInfo.textContent = 'No file selected';
            downloadButton.style.display = 'none';
        }
    });

    downloadButton.addEventListener('click', () => {
        selectedFiles.forEach(selectedFile => {
            const fileNameWithoutOrder = selectedFile.name.replace(/^order[_\s]?/i, "");
            const newFileName = fileNameWithoutOrder.replace(/\.[^/.]+$/, "") + ".zip";
            const blob = new Blob([selectedFile], { type: "application/zip" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = newFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    });
});
