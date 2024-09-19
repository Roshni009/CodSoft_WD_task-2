import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/use-fetch';
import { saveJob } from '@/api/apiJobs';

const JobCard = ({
     job,
     isMyJob = false,
     savedInit = false,
     onJobSaved = () => {},
}) => {

    const [saved, setSaved] = useState(savedInit)

    const {fn:fnSavedJob, data: savedJob, loading: loadingSavedJob,} = useFetch(saveJob, {
        alreadySaved: saved,
    });

     const { user } = useUser();


    const handleSaveJob = async () => {
         await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
         });
         onJobSaved();
    };

    useEffect(() => {
        if(savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);

  return (
  <Card className="mx-5 flex flex-col">
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}

            {!isMyJob && (
                 <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer' />
            )}
        </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-4 flex-1">
        <div className='flex justify-between'>
            {job.company && <img src={job.company.logo_url} className='h-6' />}
            <div className='flex gap-2 items-center'>
                <MapPinIcon size={15} /> {job.location}
            </div>
        </div>
        <hr />
        {job.description}
    </CardContent>
    <CardFooter className="flex gap-4">
        <Link to={`/job/${job.id}`} className="flex-1">
        <Button variant='secondary' className="w-full">more details</Button>
        </Link>
          
          {!isMyJob && (
            <Button variant="outline" className="w-15" onClick={handleSaveJob} disabled={loadingSavedJob} >

                { saved ? (
                    <Heart size={20} fill='red' stroke='red' className='cursor-pointer'/>
                ) : (
                    <Heart size={20} fill='white'/>
                )}
                </Button>

           
          )}
       
    </CardFooter>
  </Card>
  ); 
};

export default JobCard;