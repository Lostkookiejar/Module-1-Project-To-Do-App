async function fetchUrl(url) {
  const data = await fetch(url);
  return await data.json();
}

function startUp() {
  const table = document.getElementById('table');
  const select = document.getElementById('select');
  var array = [];

  fetchUrl('https://jsonplaceholder.typicode.com/todos').then((todos) => {
    for (const todo of todos) {
      //set table of todos
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.innerHTML = `${todo.userId}: ${todo.title}`;
      tr.appendChild(td);
      table.appendChild(tr);

      //set userFilter Id

      if (array.includes(todo.userId)) {
      } else {
        array.push(todo.userId);
        const option = document.createElement('option');
        option.innerHTML = `User ID: ${todo.userId}`;
        option.value = todo.userId;
        select.appendChild(option);
      }
    }
  });
}

function refreshTable() {
  const table = document.getElementById('table');
  const select = document.getElementById('select');
  table.innerHTML = '';

  if (select.value !== 'default') {
    fetchUrl('https://jsonplaceholder.typicode.com/todos').then((todos) => {
      for (const todo of todos) {
        //select.value had to be parseInt'ed to be usable
        const num = parseInt(select.value);

        if (todo.userId === num) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.innerHTML = `${todo.userId}: ${todo.title}`;
          tr.appendChild(td);
          table.appendChild(tr);
        }
      }
    });
  } else {
    startUp();
  }
}
