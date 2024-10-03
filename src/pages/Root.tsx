import { Outlet } from 'react-router-dom';

import NavBar from '../UI/NavBar';

function RootLayout() {
  return (
    <div className="xl:flex xl:flex-row-reverse">
      <main className="xl:flex-1 bg-p-beige100 min-h-[100vh] font-pubSans px-200 py-300 md:px-500 md:py-400">
        <Outlet />
      </main>
      <NavBar />
    </div>
  )
}

export default RootLayout;