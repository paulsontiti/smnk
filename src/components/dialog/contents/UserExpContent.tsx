import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";

function UserExpContent({ exps }: { exps: any[] }) {
  return <>{<SWExpsAccordion exps={exps} />}</>;
}

export default UserExpContent;
