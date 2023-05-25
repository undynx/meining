import { withLayout, LayoutType } from 'hocs/with-layout';
import { UserProfile } from './user-profile';

const WrappedUserProfile = withLayout(LayoutType.WithNavbar, UserProfile);

export { WrappedUserProfile as UserProfile };
