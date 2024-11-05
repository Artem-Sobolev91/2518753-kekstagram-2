export function isMeetingWithinWorkHours(startWork, endWork, startMeeting, duration) {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60 + minutes);
  };

  const startWorkM = timeToMinutes(startWork);
  const endWorkM = timeToMinutes(endWork);
  const startMeetingM = timeToMinutes(startMeeting);
  const endMeetingM = startMeetingM + duration;
  return startMeetingM >= startWorkM && endMeetingM <= endWorkM;
}
