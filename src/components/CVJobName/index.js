import { useEffect, useState } from "react";
import { getOneJob } from "../../services/jobService";

function CVJobName(props)
{
    const {record} = props;
    const [jobs, setJobs] = useState();
    useEffect(()=> {
        const fetchApi = async () => {
            const response = await getOneJob(record.idJob);
            setJobs(response)
        }
        fetchApi();
    },[])

    return(
        <>
            {jobs && <>
            <p>{jobs.name}</p>
            </>}
        </>
    )
}
export default CVJobName;