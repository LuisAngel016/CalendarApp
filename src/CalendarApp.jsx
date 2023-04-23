import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store';


export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  )
}
