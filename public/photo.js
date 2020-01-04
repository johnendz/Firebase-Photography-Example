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
    let id = $.urlParam('id');
    if(user == null || id == null){
        window.location.href = "/";
    }else{
        db.collection("users").doc(user).collection("photos").doc(id).get().then(function(doc) {
            if (doc.exists) {
                $("body").css('background', 'url(' + doc.data().src + ') no-repeat center center fixed');
                $("body").css('background-size', 'cover');
            } else {
                window.location.href = "/";
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
});