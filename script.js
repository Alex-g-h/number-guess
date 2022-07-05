// initialize number constants
const number_from = 1;
const number_to = 100;
const try_count = 10;

// initialize variables
let try_number = 0;
let number_generated = 1;
let number_guess = 1;

// initialize literal constants
const result_low = 'Результат: Загаданное число больше, чем введенное';
const result_high = 'Результат: Загаданное число меньше, чем введенное';
const result_equal = 'Результат: Поздравляем! Вы угадали число.';
const result_try_end = 'Результат: Все ' + try_count.toString() + ' попыток угадать число использованы. Начните игру заново.';
const result_initial = 'Результат:';

// get DOM elements
const button_start = document.getElementById("b_start");
const button_check_number = document.getElementById("b_check_number");
const elem_number = document.getElementById("number");
const elem_entered_numbers = document.getElementById("entered_numbers");
const elem_result = document.getElementById("result");
const text_number_from = document.getElementById("span_number_from");
const text_number_to = document.getElementById("span_number_to");
const text_try_count = document.getElementById("span_try_count");

// add event listeners
button_start.addEventListener('click', bStartOnClick);
button_check_number.addEventListener('click', bCheckNumberOnClick);
document.addEventListener('DOMContentLoaded', restartGame);

/**
 * Function generates random value in the range
 * @param {*} gen_from Left boundary of generated random value range
 * @param {*} gen_to Right boundary of generated random value range 
 * @returns Generated random value in range [gen_from; gen_to] included boundaries
 */
function generateRandomNumber(gen_from, gen_to) {
  return Math.floor(Math.random() * (gen_to - gen_from + 1)) + gen_from;
}

/**
 * Function compares entered guess number with generated number
 * @param {*} num_gen Generated number by game
 * @param {*} num_guess Guess number by user
 */
function checkResut(num_gen, num_guess) {
  if (num_gen < num_guess) {
    elem_result.innerHTML = result_high
  }
  else if (num_gen > num_guess) {
    elem_result.innerHTML = result_low
  }
  else {
    elem_result.innerHTML = result_equal;
    restartGame();
  }

  if (try_number >= try_count) {
    elem_result.innerHTML = result_try_end;
    restartGame();
  }
}

/**
 * Auxiliary function to set all buttons and text in proper state
 */
function restartGame() {
  button_start.disabled = false;
  button_check_number.disabled = true;
  elem_number.disabled = true;
  text_number_from.innerHTML = number_from;
  text_number_to.innerHTML = number_to;
  text_try_count.innerHTML = try_count;
}

/**
 * Auxiliary function to set text in proper value
 */
function cleanTextElements() {
  elem_number.value = "";
  elem_entered_numbers.innerHTML = "Введенные числа:";
  elem_result.innerHTML = result_initial;
}

function bStartOnClick() {
  try_number = 0;
  number_generated = generateRandomNumber(number_from, number_to);
  cleanTextElements();
  button_start.disabled = true;
  button_check_number.disabled = false;
  elem_number.disabled = false;
}

function bCheckNumberOnClick() {
  try_number++;
  number_guess = elem_number.value;
  elem_entered_numbers.innerHTML = elem_entered_numbers.innerHTML + ' ' + number_guess.toString();
  checkResut(number_generated, number_guess);
}

