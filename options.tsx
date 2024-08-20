import {useState} from "react"


function IndexPopup() {
    const [statistics, setStatistics] = useState<any>(null);
    const [engagements, setEngagements] = useState<any>(null);

    const statisticsUrl = "https://tracker-api.toptal.com/projects/616142/statistics";
    const engagementsUrl = "https://tracker-api.toptal.com/projects/616142/engagements";
    const token = process.env.PLASMO_PUBLIC_TOPTAL_TOKEN;

    const fetchData = () => {

        const fetchStatisticsData = async () => {
            try {
                const response = await fetch(statisticsUrl + "?access_token=" + token);
                const data = await response.json();
                setStatistics(data);
                // console.log('Statistics:', data);
            } catch (error) {
                console.error('Statistics Error:', error);
            }
        };

        const fetchEngagementsData = async () => {
            try {
                const response = await fetch(engagementsUrl + "?access_token=" + token);
                const data = await response.json();
                setEngagements(data);
            } catch (error) {
                console.error('Engagements Error:', error);
            }
        };
        fetchStatisticsData();
        fetchEngagementsData();
    }

    fetchData();

    return (<div
        style={{
            width: 300,
            padding: 16
        }}>
        <h2>
            TopTracker Stats
        </h2>
        {statistics && engagements && (<div>
                  <pre>
                      <p>Outstanding balance: ${(statistics.outstanding_amount).toFixed(2)}</p>
                      {/*<p>Amount this week: ${(50000).toFixed(2)}</p>*/}
                      <p>Percent of DAY: </p>
                      <div
                          style={{
                              width: `${(engagements.statistics[0].worked_last_24_hours / 3600 / 8 * 100).toFixed(2)}%`,
                              height: '100%',
                              backgroundColor: '#4CAF50',
                              borderRadius: '10px',
                              textAlign: 'center',
                              lineHeight: '20px',
                              color: 'white',
                          }}
                      >
                        {(engagements.statistics[0].worked_last_24_hours / 3600 / 8 * 100).toFixed(2)}%
                      </div>
                      <p>Percent of WEEK: </p>
                      <div
                          style={{
                              width: `${(statistics.outstanding_amount / (engagements.workers[0].rate * 40) * 100).toFixed(2)}%`,
                              height: '100%',
                              backgroundColor: '#4CAF50',
                              borderRadius: '10px',
                              textAlign: 'center',
                              lineHeight: '20px',
                              color: 'white',
                          }}
                      >
                        {(statistics.outstanding_amount / (engagements.workers[0].rate * 40) * 100).toFixed(2)}%
                      </div>
                  </pre>
        </div>)}
    </div>)
}

export default IndexPopup
