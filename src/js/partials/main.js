window.addEventListener('load', () => {
  const resultsMap = {
    a: 5,
    b: 4,
    c: 2,
    d: 5,
    e: 1,
    f: 4,
    g: 2,
    h: 1,
    i: 3,
    j: 3,
    k: 2,
  };

  const results = [
    {
      title: 'Коммуникация',
      text: 'Универсальный метапредметный — и бытовой — навык. Умение налаживать связи с окружающими, чувствовать и узнавать настрой и мнение окружающих — все это важно в любой сфере деятельности. В школе «Летово» коммуникация (кстати, билингвальная!) — одна из основ учебного процесса. Отсутствие классов, широкая и разнообразная сеть взаимодействий, множество групповых форм работы помогают ребенку найти комфортное место в коллективе.'
    },
    {
      title: 'Сотрудничество',
      text: 'Как часто можно слышать о специалисте: «Профессионал хороший, но работать с ним — ни за что!» Сегодня, когда почти все начинания требуют работы в коллективе, когда самая блестящая идея не может быть реализована без вклада множества специалистов, умение сотрудничать — один из самых насущных навыков. Командная работа — одна из сильных сторон «Летово»: ученики учатся сотрудничеству, работая в школьном самоуправлении, создавая социальные и благотворительные проекты. '
    },
    {
      title: 'Самоорганизация',
      text: 'Именно тот метапредметный навык, который «проседает» даже у взрослых людей — и спросите, рады ли они этому? Самоорганизация — залог не только успешной работы, но и гармоничной жизни. Школьники в «Летово» учатся самоорганизации непрерывно, составляя индивидуальный учебный план, отслеживая поставленные перед собой цели, стараясь успеть на все виды активностей, предлагаемые школой, от исторического фехтования до робототехники. Да и жизнь в школе без звонков (а в «Летово» их нет не случайно) способствует развитию организованности.'
    },
    {
      title: 'Исследование',
      text: 'Стремление «дойти до самой сути» явления ценится во всех профессиональных сферах. Умение поставить исследовательский вопрос, составить план работы и представить результат в «Летово» оттачивается за дискуссионным столом и в химических лабораториях, на выступлениях в формате TED и даже... в спортивных залах. Это не шутка, ведь исследовательский подход важен и в спорте, и в творчестве, и в научной деятельности — а ученики «Летово» должны попробовать себя во всем перечисленном.'
    },
    {
      title: 'Критическое мышление',
      text: 'Ежечасно на нас обрушивается поток информации, и его плотность продолжает нарастать. Так же будет нарастать «спрос» на умение работать с этой информацией: отделять достоверное, анализировать, использовать в своей деятельности. В «Летово» критическое мышление особенно востребовано в ходе работы над проектами: ученики школы создают востребованные на рынке устройства для исправления осанки, запускают масштабные образовательные проекты, разрабатывают мобильные приложения — и, конечно же, успешно и увлеченно учатся.'
    }
  ];

  const heroButton = document.querySelector('.hero__btn');
  const getResultButton = document.querySelector('.choice__btn');
  const resultSection = document.querySelector('.result');
  const chList = document.querySelector('.characteristics');
  const resultShortSpan = document.querySelector('.result__short span');
  const resultText = document.querySelector('.result__text');
  const resultForm = document.querySelector('.result form');
  const resultFormNotify = resultForm.querySelector('.notify');
  const resultFormBtn = resultForm.querySelector('button[type="submit"]');

  const fpOptions = {
    licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
    autoScrolling: true,
    scrollHorizontally: false,
    verticalCentered: false,
    afterReBuild: () => {
      fp.moveSectionDown();
    }
  };

  const fp = new fullpage('#fullpage', fpOptions);

  const ErrorMessage = {
    EMPTY: 'Поле обязательно для заполнения.',
    AGE: 'Допускается значение от 3 до 18 лет',
    EMAIL: 'Введите корректный email'
  };

  const modClass = 'characteristics__item--selected';
  const maxSelected = 3;
  let selectedCount = 0;

  let selectedIds = [];

  const postData = (body) => {
    return fetch('/save_form/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };

  const isNameFieldValid = () => {
    return resultForm.name.value !== '';
  };

  const isAgeFieldValid = () => {
    const value = parseInt(resultForm.age.value, 10);
    return value !== '' && (value >= 3 && value < 18);
  };

  const isEmailFieldValid = () => {
    return resultForm.email.value !== '' && resultForm.email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const getDublicate = (arr) => {
    const items = [...arr];
    items.sort();

    for (let i = 0; i < items.length; i++) {
      if (items[i] === items[i + 1]) {
        return items[i];
      }
    }
  };

  const setResult = () => {
    const indexes = selectedIds.map((it) => resultsMap[it]);
    const setFromIndexes = new Set(indexes);

    const index = (setFromIndexes.size === indexes.length) ? indexes[0] : getDublicate(indexes);

    resultShortSpan.textContent = results[index - 1].title;
    resultText.textContent = results[index - 1].text;
  };

  const createErrorMessageElement = (message) => {
    const element = document.createElement('span');
    element.classList.add('message');
    element.textContent = message;
    return element;
  };

  const changeValidityState = (input, message, isValid) => {
    const parent = input.parentElement;
    const messageElement = parent.querySelector('.message');

    parent.classList[isValid ? 'remove' : 'add']('error');

    if (isValid && messageElement !== null) {
      messageElement.remove();
    }

    if (!isValid && messageElement === null) {
      parent.appendChild(createErrorMessageElement(message));
    }
  };


  ////////////////////////////////////////////////////

  chList.onclick = (e) => {
    const item = e.target.closest('.characteristics__item');

    if (item) {
      const isSelected = item.classList.contains(modClass);
      const itemNum = item.dataset.id;

      if (!isSelected && selectedCount < maxSelected) {
        item.classList.add(modClass);
        selectedCount++;
        selectedIds.push(itemNum);
      }

      if (selectedCount === maxSelected) {
        item.blur();
      }

      if (isSelected) {
        item.classList.remove(modClass);
        selectedCount--;
        selectedIds = selectedIds.filter((it) => it !== itemNum);
      }
    }
  };

  heroButton.onclick = (e) => {
    e.preventDefault();
    fullpage_api.moveTo(2);
  };

  getResultButton.onclick = (e) => {
    e.preventDefault();
    
    if (selectedCount === maxSelected) {
      resultSection.classList.remove('hide');
      fp.reBuild();
      setResult();
    }
  };

  resultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = isNameFieldValid();
    const isAgeValid = isAgeFieldValid();
    const isEmailValid = isEmailFieldValid();

    if (isNameValid && isAgeValid && isEmailValid) {
      const btnText = resultFormBtn.textContent;
      const formData = new FormData(resultForm);
      const body = {};

      for (let element of resultForm.elements) {
        element.disabled = true
      }
      resultFormBtn.textContent = 'Отправка заявки...';
      resultFormNotify.textContent = '';
      resultFormNotify.className = 'notify';

      formData.forEach((value, key) => {
        body[key] = value;
      });
      
      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Network status is not 200');
          }
          return response.json();
        })
        .then(data => {
          if (data.error_no === 0) {
            for (let element of resultForm.elements) {
              element.disabled = false
            }
            resultFormBtn.textContent = btnText;
            resultFormNotify.classList.add('success');
            resultFormNotify.textContent = 'Ваша заявка успешно отправлена!';

            setTimeout(() => {
              resultFormNotify.textContent = '';
              resultFormNotify.className = 'notify';
            }, 3000);
          } else if (data.error_no > 0) {
            for (let element of resultForm.elements) {
              element.disabled = false
            }
            resultFormBtn.textContent = btnText;
            resultFormNotify.classList.add('error');
            resultFormNotify.textContent = data.error_text;

            setTimeout(() => {
              resultFormNotify.textContent = '';
              resultFormNotify.className = 'notify';
            }, 3000);
          }
        })
        .catch(error => {
          console.error(error);

          for (let element of resultForm.elements) {
            element.disabled = false
          }
          resultFormBtn.textContent = btnText;
          resultFormNotify.classList.add('error');

          setTimeout(() => {
            resultFormNotify.textContent = '';
            resultFormNotify.className = 'notify';
          }, 3000);
        });
    } else {
      changeValidityState(resultForm.name, ErrorMessage.EMPTY, isNameValid);
      changeValidityState(resultForm.age, ErrorMessage.AGE, isAgeValid);
      changeValidityState(resultForm.email, ErrorMessage.EMAIL, isEmailValid);
    }

    

  });
});