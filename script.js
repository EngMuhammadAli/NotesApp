

const saveBtn = document.querySelector('#savebtn');
const savetitle = document.querySelector('#title');
const savediscription = document.querySelector('#discription');
const notesContainer = document.querySelector('#notes_container');
const Deleteinput =  document.querySelector('#btnDelete');

function addnotes(title , description)
{
   const  body = {

        title : title,
        description : description,
        IsActive : true
        
    }
    fetch("http://localhost:5270/api/Notes", {
        method : "POST",
        body : JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    })
    .then(data => data.json())
    .then(response => {
        ClearForm();
        GetAllNotes();
    })
}

function ClearForm()
{
    savediscription.value= '';
    savetitle.value = '';
    Deleteinput.classList.add("hidden");
}



function displayNotes(notes)
{
   
    let AllNote = '';
    notes.forEach(note => {
      
        const NoteElement =   
                                `
                                        <div class="note" data-id="${note.id}">
                                        <h3>${note.title}</h3>
                                        <p>${note.description}</p>
                                        </div>
                                `

        AllNote += NoteElement;


    });
    notesContainer.innerHTML = AllNote;

    document.querySelectorAll('.note').forEach(note =>{
        note.addEventListener('click' ,function()
        {
            GetNoteById(note.dataset.id)
               
        });
    });
}


function DisplayFormData(note)
{
    savetitle.value = note.title;
    savediscription.value = note.description;
    Deleteinput.classList.remove("hidden");

    Deleteinput.setAttribute('data-id', note.id)
    saveBtn.setAttribute('data-id', note.id)
}

function GetNoteById(id)
{
    console.log(id)
    fetch(`http://localhost:5270/api/Notes/Id?Id=${id}`)
    .then(data => data.json())
    .then(response => DisplayFormData(response));
}

function GetAllNotes()
{
    fetch('http://localhost:5270/api/Notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}







saveBtn.addEventListener('click' , function()
{
    const id = Deleteinput.dataset.id;
    if(id)
    {
        UpdateNote(id , savetitle.value , savediscription.value)
    }
    else
    {
        addnotes(savetitle.value , savediscription.value);
    }
    
});


Deleteinput.addEventListener('click' , function()
{
    const id = Deleteinput.dataset.id;
    DeleteNote(id);
})

function DeleteNote(id)
{
    fetch(`http://localhost:5270/api/Notes/Id?Id=${id}`, {
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    .then(data => data.json())
    .then(response => {
        ClearForm();
        GetAllNotes();
    })
}

function UpdateNote(id , title , description)
{
    const  body = {

        title : title,
        description : description,
        IsActive : true
        
    }
    fetch(`http://localhost:5270/api/Notes/Id?Id=${id}`, {
        method : "PUT",
        body : JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    })
    .then(data => data.json())
    .then(response => {
        ClearForm();
        GetAllNotes();
    })
}