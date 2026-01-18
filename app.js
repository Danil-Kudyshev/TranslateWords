const HABBIT_KEY = 'HABBIT_KEY';
let habbits = [[], []];

function loadData() {
	const habbitsString = localStorage.getItem(HABBIT_KEY);
	const habbitArray = JSON.parse(habbitsString);
	if (Array.isArray(habbitArray)) {
		habbits = habbitArray;
	}
}
loadData()

function saveData() {
	localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}


const buttonTranslate = document.querySelector('.button_translate')
const buttonNext = document.querySelector('.next_word')
const buttonAdd = document.querySelector('.add_word')

function a() {
    const num = Math.random() * ((habbits[0].length - 0) + 0)
    document.querySelector('.word_end').innerText = habbits[0][Math.floor(num)]
}
a()

function checkWord() {
    const inpitWord = document.querySelector('.word_end1').value
    const pWord = document.querySelector('.word_end').innerText
    try {
        const checkWord = habbits[1].indexOf(toUpp(inpitWord))
        const chech = habbits[0].indexOf(pWord)
        if (checkWord >= 0) {
            if (checkWord == chech) {
                document.querySelector('.button_translate').classList.add('grin')
                document.querySelector('.button_translate').classList.remove('red')
                // Через секунду переключаемся на следующее слово
                setTimeout(() => {
                    nextWord()
                }, 650)
                return true
            } else {
                document.querySelector('.button_translate').classList.add('red')
                document.querySelector('.button_translate').classList.remove('grin')
                return false
            }
        } else {
            document.querySelector('.button_translate').classList.add('red')
            document.querySelector('.button_translate').classList.remove('grin')
            return false
        }
    } catch (e) {
        return
    }
}

function nextWord () {
    if (habbits[0].length == 0) {
        return
    }
    if (document.querySelector('.word_end1').value === '') {
        translate()
        // document.querySelector('.button_translate').classList.add('grin')
        setTimeout (() => {
            document.querySelector('.word_end1').value = ''
            document.querySelector('.button_translate').classList.remove('grin')
            document.querySelector('.button_translate').classList.remove('red')
        a()
        }, 650)
    } else {
        a()
        document.querySelector('.word_end1').value = ''
        document.querySelector('.button_translate').classList.remove('grin')
        document.querySelector('.button_translate').classList.remove('red')
        
    }

}

function addPopup() {
    const a = document.querySelector('.cover')
    a.classList.remove('cover_hidden')    
}

buttonAdd.addEventListener('click', addPopup)
buttonTranslate.addEventListener("click", checkWord)
buttonNext.addEventListener('click', nextWord)
//---------------------------------------



const elements = {
    buttonPopup: document.querySelector('.popup_clouse'),
    cover: document.querySelector('.cover'),
    buttonAddWords: document.querySelector('.add_words'),
    buttonAddWordsTranslate: document.querySelector('.add_wordsTranslate'),
    buttonTranslate: document.querySelector('.button_tr')
}
//Закрывает страницу с добавлением
function clousePopup() {
    elements.cover.classList.add('cover_hidden')
    nextWord()
}
//----------------------------

function pushMass(num, val) {
    habbits[num].push(val)
}

//Создает элемент
function createEl(text) {
    const divEl = document.createElement('div')
    divEl.innerHTML = `<p>${text}</p>
                    <button class="delete_word" onclick="deleteEl(event)"><img src="./delete.svg" alt=""></button>`
    return divEl
}
//----------------------

//Добавляет элемент
function addWordssss(cl, clInput, num) {
    const a = document.querySelector(cl)
    const b = document.querySelector(clInput).value
    if(b === '') {
        return
    } else {
        a.append(createEl(toUpp(b)))
        document.querySelector(clInput).value =''
        pushMass(num, toUpp(b))
        saveData()
    }
}
//----------------------------------------------

// Удалаяет елемент
function deleteEl(event) {
    const target = event.target.closest('div');
    const targetWord = target.querySelector('p').innerText;
    // Проверяем, в каком массиве есть элемент
    const indexInHabbits0 = habbits[0].indexOf(targetWord);
    const indexInHabbits1 = habbits[1].indexOf(targetWord);

    if (target.closest('.wordTranslate_text')) {
        // Удаляем из habbits[1], если есть
        if (indexInHabbits1 !== -1) {
        habbits[1].splice(indexInHabbits1, 1);
        }
    } else {
        // Удаляем из habbits[0], если есть
        if (indexInHabbits0 !== -1) {
        habbits[0].splice(indexInHabbits0, 1);
        }
    }
    // Удаляем элемент со страницы
    target.remove();
    // Обновляем сохраненные данные
    saveData();
        if (habbits[0].length == 0) {
            document.querySelector('.word_end').innerText = 'Добавьте слово'
            return habbits
        }
}

//Конструктор слов
function constructor() {
    habbits[0].forEach((elements, id) => {
        const creatEls = createEl(elements)
        document.querySelector('.word_text').append(creatEls)
    })

    habbits[1].forEach((elements, id) => {
    const creatEls1 = createEl(elements)
    document.querySelector('.wordTranslate_text').append(creatEls1)
    })
}
constructor()
elements.buttonPopup.addEventListener('click', clousePopup)
elements.buttonAddWords.addEventListener('click',() => addWordssss('.word_text', ".input_add_words", 0))
elements.buttonAddWordsTranslate.addEventListener('click',() =>addWordssss('.wordTranslate_text', '.input_add_Transwords', 1))

function translate() {
    if (habbits[0].length === 0 ) {
        return
    }
    const a = document.querySelector('.word_end').innerText
    const checkHabbits = habbits[0].indexOf(a)
    document.querySelector('.word_end1').value = habbits[1][checkHabbits]    
}
elements.buttonTranslate.addEventListener('click', translate)


if (habbits[0].length == 0) {
    document.querySelector('.word_end').innerText = 'Добавьте слово'
}

function toUpp(text) {
    const a = text
    const aa = a.trim()
    const b = aa.split('')
    b[0] = b[0].toUpperCase()
    return b.join('')
}


function replaceWords() {
    const a0 = habbits[0]
    const a1 = habbits[1]
    habbits[0] = a1
    habbits[1] = a0
    console.log(habbits);
    saveData()
    document.querySelector('.wordTranslate_text').innerHTML = ''
    document.querySelector('.word_text').innerHTML = ''
    constructor()
    nextWord ()
    
}
document.querySelector('.button_replace').addEventListener('click', replaceWords )