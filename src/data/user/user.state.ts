export interface UserState {
  darkMode: boolean;
  isLoggedIn: boolean;
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
  hasSeenWelcome: boolean;
  favouriteNewsId: number[] | null | undefined;
}
