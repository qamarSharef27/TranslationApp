translateButton = document.getElementById('translateButton');

const ApiKey = "MgoYCzt6WVJHr5yxFWcus5vEzyJMMsXK";

const translateAndDisplay = (inputText, language) => {

    let src;
    let des;

    if (language === "en"){
        src = "en";
        des = "ar";

    }
    else if (language === "ar"){
        src = "ar";
        des = "en";
    }

    fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${src}|${des}`)
    .then(response => response.json())
    .then(data => {
        const translationResult = document.getElementById('translationResult');
        const translatedText = data.responseData.translatedText;
    
        const textWrapper = document.createElement('span');
        textWrapper.textContent = translatedText;
    
        textWrapper.classList.add('translation-text');
    
        translationResult.appendChild(textWrapper);
        translationResult.appendChild(document.createElement('br'));

        fetch(`http://api.giphy.com/v1/gifs/search?q=${data.responseData.translatedText}&api_key=${ApiKey}&limit=8`)
        .then(response => response.json())
        .then(({ data: list })=> {

            list.forEach(element => {
            let img = new Image();
            img.src = element.images.original.url;
            img.style.width = '80px'; 
            img.style.height = '80px';        
            
    
            translationResult.appendChild(img); 

        });
    })
    .catch(error => {

        const textWrapper = document.createElement('span');
        textWrapper.textContent = error;

        textWrapper.classList.add('text');
        
        translationResult.appendChild(textWrapper);
        translationResult.appendChild(document.createElement('br'));

    });

    }) .catch(error => {
        const textWrapper = document.createElement('span');
        textWrapper.textContent = error;

        textWrapper.classList.add('text');
        
        translationResult.appendChild(textWrapper);
        translationResult.appendChild(document.createElement('br'));
    });
}


translateButton.addEventListener('click', () => {

    const language = document.getElementById('language').value;
    const inputText = document.getElementById('inputText').value;

    if(language === "en" ){

        if (isEnglish(inputText)) {

            translateAndDisplay(inputText, language);
       
    }
    

else {
    const container = document.querySelector(".container");

    const containerItem = document.createElement("label");
    containerItem.textContent = "InVaild Text, please rewrite English Text";
    containerItem.classList.add('text');

    container.appendChild(containerItem);

}
    
}
    else if(language === "ar" ){

        if (isArabic(inputText)) {

            translateAndDisplay(inputText, language);

    }

    else {
        const container = document.querySelector(".container");
    
        const containerItem = document.createElement("label");
        containerItem.textContent = "InVaild Text, please rewrite Arabic Text";
        containerItem.classList.add('text');
    
        container.appendChild(containerItem);
    
    }
    }
    
});

const inputText = document.getElementById('inputText');

inputText.addEventListener('click', function () {
    translationResult.textContent = "";
    const container = document.querySelector(".container");
    const label = container.querySelector("label");   
    label.textContent = ""; 
});

function isEnglish(text) {
    var englishRegex = /^[A-Za-z\s\.,'"!?]+$/;
    return englishRegex.test(text);
}

function isArabic(text) {
    var arabicRegex = /^[\u0600-\u06FF\s\.,'"!?]+$/;
    return arabicRegex.test(text);
}