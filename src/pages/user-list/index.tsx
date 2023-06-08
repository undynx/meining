import { withAuth } from 'hocs/with-auth/with-auth';
import { withLayout, LayoutType } from 'hocs/with-layout';
import { UserList } from './user-list';

const WrapAuth = withAuth(UserList);
const WrappedUserList = withLayout(LayoutType.WithNavbar, WrapAuth);

export { WrappedUserList as UserList };
