import ReactDOM from 'react-dom/client';
import App from './App';
import { auth, app } from './firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

auth.onAuthStateChanged(() => {
  if (app) {
    root.render(<App />);
  }
});
