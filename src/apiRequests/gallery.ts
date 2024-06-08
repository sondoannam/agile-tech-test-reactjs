import http from 'src/lib/http';
import { GalleriesRes } from 'src/models';

const galleryApiRequest = {
  getGalleries: () => http.get<GalleriesRes[]>('/galleries'),
};

export default galleryApiRequest;
