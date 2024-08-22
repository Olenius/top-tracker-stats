import {useState} from "react"
import {useStorage} from "@plasmohq/storage/hook"
import './styles.css';

let interval = null;

function IndexPopup() {
    const [statistics, setStatistics] = useState<any>(null);
    const [dayStats, setDayStats] = useState<any>(null);
    const [engagements, setEngagements] = useState<any>(null);

    const statisticsUrl = "https://tracker-api.toptal.com/projects/{projectId}/statistics";
    const engagementsUrl = "https://tracker-api.toptal.com/projects/{projectId}/engagements";
    const dayStatsUrl = "https://tracker-api.toptal.com/reports/chart";

    const [token] = useStorage<string>("token")
    const [project] = useStorage<string>("project")
    const [worker] = useStorage<string>("worker")

    const fetchData = () => {
        if (!token || !project || !worker) return;

        const fetchStatisticsData = async () => {
            try {
                const url = statisticsUrl.replace("{projectId}", project) + "?access_token=" + token
                const response = await fetch(url);
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error('Statistics Error:', error);
            }
        };

        const fetchEngagementsData = async () => {
            try {
                const url = engagementsUrl.replace("{projectId}", project) + "?access_token=" + token
                const response = await fetch(url);
                const data = await response.json();
                setEngagements(data);
            } catch (error) {
                console.error('Engagements Error:', error);
            }
        };

        const fetchDayStatsData = async () => {
            let date = new Date().toJSON().slice(0, 10);

            try {
                const url = dayStatsUrl + "?access_token=" + token + "&project_ids[]=" + project + "&worker_ids[]=" + worker + "&start_date=" + date + "&end_date=" + date
                const response = await fetch(url);
                const data = await response.json();
                setDayStats(data);
            } catch (error) {
                console.error('Statistics Error:', error);
            }
        };

        fetchStatisticsData();
        fetchEngagementsData();
        fetchDayStatsData();
    }

    if (!interval && token && project && worker) {
        fetchData();
        interval = setInterval(fetchData, 180000);
    }

    return (<div
        style={{
            width: 300, paddingTop: 2, paddingLeft: 10, paddingRight: 10,
        }}>
        <h2 style={{textAlign: 'center'}}>
            TopTracker Stats
        </h2>
        {(!token || !project || !worker) && (<div> Please congifure options</div>)}

        {(!statistics || typeof statistics.error !== 'undefined' || !dayStats || typeof dayStats.error !== 'undefined' || !engagements || typeof engagements.error !== 'undefined') && (
            <div>No data fetched</div>)}

        {statistics && !statistics.error && dayStats && !dayStats.error && engagements && !engagements.error && (<div>
                  <pre>
                      <p><b>Outstanding balance: </b>$<span
                          className={'hidden-text'}>{(statistics.outstanding_amount).toFixed(2)}</span></p>
                      {/*<p>Amount this week: ${(50000).toFixed(2)}</p>*/}
                      <p><b>TODAY:</b> {formatSecondsToHoursAndMinutes(dayStats.reports.workers.data[0].dates[0].seconds)}</p>
                      <div className={'progress'}>
                          <div className={'bar'}
                               style={{
                                   left: `${(dayStats.reports.workers.data[0].dates[0].seconds / 3600 / 8 * 100 - 100).toFixed(2)}%`,
                               }}>

                          </div>
                          <div
                              className={'bar-label'}>{(dayStats.reports.workers.data[0].dates[0].seconds / 3600 / 8 * 100).toFixed(2)}%</div>
                      </div>

                      <p><b>WEEK:</b> {formatSecondsToHoursAndMinutes(statistics.outstanding_amount / (engagements.workers[0].rate) * 3600)}</p>
                      <div className={'progress'}>
                          <div
                              className={'bar'}
                              style={{left: `${(statistics.outstanding_amount / (engagements.workers[0].rate * 40) * 100 - 100).toFixed(2)}%`,}}
                          >
                          </div>
                          <div
                              className={'bar-label'}>{(statistics.outstanding_amount / (engagements.workers[0].rate * 40) * 100).toFixed(2)}%</div>
                      </div>
                  </pre>
        </div>)}
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <button onClick={fetchData}>Update stats
            </button>
        </div>
    </div>)
}

function formatSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}`;
}

export default IndexPopup
