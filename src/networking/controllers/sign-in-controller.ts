import { SignInSerializer } from 'networking/serializers/sign-in-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class SignInController {
  static async signIn(data: SignIn) {
    const serializedData = SignInSerializer.serialize(data);
    return ApiService.post<RawSignIn>(API_ROUTES.LOGIN, serializedData);
  }
}

export { SignInController };
