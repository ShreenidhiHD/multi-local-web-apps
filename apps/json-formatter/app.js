const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const formatBtn = document.getElementById('formatBtn');
const minifyBtn = document.getElementById('minifyBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

function syntaxHighlight(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 4);
    }

    // Escape HTML entities to prevent XSS
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function formatJSON() {
    const input = jsonInput.value.trim();
    if (!input) return;

    try {
        const parsed = JSON.parse(input);
        // Format with 4 spaces indentation
        const formatted = JSON.stringify(parsed, null, 4);
        jsonOutput.innerHTML = syntaxHighlight(formatted);
        jsonOutput.style.color = 'var(--text-primary)';
    } catch (e) {
        jsonOutput.innerHTML = `<span class="error-message">Error: ${e.message}</span>`;
    }
}

function minifyJSON() {
    const input = jsonInput.value.trim();
    if (!input) return;

    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        // We can still highlight minified JSON, though it's less readable
        jsonOutput.innerHTML = syntaxHighlight(minified);
        jsonOutput.style.color = 'var(--text-primary)';
    } catch (e) {
        jsonOutput.innerHTML = `<span class="error-message">Error: ${e.message}</span>`;
    }
}

function copyToClipboard() {
    if (!jsonOutput.innerText) return;

    navigator.clipboard.writeText(jsonOutput.innerText).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 2000);
    });
}

function clearAll() {
    jsonInput.value = '';
    jsonOutput.innerHTML = '';
    jsonInput.focus();
}

formatBtn.addEventListener('click', formatJSON);
minifyBtn.addEventListener('click', minifyJSON);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearAll);

// Auto-format on paste (optional, maybe too aggressive?)
// jsonInput.addEventListener('paste', () => setTimeout(formatJSON, 0));
