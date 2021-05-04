// UI element k call
let form=document.querySelector('#book-form');
let booklist=document.querySelector('#book-list');

class Book{
    constructor(title,author,isbn){
           this.title=title;
           this.author=author;
           this.isbn=isbn;
    }
}
//book guli ke table a show koranor jonno
class UI{
    // kono constractor na thakay amra static function add korace
   static addToBooklist(book){
         //table_body te list er sob element k show korte
         let list=document.querySelector('#book-list');
         let row=document.createElement('tr'); // notun row create
         row.innerHTML=`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href='#' class="delete">X</a></td>`;
         list.appendChild(row);

         console.log(row);

    }
   static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    //showAlert function ta mainly field check kore response korbe
   static showAlert(massage, className){
         //ekhane akta div create kore sei khane sei khane alert ta show korano hobe
         let div=document.createElement('div');
         div.className=`alert ${className}`; //skeleton er buildin class
         div.appendChild(document.createTextNode(massage));//massage ta pass hobe
         // amra chasse ei massage ta form ta submit haor age show korbe tai
         let container=document.querySelector('.container');
         let form=document.querySelector('#book-form');
         container.insertBefore(div,form);

         
    // alert massage ta 3s pore chole jabe
    setTimeout(function()  {
        document.querySelector('.alert').remove();
    }, 3000);

    }

    // delete kore daor jonno
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            if(confirm ('Are you sure?')){
                let ele=target.parentElement.parentElement;
                ele.remove();

                //local stroage theka delete korte & seta onno akta sibling element k remove
                Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
                // just delete korle e show korbe
                UI.showAlert("Book removed!", "success");
     }
   }
 } 
}
// Local store k handle korar jonno
// value add korbe
 class Store{
     static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){ // local storage a check korbe task na theake faka array dibe
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books')); // jodi task pay seta k json obejct a dibe
        }
        return books; // check kore kicu na theakle khali array r theakle sei array returns korbe

     }
     // book k add korbe
     static addBook(book){
         let books=Store.getBooks(); // nijer function k check korbe value ace naki nei
         books.push(book);  // new task add hobe

        localStorage.setItem('books', JSON.stringify(books)); // new task a ke local storage a add korbe
     }
     // DOM a element k show koranor jonno
     static displayBook(book){
        let books=Store.getBooks(); // nijer function k check korbe value ace naki nei theakle seta show korbe
        books.forEach(function(book){
         
            UI.addToBooklist(book);  // notun generate haoa book k show korbe
        });
     }

     static removeBook(isbn){
        let books=Store.getBooks(); // nijer function k check korbe value ace naki nei theakle seta show korbe
        books.forEach(function(book, index){ // local stroage er upore
            if(book.isbn===isbn){
                books.splice(index, 1);  // task ke remove korbe
            }
          })

          localStorage.setItem('books', JSON.stringify(books));
     }
 } 


// Event listener karon submit korle seta kaj korbe (from er jonno ata)

form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
// Reload daor por o value local stroge theka browser a show koranor jonno

document.addEventListener('DOMContentLoaded',Store.displayBook);

// add functions (newBook,Book use hoyace book a add korte)

function newBook(e){
      e.preventDefault();
       // value guli pass hobe sei guli k nite
       let title=document.querySelector('#title').value,
       author=document.querySelector('#author').value,
       isbn=document.querySelector('#isbn').value; 
       
       //validation
       
       
       
       if(title===''||author===''||isbn===''){  //check input field khali naki full
           UI.showAlert("Please fill all the fields", "error");  
       }
       else{
        // new object call kora book er jonno
          let book=new Book(title,author,isbn);
       // form k book add korte new book k addToBooklist function dia call kora
         
         UI.addToBooklist(book);
         // book add haor pore seta akta massage show korbe
         UI.showAlert("Book Added!", "success"); 
         // book add haor pore sei input field k khali kore dibe
         UI.clearFields();

         // local store a add korte value
         Store.addBook(book); // book add korle seta k nia local stroage a nibe
       }
      

      

}

// element k delete korar jonno

 function removeBook(e){
    e.preventDefault();
    UI.deleteFromBook(e.target);
    
} 


