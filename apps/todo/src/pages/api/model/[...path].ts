import { NextRequestHandler } from '@dakoda/database/server/zenstackServerNext';
import { getEnhancedPrisma } from '@dakoda/database/server/getEnhancedPrisma';

export default NextRequestHandler({
  getPrisma: (req, res) => getEnhancedPrisma({ req, res }),
});
