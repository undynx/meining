import { SignUpSerializer } from 'networking/serializers/sign-up-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class SignUpController {
  static async SignUp(data: SignUp) {
    const serializedData = SignUpSerializer.serialize(data);
    return ApiService.post(API_ROUTES.SIGNUP, serializedData);
  }
}

export { SignUpController };
