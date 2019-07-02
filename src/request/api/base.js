import config from '../../../config/domain.js';

var str = process.env.NODE_ENV == 'development' ? config.domain_dev : config.domain_prod;

const base = {    
    domain: str   
};

export default base;