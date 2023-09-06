translateButton = document.getElementById('translateButton');

const ApiKey = "RNwST3qn9qWp4RUu51vBjrUdk3FAcywH";

translateButton.addEventListener('click', function () {

    const language = document.getElementById('language').value;
    const inputText = document.getElementById('inputText').value;

    if(language === "en" ){

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
    else if(language === "ar" ){

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
    
});

const inputText = document.getElementById('inputText');

inputText.addEventListener('click', function () {
    translationResult.textContent = "";
});