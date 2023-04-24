import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {

      try {
        
        if( calendarEvent.id ){
          //* Actualizando
          await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
          // console.log({data})
          dispatch( onUpdateEvent({ ...calendarEvent, user }) )
  
        } else {
          //* Creando
          const { data } = await calendarApi.post('/events', calendarEvent)
          // console.log({data});
          dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        }

      } catch (error) {
        console.log({error});
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }
      
    }
    
    const startDeletingEvent = async() => {

      try {
        
        //* Eliminando
        await calendarApi.delete(`/events/${ activeEvent.id }`);
        
        dispatch( onDeleteEvent() );
        
      } catch (error) {
        console.log({error});
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');
      }
    }

    const startLoadingEvents = async() => {
      try {

        const { data } = await calendarApi.get('/events');
        console.log( data.eventos );
        const events = convertEventsToDateEvents( data.eventos );
        console.log( events );

        dispatch( onLoadEvent( events ) );
        
      } catch (error) {
        console.log({error});
        console.log('Error cargando eventos');
      }
    }

  return {
    // * Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // * Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
