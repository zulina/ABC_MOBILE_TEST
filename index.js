let numSteps = 11;
const progress_step = 100.0 / numSteps;

let timeInterval;

let moreBtn = document.querySelector(".first-section .more"),
    moreDiv = document.querySelector(".more-div"),
    menuBtn = document.querySelector(".menu-btn"),
    menuDiv = document.querySelector(".menu-section"),
    closeBtn = document.querySelector(".close-btn"),
    headerLogo = document.querySelector(".header-logo"),
    headerText = document.querySelector(".header-text"),
    headerTextFinal = document.querySelector(".header-text-final"),
    mainPage = document.querySelector(".main-page"),
    moreInfo = document.querySelector(".more-info"),
    testBtns = document.querySelectorAll(".pass-test"),
    test = document.querySelector(".test"),
    testRadioBtns = document.querySelectorAll(".test-radio-btn"),
    nextBtn = document.querySelector(".next-btn"),
    progress = document.querySelector("progress"),
    testStep = document.querySelector(".step-01"),
    testSelectionColors = document.querySelectorAll(".test-selection-color"),
    testFigureNumbers = document.querySelectorAll(".test-figure-number"),
    testStarNumbers = document.querySelectorAll(".test-star-number"),
    testLoading = document.querySelector(".test-loading-img"),
    timerMM = document.querySelector("#timer-mm"),
    timerSS = document.querySelector("#timer-ss"),
    testCallBtn = document.querySelector(".test-call-btn"),
    testSwapiData = document.querySelector(".test-swapi-data");


function resetAll() {
    progress.value = 0;
    numSteps = 11;

    if (timeInterval) {
        clearInterval(timeInterval);
    }

    headerLogo.style.display = "none";
    headerText.style.display = "none";
    headerTextFinal.style.display = "none";
    test.style.display = "none";
    testStep.style.display = "none";
    testSwapiData.style.display = "none";

    test.style.overflow = "hidden";

    testRadioBtns.forEach(btn => {
        btn.checked = false;
        btn.parentNode.classList.remove('active-radio');
    });

    testSelectionColors.forEach(btn => {
        btn.classList.remove('active-selection-color');
    });

    testFigureNumbers.forEach(btn => {
        btn.classList.remove('active-figure-number');
    });

    testStarNumbers.forEach(btn => {
        btn.classList.remove('active-star-number');
    });

    nextBtn.disabled = true;

    testSwapiData.innerHTML = '';
}

moreBtn.addEventListener('click', () => {
    moreDiv.style.removeProperty("display");
    moreBtn.style.display = "none";
});

menuBtn.addEventListener('click', () => {
    menuDiv.style.removeProperty("display");
});

closeBtn.addEventListener('click', () => {
    menuDiv.style.display = "none";
});

mainPage.addEventListener('click', () => {
    resetAll();

    menuDiv.style.display = "none";  

    document.documentElement.scrollTo(0, 0);
});

moreInfo.addEventListener('click', () => {
    resetAll();

    menuDiv.style.display = "none";
    moreBtn.style.display = "none";

    moreDiv.style.removeProperty("display");
    document.documentElement.scrollTo(0, 568-46);
});

testBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resetAll();

        menuDiv.style.display = "none";
        moreDiv.style.display = "none";

        moreBtn.style.removeProperty("display");
        headerLogo.style.removeProperty("display");
        headerText.style.removeProperty("display");

        testStep = document.querySelector(".step-01");

        test.style.removeProperty("display");
        progress.style.removeProperty("display");
        testStep.style.removeProperty("display");
        nextBtn.style.removeProperty("display");
    });
});

testRadioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        testRadioBtns.forEach(btn => {
            btn.parentNode.classList.remove('active-radio');
            btn.nextElementSibling.classList.remove('active-radio-text');
        });
        btn.parentNode.classList.add('active-radio');
        btn.nextElementSibling.classList.add('active-radio-text');
        nextBtn.disabled = false;
    });
});

testSelectionColors.forEach(btn => {
    btn.addEventListener('click', () => {
        testSelectionColors.forEach(btn => {
            btn.classList.remove('active-selection-color');
        });
        btn.classList.add('active-selection-color');
        nextBtn.disabled = false;
    });
});

testFigureNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        testFigureNumbers.forEach(btn => {
            btn.classList.remove('active-figure-number');
        });
        btn.classList.add('active-figure-number');
        nextBtn.disabled = false;
    });
});

testStarNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        testStarNumbers.forEach(btn => {
            btn.classList.remove('active-star-number');
        });
        btn.classList.add('active-star-number');
        nextBtn.disabled = false;
    });
});

nextBtn.addEventListener('click', () => {
    progress.value = progress.value + progress_step;
    testStep.style.display = "none";
    testStep = testStep.nextElementSibling;
    testStep.style.removeProperty("display");
    nextBtn.disabled = true;
    if (--numSteps === 0) {
        progress.value = 100;
        nextBtn.style.display = "none";
        openTestFinal();
    }
});

function openTestFinal() {
    testLoading.animate([
        {
            transform: 'rotate(0deg)'
        },
        {
            transform: 'rotate(-120deg)'
        },
        {
            transform: 'rotate(-240deg)'
        },
        {
            transform: 'rotate(-360deg)'
        }
    ], {
        duration: 1000,
        iterations: 5
    });
    setTimeout(() => {
        progress.style.display = "none";
        testStep.style.display = "none";
        testStep = testStep.nextElementSibling;
        testStep.style.removeProperty("display");
        headerText.style.display = "none";
        headerTextFinal.style.removeProperty("display");
        test.style.overflow = "auto";
        setClock();
    }, 5000);
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}

function setClock() {

    let mm = 10, ss = 0;

    timeInterval = setInterval(() => {
        if (ss !== 0) {
            ss--;
        } else if (mm > 0) {
            ss = 59;
            mm--;
        } else {
            clearInterval(timeInterval);
            testCallBtn.disabled = true;
        }
        timerMM.textContent = getZero(mm);
        timerSS.textContent = getZero(ss);
    }, 1000);

}

testCallBtn.addEventListener('click', () => {
    getCharacter().then((res) => {
        testSwapiData.innerHTML = `
            <tr>
                <td style="width: 160px;">Имя</td>
                <td style="width: 120px;">${res.name}</td>
            </tr>
            <tr>
                <td>Рост</td>
                <td>${res.height}</td>
            </tr>
            <tr>
                <td>Вес</td>
                <td>${res.mass}</td>
            </tr>
            <tr>
                <td>Цвет волос</td>
                <td>${res.hair_color}</td>
            </tr>
            <tr>
                <td>Цвет кожи</td>
                <td>${res.skin_color}</td>
            </tr>
            <tr>
                <td>Цвет глаз</td>
                <td>${res.eye_color}</td>
            </tr>
            <tr>
                <td>Год рождения</td>
                <td>${res.birth_year}</td>
            </tr>
            <tr>
                <td>Пол</td>
                <td>${res.gender}</td>
            </tr>
        `;
        testSwapiData.style.removeProperty("display");
    }).catch(console.log);  
});

getResource = async (url) => {
    // для постинга всегда указываем объект с параметрами
    let res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
};

getCharacter = async () => {
    const res = await getResource("https://swapi.dev/api/people/1/");
    return res;
}
