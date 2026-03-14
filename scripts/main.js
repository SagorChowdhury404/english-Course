// ================= LOAD LESSON BUTTON =================

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data.data));
};

loadLesson();


// ================= SPINNER =================

const manageSpinner = (status) => {

  const spinner = document.getElementById("spinner");
  const words = document.getElementById("word-container");

  if (status) {
    spinner.classList.remove("hidden");
    words.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    words.classList.remove("hidden");
  }

};


// ================= DISPLAY LESSON BUTTON =================

const displayLesson = (lessons) => {

  const levelContainer = document.getElementById("level-container");

  lessons.forEach(lesson => {

    const div = document.createElement("div");

    div.innerHTML = `
      <button 
      id="lessonBtn${lesson.level_no}"
      onclick="loadLevelWord(${lesson.level_no})"
      class="LessonBtn btn btn-outline">

      Lesson ${lesson.level_no}

      </button>
    `;

    levelContainer.append(div);

  });

};


// ================= REMOVE ACTIVE BUTTON =================

const removeActive = () => {

  const buttons = document.querySelectorAll(".LessonBtn");

  buttons.forEach(btn => btn.classList.remove("active"));

};


// ================= LOAD WORDS =================

const loadLevelWord = (id) => {

  manageSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => {

      removeActive();

      const clickedBtn = document.getElementById(`lessonBtn${id}`);
      clickedBtn.classList.add("active");

      displayWords(data.data);

      manageSpinner(false);

    });

};


// ================= DISPLAY WORDS =================

const displayWords = (words) => {

  const container = document.getElementById("word-container");

  container.innerHTML = "";

  if (words.length === 0) {

    container.innerHTML = `
    <div class="text-center col-span-full py-10">

      <img class="mx-auto" src="./assets/alert-error.png"/>

      <p class="text-gray-400 text-xl">
      এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>

      <h2 class="text-3xl font-bold">
      নেক্সট Lesson এ যান
      </h2>

    </div>
    `;

    return;
  }


  words.forEach(word => {

    const div = document.createElement("div");

    div.innerHTML = `
    
    <div class="border p-5 rounded-lg shadow text-center bg-white">

      <h2 class="text-2xl font-bold">
      ${word.word || "No word"}
      </h2>

      <p class="my-2">
      ${word.meaning || "Meaning not found"}
      </p>

      <p class="text-gray-500">
      ${word.pronunciation || ""}
      </p>


      <div class="flex justify-between mt-5">

        <button 
        onclick="loadWordDetails(${word.id})"
        class="btn btn-sm">

        ℹ️

        </button>

        <button 
        onclick="speakWord('${word.word}')"
        class="btn btn-sm">

        🔊

        </button>

      </div>

    </div>

    `;

    container.append(div);

  });

};


// ================= WORD DETAILS =================

const loadWordDetails = (id) => {

  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => displayWordModal(data.data));

};


// ================= MODAL DISPLAY =================

const displayWordModal = (word) => {

  const modal = document.getElementById("modalDisplayData");

  modal.innerHTML = `

  <div class="modal-box">

    <h3 class="text-2xl font-bold">
    ${word.word || "Word not found"}
    </h3>

    <p class="py-2">
    <b>Meaning:</b> ${word.meaning || "Not available"}
    </p>

    <p class="py-2">
    <b>Example:</b> ${word.sentence || "No example"}
    </p>

    <div class="py-3">

      <b>Synonyms:</b>

      ${
        word.synonyms
          ? word.synonyms
              .map(s => `<span class="badge badge-outline m-1">${s}</span>`)
              .join("")
          : "No synonyms"
      }

    </div>


    <div class="modal-action">

      <form method="dialog">
        <button class="btn">Close</button>
      </form>

    </div>

  </div>
  `;

  modal.showModal();

};


// ================= SEARCH VOCABULARY =================

const handleSearch = () => {

  const input = document.getElementById("search-input");
  const word = input.value.trim();

  if(word === ""){
    alert("Please type a word");
    return;
  }

  manageSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/words/search/${word}`)
    .then(res => res.json())
    .then(data => {

      displayWords(data.data);

      manageSpinner(false);

    })
    .catch(err => {
      console.log(err);
      manageSpinner(false);
    });

};


// ================= ENTER KEY SEARCH =================

document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
      handleSearch();
    }

  });


// ================= WORD PRONUNCIATION =================

const speakWord = (word) => {

  const utterance = new SpeechSynthesisUtterance(word);

  window.speechSynthesis.speak(utterance);

};