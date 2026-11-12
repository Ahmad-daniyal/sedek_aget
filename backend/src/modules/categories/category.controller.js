import { asyncHandler } from '../../utils/asyncHandler.js';
import { categoryService } from './category.service.js';

export const listCategories = asyncHandler(async (_req, res) => {
  const categories = await categoryService.list();
  res.json({ success: true, data: categories });
});
