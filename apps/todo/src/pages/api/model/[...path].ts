import { NextRequestHandler } from '@erikdakoda/database/server/zenstackServerNext';
import { getEnhancedPrisma } from '@erikdakoda/database/server/getEnhancedPrisma';

export default NextRequestHandler({
  getPrisma: (req, res) => getEnhancedPrisma({ req, res }),
});
