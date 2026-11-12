import { asyncHandler } from '../../utils/asyncHandler.js';
import { storeService } from './store.service.js';

export const listStores = asyncHandler(async (req, res) => {
  const stores = await storeService.list({
    search: req.query.search,
    category: req.query.category
  });
  res.json({ success: true, data: stores });
});

export const getStore = asyncHandler(async (req, res) => {
  const store = await storeService.getBySlug(req.params.slug);
  res.json({ success: true, data: store });
});
