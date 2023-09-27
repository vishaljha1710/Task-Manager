
$(document).ready(function () {
    

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
     fetch('http://localhost:3000/dashboard',{
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

     fetch('http://localhost:3000/dashboard',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
     })

      $(this).closest('div').remove();
  });






  dragAndDrop();

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
        
             fetch('http://localhost:3000/dashboard',{
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