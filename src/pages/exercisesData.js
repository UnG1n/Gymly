
import benchPressImg from '../assets/exercises/benchPress.png';
import dumbbellPressImg from '../assets/exercises/dumbbellPress.png';
// ...другие импорты

export const exercises = [
    {
        id: 1,
        muscle: 'chest',
        title: 'Жим штанги лежа',
        image: benchPressImg,
        description: 'Базовое упражнение для развития грудных мышц...',
        reps: ['4x12', '4x8', '5x6', 'на раз'],
    },
    {
        id: 2,
        muscle: 'chest',
        title: 'Жим гантелей лежа',
        image: dumbbellPressImg,
        description: 'Альтернатива жиму штанги...',
        reps: ['4x12', '4x8', '5x6', 'на раз'],
    },
    // ...другие chest
    // ...и так далее для остальных групп
];
