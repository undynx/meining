import { withAuth } from 'hocs/with-auth/with-auth';
import { withLayout, LayoutType } from 'hocs/with-layout';
import { MyProfile } from './my-profile';

const WrapAuth = withAuth(MyProfile);
const WrappedProfile = withLayout(LayoutType.WithNavbar, WrapAuth);

export { WrappedProfile as MyProfile };
