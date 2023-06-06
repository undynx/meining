import { withLayout, LayoutType } from 'hocs/with-layout';
import { MyProfile } from './my-profile';

const WrappedProfile = withLayout(LayoutType.WithNavbar, MyProfile);

export { WrappedProfile as MyProfile };
