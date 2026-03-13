
// displayLesson
const url = "https://openapi.programming-hero.com/api/levels/all";
const loadLesson = async () => {
  fetch(url)
    .then((res) => res.json())
    .then((allData) => {
      displayLesson(allData.data)
    });
};
loadLesson();





const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    // console.log(lesson.level_no);

    const btnDiv = document.createElement("div");




    btnDiv.innerHTML = `
      <button id="categoryLessonBtn${lesson.level_no}" onclick="loadLevelWould(${lesson.level_no})" class="flex items-center gap-2 border px-6 py-3 rounded-lg shadow-sm hover:bg-blue-700 hover:text-white transition LessonBtn ">
  <i class="fa-solid fa-book-open"></i>
  Lesson ${lesson.level_no}
</button>
    `;

    levelContainer.append(btnDiv);
  }
};

const removeActive = () => {
  const LessonBtn = document.querySelectorAll('.LessonBtn');
  LessonBtn.forEach(btn => btn.classList.remove('active'))
  console.log(LessonBtn)
}
// loadLevelDAta 
// loadWordDetail
const loadLevelWould = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then(details => {
      removeActive()
      const clickData = document.getElementById(`categoryLessonBtn${id}`)
      clickData.classList.add('active')
      console.log(clickData)
      displayLevelWould(details.data)
    })


};

const displayLevelWould = (allWords) => {

  const NoWordContainer = document.getElementById("word-container");

  NoWordContainer.innerHTML = "";

  if (allWords.length === 0) {

    NoWordContainer.innerHTML = `
          <div class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla">
                <img class="mx-auto" src="./assets/alert-error.png" />
                <p class="text-xl font-medium text-gray-400 text-center ">
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="font-bold text-4xl text-center ">নেক্সট Lesson এ যান</h2>
            </div>
    `;


    return;
  }

  for (let word of allWords) {

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="border p-4 rounded-lg shadow mb-4 mx-auto text-center">
        <h2 class="text-2xl font-bold mt-4">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>

        <h2 class="font-bold my-6 text-xl">Meaning / pronunciation</h2>

        <p class="text-xl">
          ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}
        </p>

        <div class="flex justify-between items-center mt-5 p-5">
          <button  onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    NoWordContainer.append(div);
  }

};


