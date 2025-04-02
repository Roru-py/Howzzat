form = document.getElementById("setup")
form.addEventListener("submit",function(event) {
    event.preventDefault();
    let team1 = document.getElementById("Team1").value
    let team2 = document.getElementById("Team2").value
    let tossWinner = document.getElementById("Toss").value
    let tossDecision = document.getElementById("Decision").value
    let overs = document.getElementById("overs").value
    if (team1 == "" || team2 == "") {
        alert("Fill Team1 and Team2 Name");
    }
    else if (tossWinner == "") {
        alert("Choose Toss Winnner")
    }
    else if (overs == "") {
        alert("Choose Toss Winnner")
    }
    else if (tossDecision == "") {
        alert("Choose Decision")
    }
    else {
        localStorage.setItem("team1",team1)
        localStorage.setItem("team2",team2)
        localStorage.setItem("Toss",tossWinner)
        localStorage.setItem("Decision",tossDecision)
        localStorage.setItem("total_overs",overs)
        window.location.href = "/Live_Page/live.html"
    }
})
