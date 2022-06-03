const defaultLocale = "en";

let locale;

let translations = {};

document.addEventListener("DOMContentLoaded", () => {
    setLocale(defaultLocale);    

    bindLocaleSwitcher(defaultLocale);
});

function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        setLocale(e.target.value);
    };
}

async function setLocale(newLocale) {
    if (newLocale === locale) return;

    const newTranslation = await fetchTranslationsFor(newLocale);

    locale = newLocale;
    translations = newTranslation;
    translatePage();
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/lang/${newLocale}.json`);
    const newTrans= await response.json();
    return newTrans;
}

function translatePage() {
    document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}