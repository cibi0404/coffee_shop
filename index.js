// var menubar = document.querySelector(".menu")
// var sidenav = document.getElementById("sidenav")

// menubar.addEventListener("click", function(){
//     if(event.target){
//         console.log("clicked")
//     }
//     else{
//         console.log("notclicked")
//     }
// })

var menubar = document.querySelector(".menu")
var sidenav = document.getElementById("sidenav")

menubar.addEventListener("click", function(){

    if(sidenav.style.left === "0%"){
        sidenav.style.left = "-60%"
    }
    else{
        sidenav.style.left = "0%"
    }

})