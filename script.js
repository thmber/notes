
let notesTexts = [];
let backgroundColors = [];
let deletedNotes = [];
let deletedBackgroundColors = [];
load();


function showNotes(){
   clear();
   notes.innerHTML='';
   for (let i = notesTexts.length -1; i > -1; i--) {
        notes.innerHTML +=`
        <div class="notes bg${backgroundColors[i]}" id="note${i}">
            <p>${notesTexts[i]}</p> 
                <div class="delete-container">
                    <img onclick="deleteNoteAnimated(${i})" src="img/paperwaste.png" alt="">
                </div>
        </div>
            `;
   } }
   function clear(){
        document.getElementById('notes').innerHTML='';
   }

   function showDeleted(){
    clear();
    for (let i = deletedNotes.length -1; i > -1; i--) {
         notes.innerHTML +=`
        <div class="notes bg${deletedBackgroundColors[i]}" id="note${i}">
                <p>${deletedNotes[i]}</p> 
                 <div class="delete-container">
                    <img onclick="restore(${i})" src="img/arrow-black.png" alt="">
                    <img onclick="deletePerma(${i})" src="img/paperwaste.png" alt="">
                </div>
        </div>
             `;
    }}

 function deleteAll(){
    clear();
    for (let i = deletedNotes.length -1; i > -1; i--) {
        notes.innerHTML +=`
        <div class="notes animatedelete1">
        <p>${deletedNotes[i]}</p></div>`;}
    deletedNotes = [];
    deletedBackgroundColors = [];
    save();
    setTimeout(showDeleted, 700);
}

function deletePerma(position){
    let permaDeletedNote = document.getElementById(`note${position}`);
    permaDeletedNote.classList.add('animatedelete1')
    deletefromdeletedArray(position);
    setTimeout(showDeleted, 700);
}

function showTrash(){
    document.getElementById('inputbox').classList.add('hide');
    document.getElementById('moveall').classList.add('hide');
    document.getElementById('headline').classList.add('hide')
    document.getElementById('emptytrash').classList.toggle('hide');
    document.getElementById('trasharrow').classList.remove('hide');
    document.getElementById('trashmargin').classList.remove('hide');
    document.getElementById('notes').classList.remove('notes-container-margin');
    document.getElementById('moveall').classList.remove('moveall-margin');
    clear();
    showDeleted();
}

function backFromTrash(){
    document.getElementById('moveall').classList.remove('hide');
    document.getElementById('moveall').classList.remove('hide');
    document.getElementById('emptytrash').classList.add('hide');
    document.getElementById('headline').classList.remove('hide')
    document.getElementById('trasharrow').classList.add('hide');
    document.getElementById('trashmargin').classList.add('hide');
    document.getElementById('moveall').classList.add('moveall-margin');
    clear();
    showNotes();
}

function restore(position){
    clear();
    for (let i = deletedNotes.length -1; i > -1; i--) {
    notes.innerHTML +=`
    <div class="notes bg${deletedBackgroundColors[i]}"><p>${deletedNotes[i]}</p> 
    <div class="delete-container"><img onclick="restore(${i})" src="img/arrow-black.png" alt="">
    <img onclick="deleteNote(${i})" src="img/paperwaste.png" alt=""></div></div></div>`;
    }
    notesTexts.push(deletedNotes[position]);
    backgroundColors.push(deletedBackgroundColors[position]);
    deletefromdeletedArray(position);
    showDeleted();
}

function animateInput(){
    if (notesTexts.length < 1) {
    document.getElementById('inputbox').classList.add('animatejustone');
    setTimeout(function(){
                    document.getElementById('inputbox').classList.remove('animatejustone');
                }, 1000);   
    }
    else
    document.getElementById('inputbox').classList.add('animate');
    setTimeout(function(){
                document.getElementById('inputbox').classList.remove('animate');
            }, 1000);
}

function addNote(){
    let newNoteText = document.getElementById('text');
    if(newNoteText.value==''){
        document.getElementById('text').placeholder = 'Write a note here...!';
        return
    }
    animateInput();
    const random = Math.floor(Math.random() * 10 + 1);
    backgroundColors.push(random);
    notesTexts.push(newNoteText.value);
    document.getElementById('text').value='';
    showNotes();
    save();
    }

function deletefromdeletedArray(position){
        deletedNotes.splice(position,1);
        deletedBackgroundColors.splice(position,1);
        save();
}

function deleteNotefromArray(position){
        deletedNotes.push(notesTexts[position]);
        deletedBackgroundColors.push(backgroundColors[position])
        notesTexts.splice(position,1);
        backgroundColors.splice(position,1);
        save();
    }

function showInputBox (){
    document.getElementById('inputbox').classList.remove('hide');
    document.getElementById('notes').classList.add('notes-container-margin');
    document.getElementById('text').value='';
}

function deleteNoteAnimated(position){
        let deletednote = document.getElementById(`note${position}`);
        deletednote.classList.add('animatedelete')
        deleteNotefromArray(position);
        setTimeout(showNotes, 500);
}

function putAlltoTrash(){
    clear();
    for (let i = notesTexts.length -1; i > -1; i--) {
        deletedNotes.push(notesTexts[i]);
        deletedBackgroundColors.push(backgroundColors[i]);
        notes.innerHTML +=`
        <div class="notes animatedelete">
        <p>${notesTexts[i]}</p></div>`;}
    notesTexts = [];
    backgroundColors = [];
    save();
    setTimeout(showNotes, 700);
}

function load(){
    let notesastext = localStorage.getItem('notesTexts');
    let backgroundColorsastext = localStorage.getItem ('backgroundColors');
    let deletednotesastext = localStorage.getItem('deletedNotes');
    let deletedbackgrounds = localStorage.getItem ('deletedBackgroundColors');
        if(notesastext && backgroundColorsastext && deletednotesastext && deletedbackgrounds){
        notesTexts = JSON.parse(notesastext);
        backgroundColors = JSON.parse(backgroundColorsastext);
        deletedNotes = JSON.parse(deletednotesastext);
        deletedBackgroundColors = JSON.parse(deletedbackgrounds);
}}

function save(){
    let notesTextasText = JSON.stringify(notesTexts);
    localStorage.setItem('notesTexts', notesTextasText);
    let backgroundColorsasText = JSON.stringify(backgroundColors);
    localStorage.setItem('backgroundColors', backgroundColorsasText);
    let deletednotesastext = JSON.stringify(deletedNotes);
    localStorage.setItem('deletedNotes', deletednotesastext);
    let deletedbackgroundcolorsastext = JSON.stringify(deletedBackgroundColors);
    localStorage.setItem('deletedBackgroundColors', deletedbackgroundcolorsastext);
}