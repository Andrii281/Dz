const BASE = 'https://swapi.dev/api/';

const charBlock = document.querySelector('.charBlock').querySelector('.charList');
const planetList = document.querySelector('.planetBlock').querySelector('.planetList');

function displayCharacters(characters) {
    charBlock.innerHTML = ' ';
    characters.forEach(char => {
        charBlock.innerHTML +=`
        <div class="charInfo"> 
        <h2>name: ${char.data.name}</h2>
        <h3>birth: ${char.data.birth_year}</h3>
        <h4>gender: ${char.data.gender}</h4>
        </div>`
    });
}  

function displayPlanets(planets, pageNum){
    planetList.innerHTML = ' ';
    for(let i = 0; i < planets.length; i++)
    {
        planetList.innerHTML +=`
        <h3>${((pageNum - 1) * 10 )+ i + 1}. ${planets[i].name}</h2>
        `
    }
}

async function getChars(film) {
    const res = await axios.get(BASE + 'films/');
        console.log(res.data.results[film]);
    return res.data.results[film].characters;

}

async function getPlanets(numOfPlanet) {
    const res = await axios.get(BASE + `planets/?page=${numOfPlanet}`);
    return res.data.results;
}

function getInfo(){
    try{
        const textField = document.querySelector(".textField");
        const film = Number(textField.value)  - 1;
        if(isNaN(film)){
            throw Error("Некоректний ввід");
        }
        textField.value= "";
        const arrChars = [];

        getChars(film).then(async function extractCharacters(chars){
        for(let key of chars){
            const res = await axios.get(key);
            arrChars.push(res);
            }   
        console.log(arrChars);
        displayCharacters(arrChars);
        });
    }catch(error){
        console.log(error.name);
        alert(error.message);
    }
}

let pageNum = 1;

getPlanets(pageNum).then(planets => displayPlanets(planets, pageNum));

function prev(){
    if(pageNum > 1){
        pageNum--;
        getPlanets(pageNum).then(planets => displayPlanets(planets, pageNum));
    }
}
function next(){
    if(pageNum < 6){
        pageNum++;
        getPlanets(pageNum).then(planets => displayPlanets(planets, pageNum));
    }
}



const now = new Date();
console.log(now.getDay());