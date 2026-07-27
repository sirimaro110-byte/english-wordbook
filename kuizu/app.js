console.log(words);
// 現在の問題番号
let current = 0;

// 現在出題する単語リスト
let currentWords = words;

// HTML部品
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const showBtn = document.getElementById("showBtn");
const nextBtn = document.getElementById("nextBtn");
const unitSelect = document.getElementById("unitSelect");

// 問題を表示
function showQuestion(){

    if(currentWords.length === 0){
        question.textContent = "単語がありません";
        answer.textContent = "";
        answer.style.display = "none";
        return;
    }

    question.textContent = currentWords[current].english;
    answer.textContent = currentWords[current].japanese;
    answer.style.display = "none";
}

// Unit変更
unitSelect.addEventListener("change", ()=>{

    if(unitSelect.value === "all"){
        currentWords = words;
    }else{
        currentWords = words.filter(
            word => word.unit === unitSelect.value
        );
    }

    current = 0;
    showQuestion();

});

// 答えを見る
showBtn.addEventListener("click", ()=>{

    answer.style.display = "block";

});
// 次の問題（ランダム出題）
nextBtn.addEventListener("click", () => {

    if (currentWords.length === 0) {
        return;
    }

    // 単語が1つだけならそのまま表示
    if (currentWords.length === 1) {
        current = 0;
    } else {
        let next;

        // 同じ問題が連続しないようにする
        do {
            next = Math.floor(Math.random() * currentWords.length);
        } while (next === current);

        current = next;
    }

    showQuestion();

});

// Enterキーでも答えを表示
document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        answer.style.display = "block";
    }

});

// Spaceキーで次の問題
document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        nextBtn.click();

    }

});

// 最初の問題を表示
showQuestion();
