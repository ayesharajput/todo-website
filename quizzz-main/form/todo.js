const firebaseConfig = {
    apiKey: "AIzaSyDwronP6l3fV2igcRqz0zvckz-XuTSycuo",
    authDomain: "authclass-aef15.firebaseapp.com",
    databaseURL: "https://authclass-aef15-default-rtdb.firebaseio.com",
    projectId: "authclass-aef15",
    storageBucket: "authclass-aef15.appspot.com",
    messagingSenderId: "998318861781",
    appId: "1:998318861781:web:751bb1b23d5253453e615c",
    measurementId: "G-MLCNSCTY13"
  };

  firebase.initializeApp(firebaseConfig);

  // Reference to the database
  var database = firebase.database();

  // Load todos from the database on page load
  window.onload = function () {
    loadTodos();
  };

  function loadTodos() {
    var list = document.getElementById("list");
    // Clear existing list items
    list.innerHTML = "";

    // Fetch todos from the database
    database.ref("todos").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var todoText = childSnapshot.val().text;
        // Create list item
        var liElement = document.createElement("li");
        liElement.appendChild(document.createTextNode(todoText));

        // Create delete button
        var delbtn = document.createElement("button");
        delbtn.appendChild(document.createTextNode("Delete"));
        delbtn.setAttribute("onclick", "deleteItem(this)");
        liElement.appendChild(delbtn);

        // Create edit button
        var editbtn = document.createElement("button");
        editbtn.appendChild(document.createTextNode("Edit"));
        editbtn.setAttribute("onclick", "editItem(this)");
        liElement.appendChild(editbtn);

        // Append list item to the list
        list.appendChild(liElement);
      });
    });
  }

  function addtodo() {
    var input = document.getElementById("inputField").value;

    // Push the new todo item to the database
    database.ref("todos").push({
      text: input,
    });

    // Clear the input field
    document.getElementById("inputField").value = "";

    // Reload todos from the database
    loadTodos();
  }

  function deleteAll() {
    // Remove all todos from the database
    database.ref("todos").remove();

    // Reload todos from the database
    loadTodos();
  }

  function deleteItem(x) {
    // Remove the corresponding todo from the database
    database.ref("todos").child(x.parentNode.firstChild.nodeValue).remove();

    // Reload todos from the database
    loadTodos();
  }

  function editItem(e) {
    var input = prompt("Enter updated value...");
  
    // Get the key of the todo item to be edited
    var todoKey = e.parentNode.firstChild.nodeValue;
  
    // Update the corresponding todo in the database using the key
    database.ref("todos/" + todoKey).update({
      text: input,
    });
  
    // Update the text content of the list item
    e.parentNode.firstChild.nodeValue = input;
  }
  