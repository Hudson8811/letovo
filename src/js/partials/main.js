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

  
  const resultTypes = ['communication',  'cooperation', 'self-organization',  'study',  'critical-thinking'];

  const results = [
    {
      title: 'Коммуникация',
      text: 'Универсальный метапредметный — и бытовой — навык. Умение налаживать связи с окружающими, чувствовать и узнавать настрой и мнение окружающих — все это важно в любой сфере деятельности. В школе «Летово» коммуникация (кстати, билингвальная!) — одна из основ учебного процесса. Отсутствие классов, широкая и разнообразная сеть взаимодействий, множество групповых форм работы помогают ребенку найти комфортное место в коллективе.',
      image: {
        name: 'communication.svg',
        width: '625',
        height: '640'
      },
      mod: resultTypes[0]
    },
    {
      title: 'Сотрудничество',
      text: 'Как часто можно слышать о специалисте: «Профессионал хороший, но работать с ним — ни за что!» Сегодня, когда почти все начинания требуют работы в коллективе, когда самая блестящая идея не может быть реализована без вклада множества специалистов, умение сотрудничать — один из самых насущных навыков. Командная работа — одна из сильных сторон «Летово»: ученики учатся сотрудничеству, работая в школьном самоуправлении, создавая социальные и благотворительные проекты.',
      image: {
        name: 'cooperation.svg',
        width: '657',
        height: '590'
      },
      mod: resultTypes[1]
    },
    {
      title: 'Самоорганизация',
      text: 'Именно тот метапредметный навык, который «проседает» даже у взрослых людей — и спросите, рады ли они этому? Самоорганизация — залог не только успешной работы, но и гармоничной жизни. Школьники в «Летово» учатся самоорганизации непрерывно, составляя индивидуальный учебный план, отслеживая поставленные перед собой цели, стараясь успеть на все виды активностей, предлагаемые школой, от исторического фехтования до робототехники. Да и жизнь в школе без звонков (а в «Летово» их нет не случайно) способствует развитию организованности.',
      image: {
        name: 'self-organization.svg',
        width: '510',
        height: '532'
      },
      mod: resultTypes[2]
    },
    {
      title: 'Исследование',
      text: 'Стремление «дойти до самой сути» явления ценится во всех профессиональных сферах. Умение поставить исследовательский вопрос, составить план работы и представить результат в «Летово» оттачивается за дискуссионным столом и в химических лабораториях, на выступлениях в формате TED и даже... в спортивных залах. Это не шутка, ведь исследовательский подход важен и в спорте, и в творчестве, и в научной деятельности — а ученики «Летово» должны попробовать себя во всем перечисленном.',
      image: {
        name: 'study.svg',
        width: '468',
        height: '560'
      },
      mod: resultTypes[3]
    },
    {
      title: 'Критическое мышление',
      text: 'Ежечасно на нас обрушивается поток информации, и его плотность продолжает нарастать. Так же будет нарастать «спрос» на умение работать с этой информацией: отделять достоверное, анализировать, использовать в своей деятельности. В «Летово» критическое мышление особенно востребовано в ходе работы над проектами: ученики школы создают востребованные на рынке устройства для исправления осанки, запускают масштабные образовательные проекты, разрабатывают мобильные приложения — и, конечно же, успешно и увлеченно учатся.',
      image: {
        name: 'critical-thinking.svg',
        width: '311',
        height: '653'
      },
      mod: resultTypes[4]
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
  const goToChoiceButton = document.querySelector('.manual__btn');

  let isMobile = document.documentElement.clientWidth <= 800;
  let isDesktopFullpageActive = !isMobile;
  let isMobileFullpageActive = isMobile;
  let fp = null;
  const scrollingSpeed = 700;

  const modClass = 'characteristics__item--selected';
  const maxSelected = 3;
  let selectedCount = 0;

  let selectedIds = [];

  const shareTitle = 'Мой результат теста - Какой он, Ваш ребенок.';
  const shareData = {
    vk: 'https://vk.com/share.php?url=<URL>',
    ok: 'https://connect.ok.ru/offer?url=<URL>&title=' + shareTitle,
    fb: 'https://www.facebook.com/sharer/sharer.php?u=<URL>',
    tw: 'https://twitter.com/intent/tweet?text=' + shareTitle + '&url=<URL>'
  };

  const fpOptions = {
    licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
    autoScrolling: true,
    scrollHorizontally: false,
    verticalCentered: isMobile,
    scrollOverflow: isMobile,
    scrollingSpeed: scrollingSpeed
  };

  const reinit = (section) => {
    fp.destroy('all');
    section.classList.add('active')
    fp = new fullpage('#fullpage', fpOptions);
  };
  
  const getResultUrl = (ids, hash) => {
    return `${window.location.href}?ch1=${ids[0]}&ch2=${ids[1]}&ch3=${ids[2]}#${hash}`;
  };

  const getSelectedFromUrlParams = () => {
    const paramsStr = window.location.href.split('#')[0].split('?')[1];
    const params = paramsStr.split('&');
    return params.map((param) => param.split('=')[1]);
  };

  const setShareLinks = (ids, hash) => {
    const socialItems = resultSection.querySelectorAll('.social__item');
    const url = getResultUrl(ids, hash);

    socialItems.forEach(it => {
      const modClass = it.className.split('social__item social__item--')[1];
      it.href = shareData[modClass].replace('<URL>', url);
    });
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

    setShareLinks(selectedIds, resultItem.mod);

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
    selectedIds = [];
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

  const createResult = (num) => {
    const selectedChListdItems = getSelectedFromUrlParams();

    chList.classList.add('blocked', 'done');
    Array.from(chList.children).forEach((it) => {
      const isSelected = selectedChListdItems.includes(it.dataset.id);
      if (isSelected) {
        it.classList.add(modClass);
      }
    });

    showResultButton.onclick = resetResult;
    resultResetButton.onclick = resetResult;
    showResultButton.textContent = 'Выбрать еще раз';

    ////////////////////////////////////
    const resultItem = results[num];
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
    fp = new fullpage('#fullpage', fpOptions);
    fp.silentMoveTo(5)


  };

  ////////////////////////////////////////////////////
  const hash = window.location.hash.split('#')[1];
  console.log(hash)

  if (resultTypes.includes(hash)) {
    const index = resultTypes.indexOf(hash);
    console.log('cooperation ', index)
    createResult(index);
  } else {
    fp = new fullpage('#fullpage', fpOptions);
    
    showResultButton.onclick = showResult;
    resultResetButton.onclick = resetResult;
  }

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
    fp.moveTo(3);
  };

  goToChoiceButton.onclick = (e) => {
    e.preventDefault();
    fp.moveSectionDown();
  }
});