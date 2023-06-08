// import { GetUserSerializer } from 'networking/serializers/get-user-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class GetUserController {
  static async me() {
    const token = localStorage.getItem('token');
    return ApiService.get<RawComptUser>(API_ROUTES.ME, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return GetUserSerializer.deSerialize(response);
  }
}

export { GetUserController };
