import {useStorage} from "@plasmohq/storage/hook"
import {createUseStyles} from 'react-jss';


function OptionsIndex() {
    const [token, setToken] = useStorage<string>("token", "")
    const [project, setProject] = useStorage<string>("project", "")
    const [worker, setWorker] = useStorage<string>("worker", "")

    const useStyles = createUseStyles({
        container: {
            maxWidth: 600,
            margin: '0 auto',
            padding: 40,
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
        }, heading: {
            textAlign: 'center', color: '#333', marginBottom: 30,
        }, formGroup: {
            marginBottom: 20,
        }, label: {
            fontWeight: 'bold', color: '#555', marginBottom: 5, marginTop: 50
        }, input: {
            padding: 10, border: '1px solid #ccc', borderRadius: 4, fontSize: 16, width: '100%',
        }, button: {
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#0056b3',
            },
        },
    });

    const classes = useStyles();

    return (<div className={classes.container}>
        <h1 className={classes.heading}>TopTracker Stats Settings</h1>
        <div className={classes.formGroup}>
            <label htmlFor="input-token" className={classes.label}>Token: </label>
            <input className={classes.input} id="input-token" onChange={(e) => setToken(e.target.value)}
                   value={token}/>
            <p></p>
            <label htmlFor="input-project" className={classes.label}>Project Id: </label>
            <input className={classes.input} id="input-project" onChange={(e) => setProject(e.target.value)}
                   value={project}/>
            <p></p>
            <label htmlFor="input-worker" className={classes.label}>Worker Id: </label>
            <input className={classes.input} id="input-worker" onChange={(e) => setWorker(e.target.value)}
                   value={worker}/>
        </div>
    </div>)
}

export default OptionsIndex