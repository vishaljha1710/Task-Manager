$(document).ready(function(){
  //fucntion for  adding new tasks
    $("#add").on("click",function(){
      if($("#input").val()!=''){
        var div = document.createElement("div");  // Create with DOM
        div.classList.add("list");
        div.draggable="true";
        //appending task image
        var img = $('<img />', { 
          class: 'bulletin',
          src: 'bulletin.png',
        });
        $(div).append(img);
        div.innerHTML += $("#input").val();
        //apending delete button
        var del = $('<img />', { 
          class: 'delete',
          src: 'delete.png',
          id:'delete'
        });
        
        $(div).append(del);
        $("#left").append(div);
        draganddrop();}
    })
  })
draganddrop();
$(document).on('click', '.delete', function (e) {
  $(this).closest('div').remove();
});
//javascript
function draganddrop(){
let lists= document.getElementsByClassName("list");
let rightbox= document.getElementById("right");
let leftbox= document.getElementById("left");
let middlebox= document.getElementById("middle");

for(list of lists){
  list.addEventListener("dragstart",function(e){
    let selected = e.target;
     
    leftbox.addEventListener("dragover",function(e){
      e.preventDefault();
    });
    leftbox.addEventListener("drop",function(e){
      leftbox.appendChild(selected);
      selected=null;
    })
    middlebox.addEventListener("dragover",function(e){
      e.preventDefault();
    });
    middlebox.addEventListener("drop",function(e){
      middlebox.appendChild(selected);
      selected=null;
    })

    rightbox.addEventListener("dragover",function(e){
      e.preventDefault();
    });
    rightbox.addEventListener("drop",function(e){
      rightbox.appendChild(selected);
      selected=null;
    })
  });
}
}