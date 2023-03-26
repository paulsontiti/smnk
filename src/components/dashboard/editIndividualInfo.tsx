import { RootState} from '@/store';
import { useSelector} from 'react-redux';
import EditIndividualInfoForm from '@/swDashboard/components/individual/editIndividualForm';


export default function EditPersonalIndividualInfo({router}:{router:any}){
  const {_id} = useSelector((state:RootState)=>state.users.user)




  
        return(
          <EditIndividualInfoForm/>
        )

}