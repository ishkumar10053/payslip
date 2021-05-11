var router = express.Router();

const {index,pageNotFound,generateSlip} = require('./modules');

router.get('/',index);

router.post('/generate_slip',generateSlip);

router.get('*',pageNotFound);

module.exports = router;