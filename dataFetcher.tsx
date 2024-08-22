export class DataFetcher {
    static async fetchStatistics(token: string, project: string): Promise<any> {
        const statisticsUrl = `https://tracker-api.toptal.com/projects/${project}/statistics?access_token=${token}`;
        const response = await fetch(statisticsUrl);
        return response.json();
    }

    static async fetchEngagements(token: string, project: string): Promise<any> {
        const engagementsUrl = `https://tracker-api.toptal.com/projects/${project}/engagements?access_token=${token}`;
        const response = await fetch(engagementsUrl);
        return response.json();
    }

    static async fetchDayStats(token: string, project: string, worker: string): Promise<any> {
        const date = new Date().toJSON().slice(0, 10);
        const dayStatsUrl = `https://tracker-api.toptal.com/reports/chart?access_token=${token}&project_ids[]=${project}&worker_ids[]=${worker}&start_date=${date}&end_date=${date}`;
        const response = await fetch(dayStatsUrl);
        return response.json();
    }
}