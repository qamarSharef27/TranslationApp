translateButton = document.getElementById('translateButton');

const ApiKey = "MgoYCzt6WVJHr5yxFWcus5vEzyJMMsXK";

translateButton.addEventListener('click', function () {

    const language = document.getElementById('language').value;
    const inputText = document.getElementById('inputText').value;

    if(language === "en" ){

        if (isEnglish(inputText)) {

    fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=en|ar`)
    .then(response => response.json())
    .then(data => {
        const translationResult = document.getElementById('translationResult');
        const translatedText = data.responseData.translatedText;
    
        const textWrapper = document.createElement('span');
        textWrapper.textContent = translatedText;
    
        textWrapper.classList.add('translation-text');
    
        translationResult.appendChild(textWrapper);
        translationResult.appendChild(document.createElement('br'));


        fetch(`http://api.giphy.com/v1/gifs/search?q=${data.responseData.translatedText}&api_key=${ApiKey}&limit=5`)
        .then(response => response.json())
        .then(({ data: list })=> {

            list.forEach(element => {
            let img = new Image();
            img.src = element.images.original.url;
            img.style.width = '80px'; 
            img.style.height = '80px';        
            
    
            translationResult.appendChild(img); 

        });
    });


    });
}

else {
    const container = document.querySelector(".container");

    const containerItem = document.createElement("label");
    containerItem.textContent = "InVaild Text, please rewrite English Text";
    containerItem.style.color = "red";

    container.appendChild(containerItem);

}
    

    }
    else if(language === "ar" ){

        if (isArabic(inputText)) {

        fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=ar|en`)
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
                
            });
    
        });
    }

    else {
        const container = document.querySelector(".container");
    
        const containerItem = document.createElement("label");
        containerItem.textContent = "InVaild Text, please rewrite Arabic Text";
        containerItem.style.color = "red";
    
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