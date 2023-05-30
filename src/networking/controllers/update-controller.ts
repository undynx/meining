import { UpdateSerializer } from 'networking/serializers/update-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

class UpdateController {
  static async update(data: User) {
    const token = localStorage.getItem('token');
    const serializedData = UpdateSerializer.serialize(data);
    return ApiService.put<RawUser>(API_ROUTES.UPDATE, serializedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export { UpdateController };
