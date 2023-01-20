var speed_i = 0;
var speed = 25;
var print_message = '';
var tempButtonsArray = null
let beat = new Audio('type.wav');
function startBtn(){
    prepareSceneList(changeGameSourceToLines())
    beat.play()
    pressbtn('0')
}
function pressbtn(target_id){
    clearp1();
    clearButtons();
    target_scene = findsceneById(target_id);
    id = target_id
    resetTypeWriter(target_scene.get_messages());
    tempButtonsArray = target_scene.get_buttons()
    typeWriter();
}
function clearp1(){
    document.getElementById("p1").innerHTML="";
}
function resetTypeWriter(text){
    speed_i = 0;
    print_message=text
}
function typeWriter() {
    if (speed_i < print_message.length) {
        document.getElementById("p1").innerHTML += print_message.charAt(speed_i);
        speed_i++;
        setTimeout(typeWriter, speed);
    }
    else{
        genButtons(target_scene.buttons)
    }
}
function genButtons(btnArray){
    btnArray.forEach(element=>gen1Button(element))
}
function gen1Button(btnInfo){
    let btn = document.createElement("button");
    btn.textContent = btnInfo.message;
    btn.style = "font-size:2vw; white-space: pre-line;"
    btn.className = "option_button"
    btn.addEventListener("click", function () {
        pressbtn(btnInfo.target)
    });
    document.querySelector('.btn-group').appendChild(btn);
    var br = document.createElement("br");
    var br2 = document.createElement("br");
    document.querySelector('.btn-group').appendChild(br);
    document.querySelector('.btn-group').appendChild(br2);
}
function clearButtons(){
    document.querySelector('.btn-group').innerHTML = "";
}

// Below code related to reading game content
var debuglog = true
function trimStr(str) {
	return str.trim();
}
function notBlank(str) {
	return str != "";
}
function readGameSource(){
    changeGameSourceToLines
}
const changeGameSourceToLines = () => {
    src = document.getElementById("game_source").value
    src = src.replace(/\r\n/g, "\n"); // change CRLF to LF
	src = src.replace(/\n\n/g, "\n<br><br>\n"); // change double blank lines to breaks
	var line = src.split('\n'); // split each line
	line = line.map(trimStr); // run on each element
	line = line.filter(notBlank); // discard empty ones
	if(debuglog) console.log(line.length + " lines found.");
    return line
}
var scenelist = [];
function prepareSceneList(lines) {
    var temp_scene = new Scene()
    var previousLine = ""
    for (var pnum = 0; pnum < lines.length; pnum++) {
        if (pnum == lines.length-1){
            scenelist.push(temp_scene)
        }
        if (lines[pnum].startsWith('//')) {
            comment = lines[pnum].slice(2).trim()
            if(debuglog) console.log('Line '+(pnum+1)+' skip comment: '+ comment);
            previousLine = "//"
        }else
        if (lines[pnum].startsWith('**')) {
            if(pnum != 0) scenelist.push(temp_scene)
            temp_scene = new Scene();
            previousLine = ""
            get_id = lines[pnum].slice(2).trim()
            temp_scene.id = get_id;
            if(debuglog) console.log('Line '+(pnum+1)+' ID: '+get_id);
        }else
        if (lines[pnum].startsWith('^^')) {
            get_message = lines[pnum].slice(2).trim()
            temp_scene.messages = get_message
            if(debuglog) console.log('Line '+(pnum+1)+' message: '+get_message);
            previousLine = "^^"
        }else
        if (lines[pnum].startsWith('&&')) {
            get_button = lines[pnum].slice(2).trim()
            const myArray = get_button.split("++");
            button = new Button(myArray[0],myArray[1])
            temp_scene.buttons.push(button)
            if(debuglog) console.log('Line '+(pnum+1)+' button:'+get_button);
            previousLine == ""
        }else{
            if(previousLine != "^^")  throw new Error('Line '+(pnum+1)+'Unknow line: '+lines[pnum]);
            get_message = lines[pnum]
            temp_scene.messages += "\n"+get_message
            if(debuglog) console.log('Line '+(pnum+1)+' continue message: '+get_message);
        }
    }
}
function findsceneById(in_id){
    target = null
    for (var pnum = 0; pnum < scenelist.length; pnum++) {
        if (scenelist[pnum].id==in_id){
            target = scenelist[pnum]
            return target
        }
    }
    throw new Error("Can't find target id in game_source: " + in_id);
}
class Scene{
    constructor(){
        this.id = ""
        this.messages = ""
        this.buttons = []
    }
    get_id(){
        return this.id
    }
    get_messages(){
        return this.messages
    }
    get_buttons(){
        return this.buttons
    }

}
class Button{
    constructor(message,target){
        this.message=message
        this.target=target
    }
}