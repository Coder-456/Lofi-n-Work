if (localStorage.getItem('todolist') == null){
    localStorage.setItem('todolist', JSON.stringify([]))
}

document.querySelector('.add').addEventListener('click', function(){
    const todo = document.querySelector('input').value;
    if (todo != ''){
      var todolist = JSON.parse(localStorage.getItem('todolist'))
      todolist.push({"todo":todo})
      localStorage.setItem('todolist',JSON.stringify(todolist))
      document.querySelector('input').value=''
      display()
    }
})

document.querySelector('.play').addEventListener('click', function(){
    var select = document.querySelector('select');
    var trackName = select.options[select.selectedIndex].value; 
    var audioEle = document.querySelector('.audio-element');
    audioEle.src = trackName+'.mp3';
    audioEle.play();
})

document.querySelector('.stop').addEventListener('click', function(){
    var audioEle = document.querySelector('.audio-element');
    audioEle.pause();
})

function display(){

    const displaylist = document.querySelector('ul.todo-items')
    displaylist.innerHTML = ''

    var list = ''
    
    // for (var i = 0; i < tasks.length; i++ ){
    //     list += `<li data-itemindex="${i}">
    //     <span class="item">${tasks[i].todo}</span>
    //     <div><span><button class="delete${i}">Done</button></span></div>
    //     </li>`;
    //   }

    var tasks = JSON.parse(localStorage.getItem('todolist'))
    if (tasks.length != 0){
      for (var i = 0; i < tasks.length; i++ ){
        list += `<li data-itemindex="${i}">
        <div><span class="item"><button class="delete${i}">${tasks[i].todo}</button></span></div>
        </li>`;
      }
      displaylist.innerHTML = list

      var tasklist = document.querySelectorAll('ul li');
      for (var j = 0; j < tasklist.length; j++){
        document.querySelector(`.delete${j}`).addEventListener('click', function(){
          // console.log("this is ",this.parentNode.parentNode.parentNode.dataset.itemindex)
          var index = this.parentNode.parentNode.parentNode.dataset.itemindex;
          itemDelete(index);
          display()         
        })
      }
    }
}

display();
  
function itemDelete(index){

    var itemsStorage = localStorage.getItem('todolist');
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(itemsArr));
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();

}



  