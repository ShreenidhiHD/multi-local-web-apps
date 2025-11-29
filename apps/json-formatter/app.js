const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const formatBtn = document.getElementById('formatBtn');
const minifyBtn = document.getElementById('minifyBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

function formatJSON() {
    const input = jsonInput.value.trim();
    if (!input) return;

    try {
        const parsed = JSON.parse(input);
        jsonOutput.value = JSON.stringify(parsed, null, 4);
        jsonOutput.style.color = 'var(--text-primary)';
    } catch (e) {
        jsonOutput.value = `Error: ${e.message}`;
        jsonOutput.style.color = '#ef4444'; // Red for error
    }
}

function minifyJSON() {
    const input = jsonInput.value.trim();
    if (!input) return;

    try {
        const parsed = JSON.parse(input);
        jsonOutput.value = JSON.stringify(parsed);
        jsonOutput.style.color = 'var(--text-primary)';
    } catch (e) {
        jsonOutput.value = `Error: ${e.message}`;
        jsonOutput.style.color = '#ef4444';
    }
}

function copyToClipboard() {
    if (!jsonOutput.value) return;

    navigator.clipboard.writeText(jsonOutput.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 2000);
    });
}

function clearAll() {
    jsonInput.value = '';
    jsonOutput.value = '';
    jsonInput.focus();
}

formatBtn.addEventListener('click', formatJSON);
minifyBtn.addEventListener('click', minifyJSON);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearAll);

// Auto-format on paste (optional, maybe too aggressive?)
// jsonInput.addEventListener('paste', () => setTimeout(formatJSON, 0));
