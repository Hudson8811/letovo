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
      text: 'Универсальный метапредметный — и бытовой — навык. Умение налаживать связи с окружающими, чувствовать и узнавать настрой и мнение окружающих — все это важно в любой сфере деятельности. В школе «Летово» коммуникация (кстати, билингвальная!) — одна из основ учебного процесса. Отсутствие классов, широкая и разнообразная сеть взаимодействий, множество групповых форм работы помогают ребенку найти комфортное место в коллективе.',
      image: {
        name: 'communication.svg',
        width: '705',
        height: '624'
      },
      mod: 'communication'
    },
    {
      title: 'Сотрудничество',
      text: 'Как часто можно слышать о специалисте: «Профессионал хороший, но работать с ним — ни за что!» Сегодня, когда почти все начинания требуют работы в коллективе, когда самая блестящая идея не может быть реализована без вклада множества специалистов, умение сотрудничать — один из самых насущных навыков. Командная работа — одна из сильных сторон «Летово»: ученики учатся сотрудничеству, работая в школьном самоуправлении, создавая социальные и благотворительные проекты.',
      image: {
        name: 'cooperation.svg',
        width: '657',
        height: '590'
      },
      mod: 'cooperation'
    },
    {
      title: 'Самоорганизация',
      text: 'Именно тот метапредметный навык, который «проседает» даже у взрослых людей — и спросите, рады ли они этому? Самоорганизация — залог не только успешной работы, но и гармоничной жизни. Школьники в «Летово» учатся самоорганизации непрерывно, составляя индивидуальный учебный план, отслеживая поставленные перед собой цели, стараясь успеть на все виды активностей, предлагаемые школой, от исторического фехтования до робототехники. Да и жизнь в школе без звонков (а в «Летово» их нет не случайно) способствует развитию организованности.',
      image: {
        name: 'self-organization.svg',
        width: '510',
        height: '532'
      },
      mod: 'self-organization'
    },
    {
      title: 'Исследование',
      text: 'Стремление «дойти до самой сути» явления ценится во всех профессиональных сферах. Умение поставить исследовательский вопрос, составить план работы и представить результат в «Летово» оттачивается за дискуссионным столом и в химических лабораториях, на выступлениях в формате TED и даже... в спортивных залах. Это не шутка, ведь исследовательский подход важен и в спорте, и в творчестве, и в научной деятельности — а ученики «Летово» должны попробовать себя во всем перечисленном.',
      image: {
        name: 'study.svg',
        width: '468',
        height: '560'
      },
      mod: 'study'
    },
    {
      title: 'Критическое мышление',
      text: 'Ежечасно на нас обрушивается поток информации, и его плотность продолжает нарастать. Так же будет нарастать «спрос» на умение работать с этой информацией: отделять достоверное, анализировать, использовать в своей деятельности. В «Летово» критическое мышление особенно востребовано в ходе работы над проектами: ученики школы создают востребованные на рынке устройства для исправления осанки, запускают масштабные образовательные проекты, разрабатывают мобильные приложения — и, конечно же, успешно и увлеченно учатся.',
      image: {
        name: 'critical-thinking.svg',
        width: '311',
        height: '653'
      },
      mod: 'critical-thinking'
    }
  ];

  const heroButton = document.querySelector('.hero__btn');
  const choiceSection = document.querySelector('.choice');
  const showResultButton = choiceSection.querySelector('.choice__btn');
  const resultSection = document.querySelector('.result');
  const chList = document.querySelector('.characteristics');
  const resultTitle = document.querySelector('.result__title');
  const resultText = document.querySelector('.result__main-text');
  const resultImageWrapp = document.querySelector('.result__image');

  const resultResetButton = resultSection.querySelector('.__js_reset-result');

  let isMobile = document.documentElement.clientWidth <= 800;
  let isDesktopFullpageActive = !isMobile;
  let isMobileFullpageActive = isMobile;
  let isReset = false;
  let fp = null;
  const scrollingSpeed = 700;

  const fpOptions = {
    licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
    autoScrolling: true,
    scrollHorizontally: false,
    verticalCentered: false,
    scrollOverflow: isMobile,
    scrollingSpeed: scrollingSpeed,
    afterLoad: function() {
      if (isReset) {
        /*resultSection.className = 'result hide';
        resultTitle.textContent = '';
        resultText.textContent = '';
        resultImageWrapp.innerHTML = '';
        fp.destroy('all');
        choiceSection.classList.add('active')
        fp = new fullpage('#fullpage', fpOptions);

        isReset = false;*/
      }
    }
  };

  fp = new fullpage('#fullpage', fpOptions);

  const modClass = 'characteristics__item--selected';
  const maxSelected = 3;
  let selectedCount = 0;

  let selectedIds = [];

  const reinit = (section) => {
    fp.destroy('all');
    section.classList.add('active')
    fp = new fullpage('#fullpage', fpOptions);
  };

  const debounce = function(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
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

    const resultItem = results[index - 1];

    const image = new Image();
    image.src = `images/${resultItem.image.name}`;
    image.width = resultItem.image.width;
    image.height = resultItem.image.height;

  
    resultSection.classList.remove('hide');
    resultSection.classList.add('section', `result--${resultItem.mod}`);


    resultTitle.textContent = resultItem.title;
    resultText.textContent = resultItem.text;
    resultImageWrapp.appendChild(image);
  };

  const showResult = (e) => {
    e.preventDefault();
    
    if (selectedCount === maxSelected) {
      const activeSection = document.querySelector('.section.active');

      showResultButton.onclick = resetResult;
      resultResetButton.onclick = resetResult;
      chList.classList.add('blocked');

      setResult();

      fp.destroy('all');
      activeSection.classList.add('active');
      fp = new fullpage('#fullpage', fpOptions);
      fp.moveSectionDown();

      setTimeout(() => {
        showResultButton.textContent = 'Выбрать еще раз';
      }, scrollingSpeed);
    }
  };

  const resetResult = (e) => {
    e.preventDefault();

    const reset = () => {
      resultSection.className = 'result hide';
      resultTitle.textContent = '';
      resultText.textContent = '';
      resultImageWrapp.innerHTML = '';

      reinit(choiceSection);
    };

    showResultButton.textContent = 'Получить результат';
    showResultButton.onclick = showResult;
    resultResetButton.onclick = null;

    chList.classList.remove('blocked', 'done');
    selectedCount = 0;
    chList.querySelectorAll('.characteristics__item').forEach((it) => it.classList.remove(modClass));

    if (e.target === resultResetButton) {
      fp.moveSectionUp();
      setTimeout(reset, scrollingSpeed);
    } else {
      reset();
    }
    
  };

  const reinitFullpage = debounce(() => {
    const activeSection = document.querySelector('.section.active');

    if (isMobile && !isMobileFullpageActive) {
      isMobileFullpageActive = true;
      isDesktopFullpageActive = false;
      reinit(activeSection);
    }

    if (!isMobile && !isDesktopFullpageActive) {
      isMobileFullpageActive = false;
      isDesktopFullpageActive = true;
      reinit(activeSection);
    }
  }, 50, false);

  // Только для тестирования
  window.createResult = (num) => {
    const activeSection = document.querySelector('.section.active');
      fp.destroy('all');
    
      ////////////////////////////////////
    const resultItem = results[num - 1];
    const image = new Image();
    image.src = `images/${resultItem.image.name}`;
    image.width = resultItem.image.width;
    image.height = resultItem.image.height;

    resultSection.classList.remove('hide');
    resultSection.classList.add('section', `result--${resultItem.mod}`);

    resultTitle.textContent = resultItem.title;
    resultText.textContent = resultItem.text;
    resultImageWrapp.innerHTML = '';
    resultImageWrapp.appendChild(image);
    
    ///////////////////////////////
    activeSection.classList.add('active');
    fp = new fullpage('#fullpage', fpOptions);
    fp.moveSectionDown();
  };

  ////////////////////////////////////////////////////

  window.addEventListener('resize', () => {
    isMobile = document.documentElement.clientWidth <= 800;
    fpOptions.scrollOverflow = isMobile;
    reinitFullpage();
  });


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

      if (isSelected) {
        item.classList.remove(modClass);
        item.blur();
        selectedCount--;
        selectedIds = selectedIds.filter((it) => it !== itemNum);
      }

      if (selectedCount === maxSelected) {
        item.blur();
        chList.classList.add('done');
      } else {
        chList.classList.remove('done');
      }
    }
  };

  heroButton.onclick = (e) => {
    e.preventDefault();
    fp.moveTo(2);
  };

  showResultButton.onclick = showResult;
  resultResetButton.onclick = resetResult;
});