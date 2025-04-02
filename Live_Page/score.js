score = document.getElementById("score")
let first = false, started = false, second = false
let inn1_bat = []
let inn1_bowl = []
let team1stats = []
let runs = 0, wicket = 0, over = 0.0, ball = 0
let str = 1, total_overs = localStorage.getItem("total_overs")
batter = document.getElementById("bat_table")
bowl_table = document.getElementById("bowl_table")
class batsman {
    constructor(name) {
        this.name = name
        this.run = 0
        this.ball = 0
        this.four = 0
        this.six = 0
        this.rate = 0
    }
    updatebat(i) {
        batter.rows[i].innerHTML = "<td>"+this.name+"</td><td>"+this.run+"</td><td>"+this.ball+"</td><td>"+this.four+"</td><td>"+this.six+"</td><td>"+this.rate+"</td>"
    }
    store(arr) {
        let value = JSON.parse('["'+this.name+'","'+this.run+'","'+this.ball+'","'+this.four+'","'+this.six+'","'+this.rate+'"]')
        if(check(arr,value[0]) == -1) {
            arr.push(value)
        }
        else {
            arr[check(arr,value[0])] = value
        }
    }

}
function check(arr,elem) {
    for (let i=0;i<arr.length;i++) {
        if(arr[i][0]==elem) return i
    }
    return -1
}
class bowler {
    constructor(arr) {
        if(Array.isArray(arr)) {
            this.name = arr[0]
            this.ball = parseInt(arr[1])
            this.over = parseInt(this.ball/6)+"."+(this.ball)%6
            this.maiden = parseInt(arr[2])
            this.run = parseInt(arr[3])
            this.wicket = parseInt(arr[4])
            this.rate = parseInt(arr[5])
        }
        else {
            this.name = arr
            this.ball = 0
            this.over = parseInt(this.ball/6)+"."+(this.ball)%6
            this.maiden = 0
            this.run = 0
            this.wicket = 0
            this.rate = 0
        }
    }
    updatebowl() {
        bowl_table.rows[1].innerHTML = "<td>"+this.name+"</td><td>"+this.over+"</td><td>"+this.maiden+"</td><td>"+this.run+"</td><td>"+this.wicket+"</td><td>"+this.rate+"</td>"
    }
    store(arr) {
        let value = JSON.parse('["'+this.name+'","'+this.ball+'","'+this.maiden+'","'+this.run+'","'+this.wicket+'","'+this.rate+'"]')
        if(check(arr,value[0]) == -1) {
            arr.push(value)
        }
        else {
            arr[check(arr,value[0])] = value
        }
    }

}
let visible = false
function scorecard(button) {
    if(visible == false) {
        display()
        button.innerHTML = "HIDE SCORECARD"
        visible = true
    }  
    else {
        document.getElementById("bla").innerHTML = ""
        button.innerHTML = "SHOW SCORECARD"
        visible = false
    }
}
function display() {
    document.getElementById("bla").innerHTML = "SCORE CARD <br>"
        for (let i=0;i<inn1_bat.length;i++) {
            document.getElementById("bla").innerHTML += inn1_bat[i]+"<br>"
        }
        document.getElementById("bla").innerHTML += "<br><br>"
        for (let i=0;i<inn1_bowl.length;i++) {
            document.getElementById("bla").innerHTML += inn1_bowl[i]+"<br>"
        }
}

document.getElementById("initial").addEventListener("submit",function(event) {
    event.preventDefault()
    strike = document.getElementById("striker").value 
    nonstrike = document.getElementById("nonstriker").value
    bowl = document.getElementById("bowler").value 
    if(second == true) {return}
    if((strike == "" || nonstrike == "" || bowl == "") && started == false) {
        alert("Please fill all fields")
    }
    else if (started == false){
        document.getElementById("change").innerHTML = "Start INNINGS 2"
        if (first == true) {
            document.getElementById("initial").style.display = "none"
        }
        started = true
        start()
    }
    else {return}
    
})
function updatescore() {
    if (first == false) {
        score.innerText = localStorage.getItem("team1")
        score.innerText += " "+runs+"/"+wicket+" ("+over+") vs. "+localStorage.getItem("team2")
    }
    else {
        score.innerText = localStorage.getItem("team2")
        score.innerText += " "+runs+"/"+wicket+" ("+over+") vs. "+localStorage.getItem("team1")+" "+team1stats[0]+"/"+team1stats[1]+" ("+total_overs+".0)"
    }
    if (visible == true) {
        display()
    }
}
function endofinn() {
    bowller.store(inn1_bowl)
    nonstriker.store(inn1_bat)
    let tem = new batsman("inning")
    tem.store(inn1_bat)
    tem = new bowler("inning")
    tem.store(inn1_bowl)
    if (first == false) {first = true}
    else {second = true}
    started = false
    display()
    team1stats[0] = runs
    team1stats[1] = wicket
    ball = 0
    wicket = 0
    runs = 0
    over = 0.0
}
function start() {
    updatescore()
    striker = new batsman(strike)
    nonstriker = new batsman(nonstrike)
    bowller = new bowler(bowl)
    striker.updatebat(1)
    nonstriker.updatebat(2)
    bowller.updatebowl()
    striker.store(inn1_bat)
    nonstriker.store(inn1_bat)
}
function update_store() {
    striker.updatebat(1)
    nonstriker.updatebat(2)
    striker.store(inn1_bat)
    nonstriker.store(inn1_bat)
    bowller.updatebowl()
    bowller.store(inn1_bowl)
    updatescore()
}
function run(button) { 
    if((first == true && started == false) || second == true) {return}
    else if(ball == total_overs*6 && started == true) {
        striker.store(inn1_bat)
        endofinn()
        return
    }
     let nextb = document.getElementById("nxtb").value
    if(ball%6 == 0 && bowller.ball != 0) {
        if(nextb == "") {
            alert("Enter Next Bowler")
            return
        }
        else {
            bowller.store(inn1_bowl)
            if(check(inn1_bowl,nextb) == -1) {
                bowller = new bowler(nextb)
            }
            else {
                bowller = new bowler(inn1_bowl[check(inn1_bowl,nextb)])
            }
        }
    }
    if(button.value == "wide") {
        striker.run += 1
        bowler.run += 1
        striker.rate = parseInt(parseFloat(striker.run)/striker.ball*100)
        bowller.rate = parseInt(parseFloat(bowller.run)/bowller.ball*6)
        update_store()
        return
    } 
    striker.run += parseInt(button.value)
    striker.ball += 1
    bowller.run += parseInt(button.value)
    bowller.ball += 1
    bowller.over = parseInt(bowller.ball/6)+"."+(bowller.ball)%6
    striker.rate = parseInt(parseFloat(striker.run)/striker.ball*100)
    bowller.rate = parseInt(parseFloat(bowller.run)/bowller.ball*6)
    if(button.value == "4") {striker.four += 1}
    else if (button.value == "6") {striker.six += 1}
    else if (button.value == "1" || button.value == "3" || button.value == "5") {
        let temp = nonstriker
        nonstriker = striker
        striker = temp
    }
    runs += parseInt(button.value)
    
    ball += 1
    over = parseInt(ball/6)+"."+(ball)%6
    if(runs > team1stats[0]) {
        second = true
        display()
    }

    update_store()
}
function out() {
    if((first == true && started == false) || second == true) {return}
    else if(ball == total_overs*6 && started == true) {
        endofinn()
        return
    }

    let next = document.getElementById("nxt").value
    if(next == "") {
        alert("Enter Next Batter Name")
    }
    else {
        let nextb = document.getElementById("nxtb").value
    if(ball%6 == 0 && bowller.ball != 0) {
        if(nextb == "") {
            alert("Enter Next Bowler")
            return
        }
        else {
            bowller.store(inn1_bowl)
            if(check(inn1_bowl,nextb) == -1) {
                bowller = new bowler(nextb)
            }
            else {
                bowller = new bowler(inn1_bowl[check(inn1_bowl,nextb)])
            }
        }
    }
    if(check(inn1_bat,next) >=0) {
        alert("Cant bat twice")
        return
     }
        bowller.ball += 1
        bowller.over = parseInt(bowller.ball/6)+"."+(bowller.ball)%6
        bowller.rate = parseInt(parseFloat(bowller.run)/bowller.ball*6)
        bowller.wicket += 1
        ball += 1
        over = parseInt(ball/6)+"."+(ball)%6
        wicket += 1
        striker.ball += 1
        striker.rate = parseInt(parseFloat(striker.run)/striker.ball*100)
        striker.store(inn1_bat)
        striker = new batsman(next)
        striker.store(inn1_bat)
        update_store()
    }
}

