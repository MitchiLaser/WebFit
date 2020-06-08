// simple script to reload the website while doing some design-work
/*window.addEventListener("load", function(){
    window.setTimeout(function(){
        location.reload(true);
    }, 3000);
});*/

// when the loading-screen is being displayed: fetch all css- and JavaScript-files to launch the app
window.addEventListener("load", function(){
    window.fetch("./config/config.json")
        .then(
            function(response){
                if(response.status !== 200){
                    console.error("Error while getting config.json. HTTP-Statuscode: " + response.status);
                    return;
                }
                
                response.json().then(function(data){
                    if(data.debug)
                        console.log(data);

                    // todo: get the list of JavaScript modules and load them
                    

                    // get the list of css-files and load them
                    data.styles.map(function(stylesheet){
                        var link = document.createElement("link");
                        link.type = "text/css";
                        link.rel = "stylesheet";
                        link.href = "styles/" + stylesheet;
                        document.getElementsByTagName("head")[0].appendChild(link);
                    });

                    if(data.debug)
                        console.log("done loading all stylesheets and modules.")
                });
            }
        )
        .catch(
            function(e){
                console.error("Error while trying to fetch config.json:" + e);
            }
        );
});