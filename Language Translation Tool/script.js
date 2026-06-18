async function translateText() {

    const text = document.getElementById("inputText").value.trim();
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;

    const output = document.getElementById("outputText");

    if (text === "") {
        alert("Please enter text to translate.");
        return;
    }

    output.value = "Translating...";

    try {

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        const data = await response.json();

if (data.responseData) {

    let translatedText =
        data.responseData.translatedText.trim();

    output.value = translatedText;

} else {

    output.value = "Translation not available.";

}

    } catch (error) {

        console.error(error);

        output.value = "Translation failed.";

        alert("Translation failed. Check Console (F12).");
    }
}


function copyText() {

    const output = document.getElementById("outputText");

    if (output.value === "") {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(output.value);

    alert("Copied Successfully!");
}


function speakText() {

    const text = document.getElementById("outputText").value;

    if (text === "") {
        alert("Nothing to speak.");
        return;
    }

    const targetLang =
        document.getElementById("targetLang").value;

    const langMap = {
        en: "en-US",
        te: "te-IN",
        ta: "ta-IN",
        de: "de-DE"
    };

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang =
        langMap[targetLang] || "en-US";

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
}


function clearText() {

    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
}


function swapLanguages() {

    const source =
        document.getElementById("sourceLang");

    const target =
        document.getElementById("targetLang");

    let temp = source.value;

    source.value = target.value;
    target.value = temp;
}