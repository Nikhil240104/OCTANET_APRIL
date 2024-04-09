document.addEventListener("DOMContentLoaded", function() {
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  const completedCounter = document.getElementById("completed-counter");
  const uncompletedCounter = document.getElementById("uncompleted-counter");

  function addTask() {
      const task = inputBox.value.trim();
      if (!task) {
          alert("Please write down a task");
          return;
      }

      const li = document.createElement("li");

      li.innerHTML = `
          <label>
              <input type="checkbox">
              <span>${task}</span>
          </label>
          <span class="editbtn">Edit</span>
          <span class="deletebtn">Delete</span>
      `;

      listContainer.querySelector("ul").appendChild(li);
      inputBox.value = "";
      updateCounters();
  }

  function updateCounters() {
      const completedTasks = document.querySelectorAll(".completed").length;
      const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

      completedCounter.textContent = completedTasks;
      uncompletedCounter.textContent = uncompletedTasks;
  }

  listContainer.addEventListener("click", function(event) {
      const target = event.target;
      if (target.type === "checkbox") {
          target.closest("li").classList.toggle("completed", target.checked);
          updateCounters();
      } else if (target.classList.contains("editbtn")) {
          const update = prompt("Edit task:", target.previousElementSibling.textContent);
          if (update !== null) {
              target.previousElementSibling.textContent = update;
              target.closest("li").classList.remove("completed");
              target.previousElementSibling.previousElementSibling.checked = false;
              updateCounters();
          }
      } else if (target.classList.contains("deletebtn")) {
          if (confirm("Are you sure you want to delete this task?")) {
              target.closest("li").remove();
              updateCounters();
          }
      }
  });

  document.getElementById("add-task-button").addEventListener("click", addTask);

  updateCounters(); // Call updateCounters initially to reflect initial state
});
