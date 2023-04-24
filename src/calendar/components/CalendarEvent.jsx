
export const CalendarEvent = ({ event }) => {


  const { title, user } = event;

  console.log(user);
    
    return (
      <>
        <strong>{ title }</strong>
        <strong> - { user.name }</strong>
      </>
    )
}
