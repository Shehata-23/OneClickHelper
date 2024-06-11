document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const downloadButton = document.getElementById('downloadButton');
    const fileInfo = document.getElementById('fileInfo');

    let selectedFiles = [];

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        selectedFiles = Array.from(files); 

        if (selectedFiles.length > 0) {
            fileInfo.textContent = `Selected files: ${selectedFiles.map(file => file.name).join(', ')}`;
            downloadButton.style.display = 'inline-block';
        } else {
            fileInfo.textContent = 'No file selected';
            downloadButton.style.display = 'none';
        }
    });

    downloadButton.addEventListener('click', () => {
        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                let fileName = file.name;
                fileName = fileName.replace(/^order\s*/i, ''); // Remove "order" or "ORDER" if it is the first word
                fileName = fileName.replace(/\.[^/.]+$/, "") + ".zip"; // Change the extension to .zip

                const zip = new JSZip();
                zip.file(file.name, file);

                zip.generateAsync({ type: "blob" }).then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                });
            });
        }
    });
});