import {useState, useEffect} from "react"
import {useStorage} from "@plasmohq/storage/hook"
import './styles.css';
import {DataFetcher} from "~dataFetcher"
import {utils} from "~utils"
import refreshIcon from "data-base64:~assets/refresh.png"

let interval = null;

function IndexPopup() {
    const [data, setData] = useState({
        statistics: null, engagements: null, dayStats: null
    })

    const [token] = useStorage<string>("token")
    const [project] = useStorage<string>("project")
    const [worker] = useStorage<string>("worker")

    const [startWorkHour] = useStorage<number>("start_work_hour", 10)
    const [endWorkHour] = useStorage<number>("end_work_hour", 18)
    const [hoursPerDay] = useStorage<number>("hours_per_day", 8)
    const [workDays] = useStorage<number>("work_days", 5)

    const fetchData = async () => {
        const statistics = await DataFetcher.fetchStatistics(token, project);
        const engagements = await DataFetcher.fetchEngagements(token, project);
        const dayStats = await DataFetcher.fetchDayStats(token, project, worker);

        setData({
            statistics, engagements, dayStats
        });
    };

    useEffect(() => {
        fetchData();

        if (!interval && token && project && worker) {
            interval = setInterval(fetchData, 180000);
        }
    }, [token, project, worker]);

    return (<div
        style={{
            width: 300, paddingLeft: 10, paddingRight: 10, margin: 5, paddingBottom: 10
        }}>
        <div
            style={{
                width: 300, paddingTop: 2, paddingLeft: 10, paddingRight: 10, position: 'relative',
            }}>
            <img onClick={fetchData} className={'refresh-button'} src={refreshIcon} alt="Update"/>
            <h2 style={{textAlign: 'center'}}>
                TopTracker Stats
            </h2>
        </div>
        {(!token || !project || !worker) && (<div> Please configure options</div>)}

        {(typeof data === undefined || !data.statistics || typeof data.statistics.error !== 'undefined' || !data.dayStats || typeof data.dayStats.error !== 'undefined' || !data.engagements || typeof data.engagements.error !== 'undefined') && (
            <div>No data fetched</div>)}

        {data.statistics && !data.statistics.error && data.dayStats && !data.dayStats.error && data.engagements && !data.engagements.error && (
            <div>
                  <pre>
                      <p><b>Outstanding balance: </b>$<span
                          className={'hidden-text'}>{(data.statistics.outstanding_amount).toFixed(2)}</span></p>
                      <p><b>TODAY:</b> {utils.formatSecondsToHoursAndMinutes(data.dayStats.reports.workers.data[0].dates[0].seconds)}</p>
                      <div className={'progress'}>
                          <div
                              className={'bar bar-red'}
                              style={{
                                  left: `${utils.getPercentOfDayBar(startWorkHour, endWorkHour) - 100}%`,
                              }}
                          >
                          </div>
                          <div className={'bar'}
                               style={{
                                   left: `${(data.dayStats.reports.workers.data[0].dates[0].seconds / 3600 / hoursPerDay * 100 - 100).toFixed(2)}%`,
                               }}>
                          </div>
                          <div
                              className={'bar-label'}>{(data.dayStats.reports.workers.data[0].dates[0].seconds / 3600 / hoursPerDay * 100).toFixed(2)}%</div>
                      </div>

                      <p><b>WEEK:</b> {utils.formatSecondsToHoursAndMinutes(data.statistics.outstanding_amount / (data.engagements.workers[0].rate) * 3600)}</p>
                      <div className={'progress'}>
                          <div
                              className={'bar bar-red'}
                              style={{
                                  left: `${utils.getPercentOfWeekBar(workDays) - 100}%`,
                              }}
                          >
                          </div>
                          <div
                              className={'bar'}
                              style={{left: `${(data.statistics.outstanding_amount / (data.engagements.workers[0].rate * hoursPerDay * workDays) * 100 - 100).toFixed(2)}%`,}}
                          >
                          </div>
                          <div
                              className={'bar-label'}>{(data.statistics.outstanding_amount / (data.engagements.workers[0].rate * hoursPerDay * workDays) * 100).toFixed(2)}%</div>
                      </div>
                  </pre>
            </div>)}
    </div>)
}

export default IndexPopup
