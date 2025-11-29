const htmlInput = document.getElementById('htmlInput');
const previewFrame = document.getElementById('previewFrame');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');

function updatePreview() {
    const html = htmlInput.value;
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
}

function clearAll() {
    htmlInput.value = '';
    updatePreview();
    htmlInput.focus();
}

runBtn.addEventListener('click', updatePreview);
clearBtn.addEventListener('click', clearAll);

// Auto-update on type (debounced)
let timeout;
htmlInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(updatePreview, 500);
});

// Initial run to show placeholder if any (or clear)
// updatePreview();
