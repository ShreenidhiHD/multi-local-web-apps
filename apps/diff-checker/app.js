const originalInput = document.getElementById('originalInput');
const modifiedInput = document.getElementById('modifiedInput');
const diffOutput = document.getElementById('diffOutput');
const compareBtn = document.getElementById('compareBtn');
const clearBtn = document.getElementById('clearBtn');

function compareText() {
    const original = originalInput.value;
    const modified = modifiedInput.value;

    if (!original && !modified) {
        diffOutput.innerHTML = '<span class="diff-grey">Enter text to compare...</span>';
        return;
    }

    // Use jsdiff library (loaded via CDN as 'Diff')
    const diff = Diff.diffWords(original, modified);
    const fragment = document.createDocumentFragment();

    diff.forEach((part) => {
        // green for additions, red for deletions
        // grey for common parts
        const span = document.createElement('span');
        span.style.color = part.added ? '#4ade80' :
            part.removed ? '#f87171' : 'var(--text-secondary)';

        if (part.added) {
            span.classList.add('diff-added');
        } else if (part.removed) {
            span.classList.add('diff-removed');
        } else {
            span.classList.add('diff-grey');
        }

        span.appendChild(document.createTextNode(part.value));
        fragment.appendChild(span);
    });

    diffOutput.innerHTML = '';
    diffOutput.appendChild(fragment);
}

function clearAll() {
    originalInput.value = '';
    modifiedInput.value = '';
    diffOutput.innerHTML = '';
    originalInput.focus();
}

compareBtn.addEventListener('click', compareText);
clearBtn.addEventListener('click', clearAll);
