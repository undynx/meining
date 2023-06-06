import { UpdatePassSerializer } from 'networking/serializers/update-pass-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class UpdatePassController {
  static async updatePass(data: Password) {
    const token = localStorage.getItem('token');
    const serializedData = UpdatePassSerializer.serialize(data);
    return ApiService.put<RawPassword>(API_ROUTES.UPDATE_PASSWORD, serializedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export { UpdatePassController };
