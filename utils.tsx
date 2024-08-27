export class utils {
    static formatSecondsToHoursAndMinutes(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const hoursString = hours.toString().padStart(2, '0');
        const minutesString = minutes.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}`;
    }

    static getPercentOfWeekBar(workdays: number): number {
        const today = new Date();
        const day = today.getDay();

        if (day > workdays) {
            return 100;
        }

        return day * (100 / workdays);
    }

    static getPercentOfDayBar(startWorkHour: number, endWorkHour: number): number {
        const date = new Date();
        const workSecondsPerDay = (endWorkHour - startWorkHour) * 3600;

        return ((date.getHours() - startWorkHour) * 3600 + date.getMinutes() * 60 + date.getSeconds()) / workSecondsPerDay * 100;
    }
}