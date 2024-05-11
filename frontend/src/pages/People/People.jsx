import { useSelector } from "react-redux";
import "./Module.scss";
import { useEffect } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import { Loader } from "../../shared/Loader";
import { UserCard } from "../../components/UserCard/UserCard";

export const People = () => {
  const { users } = useSelector((state) => state.users);
  const { allUsers } = UseUserActions();

  useEffect(() => {
    allUsers();
  }, []);

  if (!users)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  return (
    <div className="container-people">
      <div className="info-people">
        <div className="title-people">
          <h2>All Users</h2>
        </div>
        <div className="cards-user">
          {users?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
