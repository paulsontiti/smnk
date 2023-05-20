import UserBankDetails from "@/components/pay-sw";


function ClientTippingContent({ userId }: { userId: string }) {

  return (
 <UserBankDetails userId={userId}/>
  );
}

export default ClientTippingContent;
