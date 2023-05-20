import RatingComponent from "@/components/rating/RatingComponent";


function ClientServiceRatingContent({ jobId }: { jobId: string }) {

  return (
   <RatingComponent jobId={jobId}/>
  );
}

export default ClientServiceRatingContent;
