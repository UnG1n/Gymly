import benchPressImg from '../assets/exercises/bench-press.png';
import dumbbellPressImg from '../assets/exercises/dumbbell-press.png';
import inclineBenchPressImg from '../assets/exercises/incline-bench-press.png';
import inclineDumbbellPressImg from '../assets/exercises/incline-dumbbell-press.png';
import pecDeckImg from '../assets/exercises/pec-deck.png';
import dumbbellFlyImg from '../assets/exercises/dumbbell-fly.png';

import pullUpImg from '../assets/exercises/pull-up.png';
import bandPullUpImg from '../assets/exercises/band-pull-up.png';
import seatedRowImg from '../assets/exercises/seated-row.png';
import latPulldownImg from '../assets/exercises/lat-pulldown.png';
import reverseCableFlyImg from '../assets/exercises/reverse-cable-fly.png';
import hyperextensionImg from '../assets/exercises/hyperextension.png';

import legPressImg from '../assets/exercises/leg-press.png';
import legExtensionImg from '../assets/exercises/leg-extension.png';
import legCurlImg from '../assets/exercises/leg-curl.png';
import bulgarianSplitSquatImg from '../assets/exercises/bulgarian-split-squat.png';
import barbellSquatImg from '../assets/exercises/barbell-squat.png';

import barbellFrenchPressImg from '../assets/exercises/barbell-french-press.png';
import dumbbellFrenchPressImg from '../assets/exercises/dumbbell-french-press.png';
import cableTricepsPushdownImg from '../assets/exercises/cable-triceps-pushdown.png';
import dumbbellCurlImg from '../assets/exercises/dumbbell-curl.png';
import barbellCurlImg from '../assets/exercises/barbell-curl.png';

import dumbbellShoulderPressImg from '../assets/exercises/dumbbell-shoulder-press.png';
import dumbbellLateralRaiseImg from '../assets/exercises/dumbbell-lateral-raise.png';
import dumbbellFrontRaiseImg from '../assets/exercises/dumbbell-front-raise.png';
import barbellOverheadPressImg from '../assets/exercises/barbell-overhead-press.png';

import floorCrunchImg from '../assets/exercises/floor-crunch.png';
import declineCrunchImg from '../assets/exercises/decline-crunch.png';
import machineCrunchImg from '../assets/exercises/machine-crunch.png';
import legRaiseImg from '../assets/exercises/leg-raise.png';
import plankImg from '../assets/exercises/plank.png';


export const exercises = [
    {
        id: 1,
        title: 'Жим штанги лежа',
        image: benchPressImg,
        description: 'Базовое упражнение для развития грудных мышц, выполняемое на горизонтальной скамье.',
        technique: [
            'Лягте на горизонтальную скамью, стопы плотно прижаты к полу.',
            'Возьмите штангу хватом чуть шире плеч.',
            'Опустите штангу к середине груди, контролируя движение.',
            'Выжмите штангу вверх до полного разгибания рук.'
        ],
        tip: 'Держите спину слегка прогнутой и избегайте рывков.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'chest'
    },
    {
        id: 2,
        title: 'Жим гантелей лежа',
        image: dumbbellPressImg,
        description: 'Альтернатива жиму штанги, позволяющая увеличить амплитуду движения.',
        technique: [
            'Лягте на горизонтальную скамью, держите гантели на уровне груди.',
            'Поднимайте гантели вверх, сводя их в верхней точке.',
            'Опускайте гантели медленно и контролируемо.'
        ],
        tip: 'Не касайтесь гантелями друг друга, чтобы сохранить напряжение.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'chest'
    },
    {
        id: 3,
        title: 'Жим штанги на наклонной скамье',
        image: inclineBenchPressImg,
        description: 'Упражнение для акцента на верхнюю часть грудных мышц.',
        technique: [
            'Установите наклонную скамью под углом 30–45 градусов.',
            'Возьмите штангу хватом чуть шире плеч.',
            'Опустите штангу к верхней части груди и выжмите вверх.'
        ],
        tip: 'Контролируйте движение, избегайте слишком большого наклона.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'chest'
    },
    {
        id: 4,
        title: 'Жим гантелей на наклонной скамье',
        image: inclineDumbbellPressImg,
        description: 'Упражнение для проработки верхней части грудных мышц с большей амплитудой движения.',
        technique: [
            'Лягте на наклонную скамью, держа гантели на уровне груди.',
            'Поднимайте гантели вверх, сводя их в верхней точке.',
            'Опускайте гантели плавно и контролируемо.'
        ],
        tip: 'Держите локти слегка согнутыми для безопасности.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'chest'
    },
    {
        id: 5,
        title: 'Сведение в тренажере',
        image: pecDeckImg,
        description: 'Изолирующее упражнение для внутренней части грудных мышц.',
        technique: [
            'Сядьте в тренажер "бабочка", руки держите на уровне груди.',
            'Сводите руки перед собой до полного сокращения грудных мышц.',
            'Медленно возвращайтесь в исходное положение.'
        ],
        tip: 'Не опускайте руки слишком быстро - контролируйте движение.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'chest'
    },
    {
        id: 6,
        title: 'Сведение с гантелями',
        image: dumbbellFlyImg,
        description: 'Упражнение для растяжения и формирования грудных мышц.',
        technique: [
            'Лягте на горизонтальную скамью, держите гантели над грудью.',
            'Разводите руки в стороны до ощущения растяжения в грудных мышцах.',
            'Вернитесь в исходное положение, сводя руки вместе.'
        ],
        tip: 'Не опускайте руки ниже уровня плеч.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'chest'
    },
    {
        id: 7,
        title: 'Подтягивания',
        image: pullUpImg,
        description: 'Базовое упражнение для развития широчайших мышц спины и силы рук.',
        technique: [
            'Возьмитесь за перекладину широким хватом ладонями вперед.',
            'Поднимайтесь вверх до уровня подбородка над перекладиной.',
            'Медленно опускайтесь вниз до полного выпрямления рук.'
        ],
        tip: 'Старайтесь выполнять подтягивания напрягая спину, а не руки.',
        repsRecommended: ['3–5 подходов по 6–12 повторений'],
        muscle: 'back'
    },
    {
        id: 8,
        title: 'Подтягивания с резиной',
        image: bandPullUpImg,
        description: 'Упрощенный вариант подтягиваний с использованием резинового эспандера для помощи.',
        technique: [
            'Закрепите резину на перекладине и поместите ноги или колени в петлю.',
            'Возьмитесь за перекладину широким хватом ладонями вперед.',
            'Поднимайтесь вверх до уровня подбородка над перекладиной.',
            'Медленно опускайтесь вниз, контролируя движение.'
        ],
        tip: 'Следите за тем, чтобы резина не была слишком натянута - это уменьшит нагрузку.',
        repsRecommended: ['3–4 подхода по 8–15 повторений'],
        muscle: 'back'
    },
    {
        id: 9,
        title: 'Нижний блок',
        image: seatedRowImg,
        description: 'Упражнение для проработки широчайших мышц спины с использованием тренажера.',
        technique: [
            'Сядьте на тренажер, ноги поставьте на упоры, спина прямая.',
            'Возьмитесь за ручку блока и потяните её к животу, сводя лопатки.',
            'Медленно верните ручку в исходное положение.'
        ],
        tip: 'Не округляйте спину и избегайте рывков.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'back'
    },
    {
        id: 10,
        title: 'Верхний блок',
        image: latPulldownImg,
        description: 'Упражнение для развития широчайших мышц спины с помощью тяги верхнего блока.',
        technique: [
            'Сядьте на тренажер, ноги поставьте под упоры, возьмитесь за ручку широким хватом.',
            'Потяните ручку вниз к подбородку, сводя лопатки.',
            'Медленно верните ручку в исходное положение.'
        ],
        tip: 'Держите корпус неподвижным и избегайте раскачивания.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'back'
    },
    {
        id: 11,
        title: 'Задняя дельта в верхнем блоке',
        image: reverseCableFlyImg,
        description: 'Изолирующее упражнение для задней части плеч и верхней части спины.',
        technique: [
            'Возьмитесь за ручки верхнего блока крест-накрест.',
            'Потяните руки назад, разводя их в стороны до уровня плеч.',
            'Медленно верните руки в исходное положение.'
        ],
        tip: 'Держите локти слегка согнутыми для безопасности.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'back'
    },
    {
        id: 12,
        title: 'Гиперэкстензия',
        image: hyperextensionImg,
        description: 'Упражнение для укрепления мышц поясницы.',
        technique: [
            'Лягте на тренажер для гиперэкстензии так, чтобы таз находился на краю платформы.',
            'Опуститесь вниз, сгибая корпус в тазобедренном суставе.',
            'Поднимайтесь вверх до прямой линии тела, напрягая поясницу и ягодицы.'
        ],
        tip: 'Не поднимайтесь слишком высоко - это может перегрузить поясницу.',
        repsRecommended: ['3–4 подхода по 12–20 повторений'],
        muscle: 'back'
    },
    {
        id: 13,
        title: 'Жим ногами',
        image: legPressImg,
        description: 'Базовое упражнение для квадрицепсов и ягодиц с использованием тренажера.',
        technique: [
            'Сядьте в тренажер, поставьте стопы на платформу на ширине плеч.',
            'Выжмите платформу вверх, разгибая ноги.',
            'Медленно опустите платформу вниз, сгибая колени до угла примерно в 90 градусов.'
        ],
        tip: 'Не отрывайте пятки от платформы.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'legs'
    },
    {
        id: 14,
        title: 'Разгибание',
        image: legExtensionImg,
        description: 'Изолирующее упражнение для квадрицепсов с использованием тренажера.',
        technique: [
            'Сядьте в тренажер, установите валик над голенями.',
            'Разгибайте ноги до полного выпрямления коленей.',
            'Медленно возвращайтесь в исходное положение.'
        ],
        tip: 'Контролируйте движение и не используйте слишком большой вес.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'legs'
    },
    {
        id: 15,
        title: 'Сгибание',
        image: legCurlImg,
        description: 'Упражнение для задней поверхности бедра с использованием тренажера.',
        technique: [
            'Лягте на тренажер лицом вниз, установите валик над ахилловым сухожилием.',
            'Сгибайте ноги, подтягивая валик к ягодицам.',
            'Медленно возвращайтесь в исходное положение.'
        ],
        tip: 'Следите за тем, чтобы не поднимать таз во время выполнения.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'legs'
    },
    {
        id: 16,
        title: 'Болгарские выпады',
        image: bulgarianSplitSquatImg,
        description: 'Модифицированные выпады с задней ногой на скамье, направленные на квадрицепсы и ягодичные мышцы.',
        technique: [
            'Встаньте спиной к скамье, сделайте шаг вперед одной ногой.',
            'Положите заднюю ногу на скамью, шнуровкой вниз.',
            'Опуститесь вниз, сохраняя спину прямой и переднюю ногу под прямым углом.',
            'Оттолкнитесь передней ногой, чтобы вернуться в исходное положение.'
        ],
        tip: 'Следите за балансом и не допускайте наклона корпуса.',
        repsRecommended: ['3–4 подхода по 10–12 повторений на каждую ногу'],
        muscle: 'legs'
    },
    {
        id: 17,
        title: 'Приседания с штангой',
        image: barbellSquatImg,
        description: 'Базовое упражнение для развития силы ног и ягодиц с использованием штанги.',
        technique: [
            'Встаньте прямо, положите штангу на плечи.',
            'Сделайте глубокий вдох и начните приседать, сохраняя спину прямой.',
            'Опуститесь вниз до тех пор, пока бедра не окажутся параллельно полу.',
            'Выдохните и оттолкнитесь от пола, чтобы вернуться в исходное положение.'
        ],
        tip: 'Не округляйте спину и держите колени над пятками.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'legs'
    },
    {
        id: 18,
        title: 'Французский жим со штангой',
        image: barbellFrenchPressImg,
        description: 'Упражнение для трицепса с использованием штанги, выполняемое лежа.',
        technique: [
            'Лягте на горизонтальную скамью, возьмите кривой гриф узким хватом.',
            'Поднимите штангу над головой, затем медленно опустите её за голову, сгибая локти.',
            'Верните штангу в исходное положение, разгибая локти.'
        ],
        tip: 'Держите локти неподвижными, чтобы изолировать трицепсы.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'arms'
    },
    {
        id: 19,
        title: 'Французский жим с гантелями',
        image: dumbbellFrenchPressImg,
        description: 'Альтернатива французскому жиму со штангой, позволяющая увеличить амплитуду движения.',
        technique: [
            'Лягте на горизонтальную скамью, держите гантели в руках.',
            'Поднимите гантели над головой, затем опустите их за голову, сгибая локти.',
            'Верните гантели в исходное положение, разгибая локти.'
        ],
        tip: 'Следите за симметрией движения обеих рук.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'arms'
    },
    {
        id: 20,
        title: 'Разгибание с прямой ручкой',
        image: cableTricepsPushdownImg,
        description: 'Упражнение для трицепсов с использованием тренажера и прямой ручки.',
        technique: [
            'Встаньте перед тренажером и возьмитесь за прямую ручку хватом сверху.',
            'Разгибайте руки вниз до полного выпрямления локтей.',
            'Медленно верните ручку в исходное положение.'
        ],
        tip: 'Держите локти неподвижными и прижатыми к телу.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'arms'
    },
    {
        id: 21,
        title: 'Разгибание с канатом',
        image: cableTricepsPushdownImg,
        description: 'Упражнение для трицепсов с использованием каната для увеличения амплитуды движения.',
        technique: [
            'Встаньте перед тренажером и возьмитесь за канат обеими руками.',
            'Разгибайте руки вниз, разводя канат в стороны в нижней точке.',
            'Медленно верните канат в исходное положение.'
        ],
        tip: 'Разводите руки максимально широко для лучшей проработки трицепсов.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'arms'
    },
    {
        id: 22,
        title: 'Бицепс с гантелями',
        image: dumbbellCurlImg,
        description: 'Классическое упражнение для бицепсов, выполняемое стоя с гантелями.',
        technique: [
            'Встаньте прямо, держите гантели в руках ладонями вперед.',
            'Сгибайте руки в локтях, поднимая гантели к плечам.',
            'Медленно опускайте гантели в исходное положение.'
        ],
        tip: 'Не раскачивайте корпус во время выполнения.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'arms'
    },
    {
        id: 23,
        title: 'Бицепс с штангой',
        image: barbellCurlImg,
        description: 'Базовое упражнение для бицепсов с использованием штанги.',
        technique: [
            'Встаньте прямо, держите штангу хватом снизу на ширине плеч.',
            'Сгибайте руки в локтях, поднимая штангу к плечам.',
            'Медленно опускайте штангу в исходное положение.'
        ],
        tip: 'Держите локти неподвижными и избегайте рывков.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'arms'
    },
    {
        id: 24,
        title: 'Жим гантелей сидя',
        image: dumbbellShoulderPressImg,
        description: 'Базовое упражнение для дельтовидных мышц, выполняемое сидя с гантелями.',
        technique: [
            'Сядьте на скамью с вертикальной спинкой, держите гантели на уровне плеч.',
            'Поднимайте гантели вверх до полного разгибания рук.',
            'Медленно опускайте гантели обратно на уровень плеч.'
        ],
        tip: 'Держите спину ровной и не используйте слишком тяжелый вес.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'shoulders'
    },
    {
        id: 25,
        title: 'Махи гантелями в стороны',
        image: dumbbellLateralRaiseImg,
        description: 'Изолирующее упражнение для средней части дельтовидных мышц.',
        technique: [
            'Встаньте прямо или слегка наклонитесь вперед, держите гантели в руках ладонями внутрь.',
            'Поднимайте руки в стороны до уровня плеч.',
            'Медленно опускайте руки обратно вниз.'
        ],
        tip: 'Не поднимайте руки выше уровня плеч.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'shoulders'
    },
    {
        id: 26,
        title: 'Махи гантелями перед собой',
        image: dumbbellFrontRaiseImg,
        description: 'Упражнение для передней части дельтовидных мышц.',
        technique: [
            'Встаньте прямо, держите гантели перед собой ладонями вниз.',
            'Поднимайте одну или обе руки вперед до уровня плеч.',
            'Медленно возвращайтесь в исходное положение.'
        ],
        tip: 'Следите за тем, чтобы движение было плавным.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'shoulders'
    },
    {
        id: 27,
        title: 'Жим штанги стоя',
        image: barbellOverheadPressImg,
        description: 'Базовое упражнение для развития дельтовидных мышц, выполняемое стоя с штангой.',
        technique: [
            'Встаньте прямо, ноги на ширине плеч или чуть шире.',
            'Возьмите штангу хватом чуть шире плеч, ладони обращены вперед.',
            'Поднимите штангу на грудь, сохраняя спину прямой и плечи расправленными.',
            'На выдохе выжмите штангу вверх, не отклоняя голову назад.',
            'В верхней точке задержитесь на мгновение, затем на вдохе медленно опустите штангу обратно на грудь.'
        ],
        tip: 'Держите локти направленными вперед и избегайте рывков. Следите за тем, чтобы спина оставалась прямой и не прогибалась.',
        repsRecommended: ['3–4 подхода по 8–12 повторений'],
        muscle: 'shoulders'
    },
    {
        id: 28,
        title: 'Скручивания на полу',
        image: floorCrunchImg,
        description: 'Базовое упражнение для развития мышц живота, выполняемое лежа на полу.',
        technique: [
            'Лягте на спину, руки за голову, ноги согнуты в коленях.',
            'На выдохе поднимите верхнюю часть тела, отрывая лопатки от пола.',
            'Задержитесь в верхней точке на мгновение, затем плавно вернитесь в исходное положение.'
        ],
        tip: 'Не тяните голову руками, чтобы избежать нагрузки на шею.',
        repsRecommended: ['3–4 подхода по 15–20 повторений'],
        muscle: 'abs'
    },
    {
        id: 29,
        title: 'Скручивания на наклонной скамье',
        image: declineCrunchImg,
        description: 'Упражнение для акцента на верхнюю часть мышц живота.',
        technique: [
            'Лягте на наклонную скамью, ноги зафиксируйте на валиках.',
            'Руки положите на грудь или возьмитесь за уши.',
            'На выдохе поднимите верхнюю часть тела, отрывая лопатки от скамьи.',
            'Задержитесь в верхней точке на мгновение, затем плавно вернитесь в исходное положение.'
        ],
        tip: 'Следите за тем, чтобы поясница оставалась прижатой к скамье.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'abs'
    },
    {
        id: 30,
        title: 'Скручивания в тренажере',
        image: machineCrunchImg,
        description: 'Упражнение для укрепления мышц живота, выполняемое в специальном тренажере.',
        technique: [
            'Сядьте в тренажер для скручиваний, ноги зафиксируйте на валиках.',
            'На выдохе поднимите верхнюю часть тела, напрягая мышцы живота.',
            'Задержитесь в верхней точке на мгновение, затем плавно вернитесь в исходное положение.'
        ],
        tip: 'Не выставляйте слишком большой вес, чтобы избежать травм и обеспечить правильную технику выполнения.',
        repsRecommended: ['3–4 подхода по 12–15 повторений'],
        muscle: 'abs'
    },
    {
        id: 31,
        title: 'Подъем ног с упором на локтях',
        image: legRaiseImg,
        description: 'Упражнение для укрепления мышц живота, выполняемое в тренажере с упорами для локтей.',
        technique: [
            'Займите позицию в тренажере с упорами для локтей, возьмитесь за рукоятки руками.',
            'Ноги опущены вниз, туловище выпрямлено, поясница прижата к тренажеру.',
            'На выдохе поднимайте согнутые ноги вверх к груди, напрягая мышцы живота.',
            'Задержитесь в верхней точке на пару секунд.',
            'На вдохе медленно опустите ноги вниз, сохраняя контроль над движением.'
        ],
        tip: 'Избегайте раскачиваний туловища и рывков. Для усложнения упражнения можно поднимать выпрямленные ноги или добавлять поворот таза вверх в верхней точке.',
        repsRecommended: ['3–4 подхода по 10–15 повторений'],
        muscle: 'abs'
    },
    {
        id: 32,
        title: 'Планка',
        image: plankImg,
        description: 'Статическое упражнение для укрепления мышц кора.',
        technique: [
            'Встаньте в планку на прямых руках или локтях.',
            'Сохраняйте прямую линию от макушки до пяток.',
            'Задержитесь в этом положении на 30–60 секунд.'
        ],
        tip: 'Следите за дыханием и не провисайте в тазу.',
        repsRecommended: ['3–4 подхода по 30–60 секунд'],
        muscle: 'abs'
    }

];
