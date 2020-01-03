$( document ).ready(function() {
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return decodeURI(results[1]) || 0;
        }
    }
    let user = $.urlParam('user');
    if(user == null){
        window.location.href = "/";
    }else{
        fetch(`https://api.github.com/users/${user}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.login)
                $("#username").html(data.login + " <small>(" + data.name + ")</small>");
                $("#userphoto").attr("src", data.avatar_url);
                let bio = data.bio;
                let company = data.company;
                let location = data.location;
                let blog = data.blog;
                let email = data.email;
                if(bio != null){
                    $("#bio").text(data.bio);
                }
                if(company != null){
                    $("#company").text(data.company);
                }
                if(location != null){
                    $("#location").text(data.location);
                }
                if(blog != null){
                    $("#blog").html("<a href='" + data.blog + "'>Meu Site</a>");
                }
                if(email != null){
                    $("#email").html("<a href='mailto:" + data.email + "'>Enviar Email</a>");
                }                
            })
            .catch(error => window.location.href = "/")
    }
});