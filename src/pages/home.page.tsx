import { useAuth } from "../context/use-auth.context";
import { roleTypes } from "../interfaces/enums/roles.enum";
import ShowPatientsAdmin from "../components/show_patients_admin.component";
import ShowTeamsAdmin from "../components/show_teams_admin.component";
import { useState } from "react";
import ShowUserTeams from "../components/show_teams_medic.component";

const Home = () => {
  const { user } = useAuth();
  const [update, setUpdate] = useState<Date>(new Date)

  function handleAttPatientTeam() {
    setUpdate(new Date)
  }

  return (
    <div className="mt-4 mb-8 mx-8">
      <h1 className="uppercase text-center text-xl font-bold text-blue-600 border-b border-blue-700 mb-4">{`Página Principal de ${user?.role?.name}`}</h1>
      {user?.role ? (
        (user?.role.name == roleTypes.admin && (
          <div className="flex flex-col gap-4">
            <ShowPatientsAdmin user={user} onNewTeam={handleAttPatientTeam} update_infos={update} />
            <span className="border-b w-full mt-4"></span>
            <ShowTeamsAdmin user={user} onDeleteTeam={handleAttPatientTeam} update_infos={update} />
          </div>
        )) ||
        (user?.role.name == roleTypes.medic && (
          <div className="flex flex-col gap-4">
            <ShowUserTeams user={user} />
          </div>
        )) ||
        (user?.role.name == roleTypes.stake_holder && (
          <div className="">
          </div>
        ))
      ) : (
        <div>USUARIO SEM ROLE</div>
      )}
    </div>
  );
};

export default Home;
