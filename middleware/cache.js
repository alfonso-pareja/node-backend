const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: 3600, // Tiempo definido
    statusCodeExpires: {
        404: '1 minutes',
        500: 0
    }
}

const cacheInit = getExpeditiousCache(defaultOptions)

module.exports = { cacheInit }