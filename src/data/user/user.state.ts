export interface UserState {
  darkMode: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
  hasSeenWelcome: boolean;
  favouriteNewsId: number[] | null | undefined;
  userProfile: any;
}
