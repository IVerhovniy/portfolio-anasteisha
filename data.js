const PROJECTS_DATA = {
    'Fintech, NDA': {
        tag: 'Fintech, NDA',
        title: 'Модули оплаты',
        desc: 'Ввод нового функционала и формирование компонентной базы',
        functional: 'QR оплата, платежные ссылки, модули оплаты, white label',
        skills: 'Product Design, System Design',
        role: 'Product Designer',
        context: 'Интегрировал новый функционал в продукт. Поддержка компонентной базы, рефакторинг',
        process: 'На основе анализа конкурентов (криптообменники, криптобиржи) выявил векторы развития функционала и узкие места, которые чаще всего вызывают ошибки у пользователей. Синхронизировал ключевые сценарии и предложил варианты интеграции новых функций в существующую логику интерфейса. Доработки проходили через множество коротких итераций с регулярной обратной связью',
        results: 'Интегрировал новые модули оплаты. Инициировал и реализовал e2e-flow криптообменника для обмена криптовалюты на фиат, повысил retention продукта на 15% и cr на 12%. Переработал дизайн-систему, сократил ttm в ~1,4 раза, время на ревью дизайна на ~6 часов в месяц',
        images: ['projects/project-1-1.webp', 'projects/project-1-2.webp', 'projects/project-1-3.webp', 'projects/project-1-4.webp'],
        nextId: 'Orion, Web 3.0',
        nextTag: 'Orion Web 3.0'
    },
    
    'Orion, Web 3.0': {
        tag: 'Orion Web 3.0',
        title: 'Агрегатор мероприятий',
        desc: 'Архитектура приложения',
        functional: 'Покупка билетов, аксессуаров, общение, задания',
        skills: 'User Flow, Monetization Strategy',
        role: 'Product Design, System Design',
        context: 'Создать узкоспециализированную платформу для монетизации Web 3.0 домена (рекламные слоты, спонсоры, продажа билетов, аксессуаров)',
        process: 'Построил блок-схему приложения, спроектировал user flow по каждой ветке сценариев, screen flow. Итерационно оптимизировал user flow по принципам категоризации пользовательского опыта',
        results: 'MVP передан в разработку за 14 дней',
        images: ['projects/project-2-1.webp', 'projects/project-2-2.webp', 'projects/project-2-3.webp', 'projects/project-2-4.webp'],
        nextId: 'E-com, NDA', 
        nextTag: 'E-com, NDA'
        
    },

    'E-com, NDA': {
        tag: 'E-com, NDA',
        title: 'Система поиска',
        desc: 'Оптимизация cr через тех-ограничения',
        functional: 'Fuzzy Search, Predictive Suggestions, Search Analytics & Filters',
        skills: 'Product Design, System Design',
        role: 'Product Designer',
        context: 'Поиск не обрабатывал опечатки, что приводило к пустой выдаче и оттоку пользователей',
        process: 'Прочитал документацию Elastic, нашел решение проблемы с опечатками. Спроектировал UX поиска с табами-подсказками при вводе для быстрого набора',
        results: 'Поиск по частичному совпадению данных, нет пустой выдачи, 5 табов с подсказками при вводе запроса. Рост ctr в поиск на 16,5%, рост cr продукта 9%',
        images: ['projects/project-3-1.webp', 'projects/project-3-2.webp', 'projects/project-3-3.webp', 'projects/project-3-4.webp'],
        nextId: 'Fintech, NDA',
        nextTag: 'Fintech, NDA'
    },
}