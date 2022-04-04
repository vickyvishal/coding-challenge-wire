import './App.scss';
import MainBar from './components/Header';
import { PackageList } from './components/PackagesList';
import { BasicList } from './components/SideBar';

function App() {
  return (
    <div className="App">
      <header className='class-header'>
        <MainBar />
      </header>
      <div className='main-contents'>
        <aside className='class-left-sidebar'>
          <BasicList />
        </aside>
        <section className='class-content-area'>
          <PackageList />
        </section>
      </div>

      <footer className='class-footer-area'></footer>
    </div>
  );
}

export default App;
