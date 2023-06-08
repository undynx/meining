import { UserSerializer } from 'networking/serializers/user-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class UserController {
  static async signUp(data: User) {
    const serializedData = UserSerializer.serialize(data);
    return ApiService.post(API_ROUTES.SIGNUP, serializedData);
  }

  static async signIn(data: User) {
    const serializedData = UserSerializer.serialize(data);
    return ApiService.post<RawUser>(API_ROUTES.LOGIN, serializedData);
  }
}

export { UserController };
