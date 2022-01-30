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

  const modClass = 'characteristics__item--selected';
  const maxSelected = 3;
  let selectedCount = 0;

  let selectedIds = [];

  const getDublicate = (arr) => {
    let dublicate = null;
    const items = [...arr];
    items.sort();

    for (let i = 0; i < items.length; i++) {
      if (items[i] === items[i + 1]) {
        dublicate = items[i];
        break;
      }
    }

    return dublicate;
  };

  const setResult = () => {
    const indexes = selectedIds.map((it) => resultsMap[it]);
    const setFromIndexes = new Set(indexes);

    console.log(getDublicate(indexes))

    const index = (setFromIndexes.size === indexes.length) ? indexes[0] : getDublicate(indexes);

    const resultItem = results[index - 1];
    console.log(resultItem)

    resultShortSpan.textContent = results[index - 1].title;
    resultText.textContent = results[index - 1].text;
  };

  chList.onclick = (e) => {
    const item = e.target.closest('.characteristics__item');

    if (item) {
      const isSelected = item.classList.contains(modClass);
      const itemNum = item.dataset.id;

      if (!isSelected && selectedCount < maxSelected) {
        item.classList.add(modClass);
        selectedCount++;
        selectedIds.push(itemNum);

        console.log(selectedIds);
      }

      if (selectedCount === maxSelected) {
        item.blur();
      }

      if (isSelected) {
        item.classList.remove(modClass);
        selectedCount--;
        selectedIds = selectedIds.filter((it) => it !== itemNum);

        console.log(selectedIds);
      }
    }
  };

  heroButton.onclick = (e) => {
    e.preventDefault();
    fullpage_api.moveTo(2);
  };

  getResultButton.onclick = (e) => {
    e.preventDefault();
    // проверить что выбрано 3 качества

    resultSection.classList.remove('hide');
    fp.reBuild();
    setResult();
  };
});