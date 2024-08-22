export class utils {
    static formatSecondsToHoursAndMinutes(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const hoursString = hours.toString().padStart(2, '0');
        const minutesString = minutes.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}`;
    }

    static getPercentOfWeekBar(): number {
        const today = new Date();
        const day = today.getDay();

        if (day > 5) {
            return 100;
        }

        return day * 20;
    }
}