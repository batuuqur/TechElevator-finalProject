import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import App from './App.jsx'

/* import fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUsers, faUserCircle, faTrashCan, faPencil, faCirclePlus, faTriangleExclamation, faXmark, faMagnifyingGlass, faExternalLink } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserCircle)
library.add(faUser)
library.add(faUsers)
library.add(faTrashCan)
library.add(faPencil)
library.add(faCirclePlus)
library.add(faTriangleExclamation)
library.add(faXmark)
library.add(faMagnifyingGlass)
library.add(faExternalLink)

/* sets the base url for server API communication with axios */
axios.defaults.baseURL = import.meta.env.VITE_REMOTE_API;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
