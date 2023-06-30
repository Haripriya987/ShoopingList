import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-491bf-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const input = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingListEl=document.getElementById("shopping-list");

addButton.addEventListener("click", function() {
  let inputValue = input.value;
  push(shoppingListInDB, inputValue, (error) => {
    if (error) {
      console.log("Error adding item to database:", error);
    } else {
      console.log(`${inputValue} added to database`);
    }
    
  });
 clearInput();
});

onValue(shoppingListInDB,function(snapshot){
    if(snapshot.exists()){
        let itemsArray=Object.entries(snapshot.val());
        clearShoppingListEl();
    
        for(let i=0;i<itemsArray.length;i++){
            let currentItem=itemsArray[i];
            let currentItemId=currentItem[0];
            let currentItemValue=currentItem[1];
            appendtoshoppingList(currentItem);
    
        }
    
    }else{
        shoppingListEl.innerHTML="No items here... yet";
    }

})

function clearInput(){
    input.value="";  
}
function clearShoppingListEl(){
    shoppingListEl.innerHTML="";

}
    function appendtoshoppingList(item){
    //shoppingListEl.innerHTML+=`<li>${itemValue}</li>`;
    let itemId=item[0];
    let itemValue=item[1];
let newEl=document.createElement("li");
newEl.textContent=itemValue;
newEl.addEventListener("dblclick",function(){
   // console.log(itemId);
   let exactLocationInDb=ref(database,`shoppingList/${itemId}`)
   remove(exactLocationInDb);
})
shoppingListEl.append(newEl);
}
