import { useAuth } from '../../contexts/AuthContextWeb';
import AuthButton from '../buttons/AuthButton';
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists';
import styles from "./homeScreen.module.css";

export default function HomeScreen() {
    const { user, token, logout } = useAuth();

    return (
        <div className={styles.container}>
            {!user && <AuthCard />}

            {user && token && (
                <div className={{ marginTop: -100 }}>
                    <h2 className={styles.text}>Welcome, {user.username}!</h2>
                    <AuthButton title="Logout" loading={false} onClick={logout} />
                    <h3 className={styles.text2}>Your Playlists</h3>
                    <UserPlaylists token={token} />
                </div>
            )}
        </div>
    );
}