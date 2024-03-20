import EventCard from "../Home/AdminHome/AdminEvents/gridview";
import WrapperComponent from "../../FooterAndHeaderwrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"; // Import useState
import { Spin } from "antd";
import GetAllEvents from "../../Components/functions/getAllEvents";
import { useNavigate } from "react-router-dom";
function AllEvents() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); // Add loading state
    const Events = useSelector((state) => state.userAllEvents);
    GetAllEvents(Events.length)
    const handleOpenEvent = (id) => {
        const foundEvent = Events.find((event) => event._id === id);
        navigate(`/eventdetail/${foundEvent.eventName}`, { state: { data: foundEvent, toNavigate: '/events' } })
    }

    useEffect(() => {
        if (Events.length > 0) {
            setLoading(false)
        }
    }, [Events])

    return (
        <WrapperComponent>
            {loading ? (
                <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div>
                    <EventCard
                        eventData={Events}
                        showEditDelete={false}
                        openEvent={handleOpenEvent}
                    />
                </div>
            )}
        </WrapperComponent>
    )
}

export default AllEvents;
