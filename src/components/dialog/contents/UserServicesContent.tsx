import SWServicesAccordion from "@/components/accordion/SWServicesAccordion";

function UserServicesContent({ services }: { services: any[] }) {
  return <>{<SWServicesAccordion services={services} />}</>;
}

export default UserServicesContent;
