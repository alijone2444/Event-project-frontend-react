const convertEvents = (events) => {
    return events.map(event => ({
        title: event.title,
        start: new Date(event.start.year, event.start.month - 1, event.start.day, event.startTime.split(':')[0], event.startTime.split(':')[1]), // Month is 0-indexed in JavaScript Date object
        end: new Date(event.end.year, event.end.month - 1, event.end.day, event.endTime.split(':')[0], event.endTime.split(':')[1]), // Month is 0-indexed in JavaScript Date object
    }));
};
export default convertEvents