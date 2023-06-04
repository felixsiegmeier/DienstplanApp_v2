import { usePageContext } from '@/app/context/pageContext';
import React from 'react'

export default function ClientView() {
  const { rosters } = usePageContext();
    return (
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <div>
            <div>RostersBox Navbar to select Year</div>
            Rosters Box to select Roster
          </div>
        </div>
      );
}
