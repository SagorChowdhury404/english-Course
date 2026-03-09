console.log("its me");

const url = "https://openapi.programming-hero.com/api/levels/all";

const loadLesson = async () => {
  fetch(url)
    .then((res) => res.json())
    .then((allData) => displayLesson(allData.data));
};

loadLesson();

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson.level_no);

    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
      <button class="flex items-center gap-2 border px-6 py-3 rounded-lg shadow-sm hover:bg-blue-700 hover:text-white transition">
        <i class="fa-solid fa-book-open"></i>
        Lesson ${lesson.level_no}
      </button>
    `;

    levelContainer.append(btnDiv);
  }
};