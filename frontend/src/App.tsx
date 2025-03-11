import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'

function App() {
  return (
    <BrowserRouter>
      <div className='flex min-h-screen'>
        <Sidebar />
        <MainContent />
      </div>
    </BrowserRouter>
  )
}

export default App
