import AttendeesTable from "../../Containers/Home/AdminHome/registrations/registration"
const CreateSocietyAdmin = () => {
    return (
        <div>
            <AttendeesTable name={'Create society Admin/ Active Users'} showSetAdminOption={false} showADDRemove={false} showTage={false} showOnlyActiveUsers={true} />
        </div>
    )
}
export default CreateSocietyAdmin