firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User is signed in.");
        $("#user-menu-on").show();
        $("#user-menu-off").hide();
        $("#user-menu-dropdown").text(user.displayName);
        console.log(user);
    } else {
        console.log("No user is signed in.");
        $("#user-menu-off").show();
        $("#user-menu-on").hide();
    }
});
$( document ).ready(function() {
    var provider = new firebase.auth.GithubAuthProvider();
    $("#conect").click(function() {
        $("btnlogin").text("Acessando...");
        $("#conect").prop('disabled', true);
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            $("#conect").addClass("btn-danger");$("#conect").removeClass("btn-primary");
			$("btnlogin").text(errorMessage);
			setTimeout(function(){
				$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Conectar com GitHub");$("#conect").prop('disabled', false);
			}, 3000);
        });
    });
});