import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function UserProfileView() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>User Profile</h1>
      <br />
      <p>Hello, {user.username}!</p>
    </div>
  );
}