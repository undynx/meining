import { withLayout, LayoutType } from 'hocs/with-layout';
import { UserList } from './user-list';

const WrappedUserList = withLayout(LayoutType.WithNavbar, UserList);

export { WrappedUserList as UserList };
