var express = require("express");
var app = express();
var request = require("request");
var http = require("http");

app.set("view engine", "ejs");

app.use(express.static("public"));

               //Hi there Ian! so i wanted to put the plots in an array and use that array in results.ejs
               //but i'm not sure how should i iterate the array
               //and there's a lot of these "Can't set headers after they are sent." Errors
               //also the error "TypeError: req.next is not a function"
               //thank you very much for any help!
               //mike


app.get("/", function(req, res){
    var search = req.query.search
    var films = [];
    var i = 0;
    if(search !== undefined){
        var url = "http://www.omdbapi.com/?s="+search;
        
        request(url, function(error, response, body){
            if(!error && response.statusCode == 200){
                var parsedData = JSON.parse(body);
                
                parsedData["Search"].forEach(function(movie){
                    var id = movie["imdbID"];
                    var newUrl = "http://www.omdbapi.com/?i="+id;
                    request(newUrl,function(error,response,body){
                        if(!error && response.statusCode == 200){
                            i++;
                            var dataPlots = JSON.parse(body);
                            films.push(dataPlots);
                            
                        }
                        if( i == parsedData["Search"].length){
                            res.render("results",{data: films});
                        }
                    });
                    
                });
                
            }
            
       });
    }else{
         var data = null
         res.render("results", {data: data});
    }
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("IT'S ON!");
});
