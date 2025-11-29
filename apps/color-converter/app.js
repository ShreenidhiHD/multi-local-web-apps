const hexInput = document.getElementById('hexInput');
const rgbInput = document.getElementById('rgbInput');
const hslInput = document.getElementById('hslInput');
const colorPicker = document.getElementById('colorPicker');
const mainPreview = document.getElementById('mainPreview');
const paletteContainer = document.getElementById('paletteContainer');

// Helper functions for color conversion
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + (b)).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// Update UI based on HEX input
function updateFromHex(hex) {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) return;

    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Update all inputs except the one being typed in (if any)
    // For simplicity, we update all and rely on browser not to mess up cursor too much
    // or we can check document.activeElement

    if (document.activeElement !== hexInput) hexInput.value = hex;
    if (document.activeElement !== rgbInput) rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    if (document.activeElement !== hslInput) hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    if (document.activeElement !== colorPicker) colorPicker.value = hex;

    mainPreview.style.backgroundColor = hex;
    generatePalette(hsl.h, hsl.s);
}

// Generate shades and tints
function generatePalette(h, s) {
    paletteContainer.innerHTML = '';
    for (let l = 10; l <= 95; l += 8) { // More steps for smoother gradient
        const rgb = hslToRgb(h, s, l);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

        const wrapper = document.createElement('div');
        wrapper.className = 'swatch-wrapper';

        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        swatch.style.backgroundColor = hex;

        const label = document.createElement('span');
        label.className = 'swatch-label';
        label.innerText = hex;

        wrapper.onclick = () => {
            navigator.clipboard.writeText(hex);

            // Visual feedback
            const originalText = label.innerText;
            label.innerText = "Copied!";
            label.style.color = "#4ade80"; // Green
            swatch.style.transform = "scale(0.95)";

            setTimeout(() => {
                label.innerText = originalText;
                label.style.color = "";
                swatch.style.transform = "";
            }, 1000);
        };

        wrapper.appendChild(swatch);
        wrapper.appendChild(label);
        paletteContainer.appendChild(wrapper);
    }
}

// Event Listeners
hexInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    updateFromHex(val);
});

colorPicker.addEventListener('input', (e) => {
    updateFromHex(e.target.value);
});

// Basic parsing for RGB/HSL inputs could be added here
// For now, we focus on the requested Color Picker fix

// Initial load
updateFromHex(hexInput.value);
