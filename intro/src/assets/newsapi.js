function getNews(){
    fetch("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=5335c510da7f4699b8fd78d85be8250c")
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            appendData(data);
        })
        .catch(function (err){
            console.log('error: ' + err);
        });

    function appendData(data){
        var mainContainer=document.getElementById("myData");
        mainContainer.innerHTML="";
        for(var i=0;i<6;i++){
            var div=document.createElement("div");

            var h=document.createElement("h4");
            h.innerHTML=data.articles[i].title;
            h.style.color="blue";
            
            var p=document.createElement("p");
            p.innerHTML=data.articles[i].description;
            
            var a=document.createElement("a");
            a.innerHTML="Link";
            a.href=data.articles[i].url;

            div.appendChild(h);
            div.appendChild(p);
            div.appendChild(a);

            div.style.border="groove";
            
            mainContainer.appendChild(div);
        }
    }
}