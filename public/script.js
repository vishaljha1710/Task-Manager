
$(document).ready(function () {
    // const baseUrl = 'http://localhost:3000';
    const baseUrl = 'https://task-manager-2-me0w.onrender.com';

  $("#add").on("click", function () {

          

          var div = $("<div>").addClass("list").attr("draggable", true);

          var img = $('<img />', {
              class: 'bulletin',
              src: 'bulletin.png',
          });

          div.append(img);
          div.append($("#input").val());

          var del = $('<img />', {
              class: 'delete',
              src: 'delete.png',
              id: 'delete',
          });

          div.append(del);
          $("#left").append(div);
          dragAndDrop();
   
    //adding the task to database
    let obj={
        box:"Tasks",
        text:$("#input").val(),
        op:0
     }
     $("#input").val("");
     fetch(`${baseUrl}/dashboard`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
     })
          
      
  });






  $(document).on('click', '.delete', function (e) {

    let obj = {
        box: $(this).parent().parent().find("h1").text().trim(),
        text: $(this).parent().text().trim(),
        op: 2
    }

     fetch(`${baseUrl}/dashboard`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
     })

      $(this).closest('div').remove();
  });





    //to ensure the existing elements have drag and drop feature enabled
    //when the page reload the tasks are loaded from database with just the content
    //the tasks dont have the draganddrop() appended to them
    dragAndDrop();
    //

  function dragAndDrop() {
      $(".list").on("dragstart", function (e) {
          let selected = $(this);

          $("#left, #middle, #right").on("dragover", function (e) {
              e.preventDefault();
          });

          $("#left, #middle, #right").on("drop", function (e) {

            //updating database
            
            let obj={
                box:$(this).find("h1").text().trim(),
                text:$(selected).text(),
                op:1
             }
        
             fetch(`${baseUrl}/dashboard`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
             })
             
             //updating UI

             $(this).append(selected);
              selected = null;
          });
      });
  }
});