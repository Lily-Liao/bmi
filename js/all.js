function calculate() {
    var height = document.querySelector('.header__inputHeight').value;
    var weight = document.querySelector('.header__inputWeight').value;
    if (height == '' || weight == '') {
        alert('請輸入身高和體重!');
        return;
    }
    var obj = {};
    obj.height = height;
    obj.weight = weight;

    var bmi = Math.round((weight / ((height * 0.01) ** 2))*100)/100;
    obj.bmi = bmi;

    var result = '';
    if (bmi < 18.5) {
        // result = 'underweight';
        result = '過輕';
    }
    else if (bmi < 25) {
        // result = 'normal';
        result = '理想';
    }
    else if (bmi < 30) {
        // result = 'overweight';
        result = '過重';
    }
    else if (bmi < 35) {
        // result = 'obese_1';
        result = '輕度肥胖';
    }
    else if (bmi < 40) {
        // result = 'obese_2';
        result = '中度肥胖';
    }
    else {
        // result = 'obese_3';
        result = '重度肥胖';
    }
    obj.result = result;
    obj.date = getTodayDate();

    // add data to localStorage
    var history = localStorage.getItem('history');
    var historyArray = (history == null) ? [] : JSON.parse(history);
    historyArray.push(obj);
    localStorage.setItem('history', JSON.stringify(historyArray));

    // view
    var btnBlock = document.querySelector('.header__btn');
    btnBlock.classList.add('saved');
    var btn = document.querySelector('.header__save');
    // btn.textContent = bmi;
    if (document.querySelector('.header__btn p')) {
        return;
    }
    var elStatus = document.createElement('p');
    elStatus.textContent=result;
    switch (result) {
        case '過輕':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-blue"></i>';
            elStatus.setAttribute('class', 'savedResult-blue');
            btn.classList.add('saved-blue');
            btn.disabled = true;
            break;
        case '理想':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-green"></i>';
            elStatus.setAttribute('class', 'savedResult-green');
            btn.classList.add('saved-green');
            btn.disabled = true;
            break;
        case '過重':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-orange"></i>';
            elStatus.setAttribute('class', 'savedResult-orange');
            btn.classList.add('saved-orange');
            btn.disabled = true;
            break;
        case '輕度肥胖':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-darkorange"></i>';
            elStatus.setAttribute('class', 'savedResult-darkOrange');
            btn.classList.add('saved-darkOrange');
            btn.disabled = true;
            break;
        case '中度肥胖':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-darkorange"></i>';
            elStatus.setAttribute('class', 'savedResult-darkOrange');
            btn.classList.add('saved-darkOrange');
            btn.disabled = true;
            break;
        case '重度肥胖':
            btn.innerHTML = bmi + '<i class="fa-solid fa-arrows-rotate reload bg-red"></i>';
            elStatus.setAttribute('class', 'savedResult-red');
            btn.classList.add('saved-red');
            btn.disabled = true;
            break;
    }
    btnBlock.appendChild(elStatus);
    
    if (document.querySelector('.reload')) {
        var reloadBtn = document.querySelector('.reload');
        reloadBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (e.target.nodeName !== "I") return;
            let buttonStr = `
                        <button class="header__save">
                            看結果
                        </button>
            `;
            var headerButton = document.querySelector('.header__btn');
            headerButton.classList.remove("saved");
            headerButton.innerHTML = buttonStr;

            var el = document.querySelector('.header__save');
            el.addEventListener('click', calculate);
        })
    }

    getHistory();

}

function getTodayDate() {
  var today = new Date();
  var yyyy = today.getFullYear();
  var MM = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ("0" + (today.getMonth() + 1));
  var dd = today.getDate() < 10 ? ("0"+today.getDate()) : today.getDate();
  var today = MM + "-" + dd + "-" + yyyy;
  return today;
}

function getHistory() {
    var historyArray = JSON.parse(localStorage.getItem('history'));
    var historyStr = '';
    if (historyArray == null) { return}
    for (var i = 0; i < historyArray.length; i++){
        switch (historyArray[i].result) {
            case '過輕':
                historyStr += "<ul class=history-blue><li>";
                break;
            case '理想':
                historyStr += "<ul class=history-green><li>";
                break;
            case '過重':
                historyStr += "<ul class=history-orange><li>";
                break;
            case '輕度肥胖':
                historyStr += "<ul class=history-darkorange><li>";
                break;
            case '中度肥胖':
                historyStr += "<ul class=history-darkorange><li>";
                break;
            case '重度肥胖':
                historyStr += "<ul class=history-red><li>";
                break;
        }
        historyStr += historyArray[i].result+ "</li> <li> <span class='f-s'>BMI</span> " +
                historyArray[i].bmi + "</li> <li> <span class='f-s'>weight</span> " + historyArray[i].weight +
                "kg</li> <li> <span class='f-s'>height</span> " + historyArray[i].height + "cm</li> <li><span class='f-s'>" +
                historyArray[i].date + "</span></li ></ul> ";
    }
    var records = document.querySelector('.history__records');
    records.innerHTML = historyStr;
    // for (var i = 0; i < historyArray.length; i++){
    //     var record_ul = document.createElement('ul');
    //     record_ul.setAttribute('class', 'record__ul');
    //      liStr = "<li>" + historyArray[i].result + "</li> <li> BMI " +
    //         historyArray[i].bmi + "</li> <li> weight " + historyArray[i].weight +
    //         "kg</li> <li> height " + historyArray[i].height + "cm</li> <li>" +
    //         historyArray[i].date + "</li > ";
    //     record_ul.textContent = liStr;
    //     var records = document.querySelector('.history__records');
    //     records.appendChild(record_ul);
    //     var record_ul2 = document.querySelector('record__ul');
    //     console.log(record_ul2);
    //     liStr = "<li>" + historyArray[i].result + "</li> <li> BMI " +
    //         historyArray[i].bmi + "</li> <li> weight " + historyArray[i].weight +
    //         "kg</li> <li> height " + historyArray[i].height + "cm</li> <li>" +
    //         historyArray[i].date + "</li > ";
    //     record_ul2.innerHTML = liStr;
    // }
}

var el = document.querySelector('.header__save');
el.addEventListener('click', calculate);

getHistory()