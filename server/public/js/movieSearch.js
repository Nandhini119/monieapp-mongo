function getMovies()
{
console.log("hi");
console.log(document.getElementById('moviename').value);
 $.ajax({
           url:'/search',
           type: 'GET',
           data:{name:document.getElementById('moviename').value},
           success:function(obj) {
               console.log("obj+", obj);
            var filmHTML = '';
            var filmHTML ="<tr><td><center>Title</center></td><td><center>Poster</center></td><td><center>Release_Date</center></td><td><center>AddMovie</center></td></tr>";
            if(obj.total_results)
            for (var count=0;(count < obj.total_results && count < 20);count++) {
                if(obj.results[count].poster_path == null )
                {
                  posterpath =  "https://smoothtouchcosmetics.com/wp-content/uploads/2016/08/No-Image-Available.jpg";
                }
                else
                {
                    console.log(obj.results[count].poster_path);
                     var posterpath = "http://image.tmdb.org/t/p/w185/"+obj.results[count].poster_path;
                }
              
                var movobj = {title:obj.results[count].title,
                poster:posterpath, 
                release_date:obj.results[count].release_date
                };
                var obj1 = JSON.stringify(movobj);
                filmHTML += "<tr><td><center>"+ movobj.title +"</center></td>";
                filmHTML += '<td><center><img width="200" height="200" src=' + movobj.poster+ '></center></td>';
                filmHTML += '<td><center>' +movobj.release_date+ '</center></td>';
                filmHTML += "<td><center><button  class='btn btn-danger' onclick='addfavourite(event)' value='"+ obj1 +"'>Add to Favourite</button></center></td></tr>";

           }
            $("#listmovies tbody").html(filmHTML);
},
         error:function (err){
             console.log(err);
    }

});
}

function addfavourite(event){
    $.ajax({
        url : '/addtofav',
        type : 'POST',
        data : (JSON.parse(event.target.value))
    });
}

function displayfav(){
    $.ajax({
        url : '/viewfav',
        type : 'GET',
        success : function(data){
            var disHTML = '';
            var disHTML ="<tr><td><center>Title</center></td><td><center>Poster</center></td><td><center>Release_Date</center></td><td><center>DeleteMovie</center></td></tr>";
            for(let i in data){
                 //var delobj = {title:data[i].title,poster:data[i].poster, release_date:data[i].release_date};
                var del = data[i].title;
                disHTML += "<tr >";
                disHTML += '<td><center>' + data[i].title  + '</center></td>';
                disHTML += '<td><center>' + '<img src=' + data[i].poster + '></center></td>';
                disHTML += '<td><center>' + data[i].release_date + '</center></td>';
               disHTML += "<td><center><button class='btn btn-danger'onclick='delfav(event)' value='"+ del +"'>delete</button></center></td>";
                disHTML += '</tr>';
}
    $("#listmovies tbody").html(disHTML);
            
        },
        error:function (err){exit
             console.log(err);
   }     
    });
}

function delfav(event){
      $.ajax({
        url : '/deletefavourite',
        type : 'GET',    
        data:{title:event.target.value},
        success : function(data){
            alert("You have deleted a Movie from favourite");
            displayfav();
        }
    });
}